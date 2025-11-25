import { hashPassword } from '../utils/hash.js';  // Import hashPassword function
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Helper function to generate a unique username
const generateUniqueUsername = async () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random username with 8-12 characters
    const length = Math.floor(Math.random() * 5) + 8; // Random length between 8-12
    username = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      username += characters[randomIndex];
    }

    // Check if username already exists in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return username;
};

// Signup (User Registration)
export const signup = async (req, res) => {
  const { firstName, lastName, gender, dateOfBirth, phoneNumber,  email, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !gender || !dateOfBirth || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists by email or phone number
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or phone number.' });
    }

    // Generate a unique username
    const username = await generateUniqueUsername();

    // Hash the password using the hashPassword function from hash.js
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      gender,
      dateOfBirth,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send success response
    const { password: _, ...userData } = savedUser.toObject(); // Remove password from response
    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: userData,
    });
  } catch (error) {
    console.error('Error during signup controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '7d' } // Set token expiration time (7 days)
    );

    // Send token to client (as a cookie)
    res.cookie('soulace_user_token', token, {
      httpOnly: true, // Ensures the cookie cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-browser support in production with secure flag, 'lax' for development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Respond with user data (without password)
    const { password: _, ...userData } = user.toObject(); // Omit the password
    res.status(200).json({ success: true, user: userData });
  } catch (err) {
    console.error("Error in login controller", err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('soulace_user_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Match the login cookie settings
    });

    // Send a success response
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
