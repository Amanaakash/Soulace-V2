import Listener from '../models/listener.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Listener login
export const listenerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the listener exists
    const listener = await Listener.findOne({ email });
    if (!listener) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, listener.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token with 7 days expiration
    const token = jwt.sign(
      { listenerId: listener._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token to client (as a cookie) - Safari compatible
    res.cookie('soulace_listener_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Respond with listener data (without password)
    const { password: _, ...listenerData } = listener.toObject();
    res.status(200).json({ success: true, listener: listenerData });
  } catch (err) {
    console.error("Error in listenerLogin controller", err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

// Set listener online
export const setListenerOnline = async (req, res) => {
  try {
    const listenerId = req.listener._id;

    await Listener.findByIdAndUpdate(listenerId, { isOnline: true });

    res.status(200).json({ success: true, message: 'Listener set to online' });
  } catch (error) {
    console.error('Error in setListenerOnline controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Set listener offline
export const setListenerOffline = async (req, res) => {
  try {
    const listenerId = req.listener._id;

    await Listener.findByIdAndUpdate(listenerId, { isOnline: false });

    res.status(200).json({ success: true, message: 'Listener set to offline' });
  } catch (error) {
    console.error('Error in setListenerOffline controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};