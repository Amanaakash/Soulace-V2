import User from '../models/User.model.js';

// Mood Quadrant Categories
const GOOD_MOODS = ['11', '01'];
const BAD_MOODS = ['10', '00'];

// Helper function to categorize mood quadrants
const categorizeMoodQuadrants = (quadrants) => {
  const hasGood = quadrants.some(q => GOOD_MOODS.includes(q));
  const hasBad = quadrants.some(q => BAD_MOODS.includes(q));
  
  return {
    hasGood,
    hasBad,
    isGoodGroup: hasGood && !hasBad,
    isBadGroup: hasBad && !hasGood,
    isMixed: hasGood && hasBad
  };
};

// Matching Algorithm
export const matchUsers = async (req, res) => {
  const { myMoodQuadrants, preferedMood, userId } = req.body;

  // Validate required fields
  if (!myMoodQuadrants || !Array.isArray(myMoodQuadrants) || myMoodQuadrants.length === 0) {
    return res.status(400).json({ 
      success: false,
      message: 'myMoodQuadrants is required and must be a non-empty array.' 
    });
  }
  
  // Validate quadrant values
  const validQuadrants = ['00', '01', '10', '11'];
  const invalidQuadrants = myMoodQuadrants.filter(q => !validQuadrants.includes(q));
  if (invalidQuadrants.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: `Invalid quadrant values: ${invalidQuadrants.join(', ')}. Valid values are: 00, 01, 10, 11` 
    });
  }
  
  if (!preferedMood || !['similar', 'different'].includes(preferedMood)) {
    return res.status(400).json({ 
      success: false,
      message: 'preferedMood is required and must be either "similar" or "different".' 
    });
  }

  if (!userId) {
    return res.status(400).json({ 
      success: false,
      message: 'userId is required.' 
    });
  }

  try {
    // First, update the current user's mood preferences
    await User.findByIdAndUpdate(userId, {
      myMoodQuadrants: myMoodQuadrants,
      preferedMood: preferedMood
    });

    // Categorize current user's mood
    const userMoodCategory = categorizeMoodQuadrants(myMoodQuadrants);
    
    // Determine which mood groups to search for based on user's preference
    let targetMoodQuadrants = [];
    
    if (preferedMood === 'similar') {
      // User wants similar moods
      if (userMoodCategory.isGoodGroup || userMoodCategory.hasGood) {
        // User has good moods, find others with good moods
        targetMoodQuadrants = GOOD_MOODS;
      } else {
        // User has bad moods, find others with bad moods
        targetMoodQuadrants = BAD_MOODS;
      }
    } else if (preferedMood === 'different') {
      // User wants different moods
      if (userMoodCategory.isGoodGroup || userMoodCategory.hasGood) {
        // User has good moods, find others with bad moods
        targetMoodQuadrants = BAD_MOODS;
      } else {
        // User has bad moods, find others with good moods
        targetMoodQuadrants = GOOD_MOODS;
      }
    }

    // Find online users with matching mood criteria (excluding the current user)
    const onlineUsers = await User.find({
      _id: { $ne: userId }, // Exclude current user
      isOnline: true,
      myMoodQuadrants: { 
        $exists: true, 
        $ne: [],
        $in: targetMoodQuadrants // Must have at least one quadrant from target moods
      }
    }).select('-password');

    if (onlineUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No online users found with matching mood preferences. Please try again later or proceed with our AI chatbot.',
      });
    }

    // Score and rank users based on mood compatibility
    let bestMatch = null;
    let bestScore = -1;

    for (const user of onlineUsers) {
      if (!user.myMoodQuadrants || user.myMoodQuadrants.length === 0) continue;

      const otherUserCategory = categorizeMoodQuadrants(user.myMoodQuadrants);
      
      // Calculate compatibility score
      let score = 0;
      
      if (preferedMood === 'similar') {
        // For similar preference, count matching quadrants
        const commonQuadrants = myMoodQuadrants.filter(q => user.myMoodQuadrants.includes(q));
        score = commonQuadrants.length;
        
        // Bonus points for being in the same mood group
        if ((userMoodCategory.isGoodGroup && otherUserCategory.isGoodGroup) ||
            (userMoodCategory.isBadGroup && otherUserCategory.isBadGroup)) {
          score += 5;
        }
        
        // Additional bonus for exact quadrant matches
        if (commonQuadrants.length === myMoodQuadrants.length && 
            myMoodQuadrants.length === user.myMoodQuadrants.length) {
          score += 3;
        }
      } else if (preferedMood === 'different') {
        // For different preference, score based on being in opposite mood groups
        const isOpposite = (userMoodCategory.hasGood && otherUserCategory.isBadGroup) ||
                          (userMoodCategory.hasBad && otherUserCategory.isGoodGroup);
        
        if (isOpposite) {
          score = 10; // High score for opposite mood groups
        }
        
        // Count non-overlapping quadrants (more different is better)
        const uniqueQuadrants = user.myMoodQuadrants.filter(q => !myMoodQuadrants.includes(q));
        score += uniqueQuadrants.length;
      }

      // Update best match if this user has a better score
      if (score > bestScore) {
        bestScore = score;
        bestMatch = user;
      }
    }

    // Return the best match
    if (bestMatch && bestScore > 0) {
      res.status(200).json({
        success: true,
        message: 'Match found.',
        user: bestMatch,
        matchScore: bestScore
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No suitable match found. Please try again later or proceed with our AI chatbot.',
      });
    }
  } catch (error) {
    console.error('Error during matchUsers controller:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal Server Error',
      error: error.message 
    });
  }
};



