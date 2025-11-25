import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Admin login controller
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token with id, role, and email
    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token to client
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // Send success response with token, username, and email
    res.status(200).json({
      success: true,
      token,
      admin: {
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Error in adminLogin controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Admin logout controller
export const adminLogout = (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Error in adminLogout controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get admin dashboard controller
export const getAdminDashboard = (req, res) => {
  try {
    // Example response, replace with actual dashboard data
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
  } catch (err) {
    console.error('Error in getAdminDashboard controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const insertAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully!',
      admin: { id: savedAdmin._id, username: savedAdmin.username, email: savedAdmin.email },
    });
  } catch (error) {
    console.error('Error during insertAdmin controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};