import User from '../models/User.model.js';
import Listener from '../models/listener.model.js';

// Connect user with listener based on nearest age
export const connectWithListener = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Get user's age
    const user = await User.findById(userId).select('age');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.age) {
      return res.status(400).json({ message: 'User age not found. Please update your profile.' });
    }

    // Find all online listeners
    const onlineListeners = await Listener.find({ isOnline: true }).select('-password');

    if (onlineListeners.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No online listeners available at the moment. Please try again later.'
      });
    }

    // Find the listener with the closest age
    let bestMatch = null;
    let smallestAgeDiff = Infinity;

    for (const listener of onlineListeners) {
      const ageDiff = Math.abs(listener.age - user.age);
      
      if (ageDiff < smallestAgeDiff) {
        smallestAgeDiff = ageDiff;
        bestMatch = listener;
      }
    }

    // Return the best matched listener
    if (bestMatch) {
      res.status(200).json({
        success: true,
        message: 'Listener found successfully',
        listener: bestMatch,
        ageDifference: smallestAgeDiff
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No suitable listener found. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Error in connectWithListener controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
