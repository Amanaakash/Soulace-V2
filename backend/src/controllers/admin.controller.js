import Admin from '../models/admin.model.js';
import Professional from '../models/professional.model.js';
import User from '../models/User.model.js';
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

    // Generate JWT token with id, role, and email (7 days expiration)
    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token to client - Safari compatible
    res.cookie('soulace_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
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
    res.clearCookie('soulace_admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // Exclude password from response
    
    res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    console.error('Error in getAllAdmins controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.admin._id.toString() === id) {
      return res.status(400).json({ message: 'You cannot delete your own admin account' });
    }

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteAdmin controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all professionals
export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: professionals.length,
      professionals,
    });
  } catch (error) {
    console.error('Error in getAllProfessionals controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete professional
export const deleteProfessional = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfessional = await Professional.findByIdAndDelete(id);

    if (!deletedProfessional) {
      return res.status(404).json({ message: 'Professional not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Professional deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteProfessional controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update professional (for admin approval and other updates)
export const updateProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow password updates through this route
    if (updateData.password) {
      delete updateData.password;
    }

    const updatedProfessional = await Professional.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedProfessional) {
      return res.status(404).json({ message: 'Professional not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Professional updated successfully',
      professional: updatedProfessional,
    });
  } catch (error) {
    console.error('Error in updateProfessional controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Error in getAllUsers controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteUser controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllReports = async (req, res) => {};

export const getAllContacts = async (req, res) => {};

export const getAllInquiries = async (req, res) => {};

export const getAllFeedbacks = async (req, res) => {};
