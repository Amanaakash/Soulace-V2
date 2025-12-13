// write listener code here. purpose: serach for online listeners, with busy status false, then return first search found listener to user. return only one at a time. 
import Listener from '../models/listener.model.js';

export const findAvailableListener = async (req, res) => {
  try {
    // Find an online listener who is not busy
    const listener = await Listener.findOne({ isOnline: true, busyStatus: false });
    if (!listener) {
      return res.status(404).json({ message: 'No available listeners at the moment. Please try again later.' });
    }   
    // Optionally, you can set the listener's busyStatus to true here if you want to mark them as busy
    listener.busyStatus = true;
    await listener.save();
    res.status(200).json({ listener });
  } catch (error) {
    console.error('Error finding available listener:', error);
    res.status(500).json({ message: 'Server error while searching for an available listener.' });
  }
};

export const releaseListener = async (listenerId) => {
  try {
    const listener = await Listener.findById(listenerId);
    if (listener) {
      listener.busyStatus = false;
      await listener.save();
    }
    } catch (error) {   
    console.error('Error releasing listener:', error);
  }
};
