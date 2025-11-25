import User from '../models/User.model.js';

// Matching Algorithm
export const matchUsers = async (req, res) => {
  const { currentMood, preferedMood } = req.body;

  // Validate required fields
  if (!currentMood || !preferedMood) {
    return res.status(400).json({ message: 'Current mood and preferred mood are required.' });
  }

  try {
    // Find users who have the same preferred mood as the current mood and are online
    const matchedUsers = await User.find({
      currentMood: preferedMood,
      preferedMood: currentMood,
      isOnline: true
    }).select('-password'); // Exclude password from the response

    // Send the matched users as the response
    if(matchedUsers.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Matched users found.',
        users: matchedUsers
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No matched users found. Please try again later. OR YOU MAY NEED TO UPDATE YOUR PREFERENCES. OR PROCEED WITH OUR AI CHATBOT.',
      });
    }
  } catch (error) {
    console.error('Error during matchUsers controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



