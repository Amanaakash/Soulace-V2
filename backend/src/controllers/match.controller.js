import User from '../models/User.model.js';

// Matching Algorithm
export const matchUsers = async (req, res) => {
  const { myMood, preferedMood, userId } = req.body;

  // Validate required fields
  if (!myMood || !Array.isArray(myMood) || myMood.length === 0) {
    return res.status(400).json({ message: 'myMood is required and must be a non-empty array.' });
  }
  
  if (!preferedMood || !['similar', 'different'].includes(preferedMood)) {
    return res.status(400).json({ message: 'preferedMood is required and must be either "similar" or "different".' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'userId is required.' });
  }

  try {
    // First, update the current user's mood preferences
    await User.findByIdAndUpdate(userId, {
      myMood: myMood,
      preferedMood: preferedMood
    });

    // Find online users (excluding the current user)
    const onlineUsers = await User.find({
      _id: { $ne: userId }, // Exclude current user
      isOnline: true,
      myMood: { $exists: true, $ne: [] } // Must have moods set
    }).select('-password');

    if (onlineUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No online users found. Please try again later or proceed with our AI chatbot.',
      });
    }

    // Find the best match based on preference
    let bestMatch = null;
    let bestScore = -1;

    for (const user of onlineUsers) {
      if (!user.myMood || user.myMood.length === 0) continue;

      // Calculate mood overlap
      const commonMoods = myMood.filter(mood => user.myMood.includes(mood));
      const moodOverlap = commonMoods.length;

      let score = 0;

      if (preferedMood === 'similar') {
        // For similar preference, higher overlap is better
        score = moodOverlap;
      } else if (preferedMood === 'different') {
        // For different preference, lower overlap is better
        // Calculate difference score (max possible - overlap)
        const maxPossible = Math.max(myMood.length, user.myMood.length);
        score = maxPossible - moodOverlap;
      }

      // Update best match if this user has a better score
      if (score > bestScore) {
        bestScore = score;
        bestMatch = user;
      }
    }

    // Return the best match
    if (bestMatch) {
      res.status(200).json({
        success: true,
        message: 'Match found.',
        user: bestMatch
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No suitable match found. Please try again later or proceed with our AI chatbot.',
      });
    }
  } catch (error) {
    console.error('Error during matchUsers controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



