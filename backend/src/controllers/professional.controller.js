import { hashPassword } from '../utils/hash.js';  // Import hashPassword function
import Professional from '../models/professional.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { google } from "googleapis";



dotenv.config(); // Load environment variables from .env file

// Signup (Professional Registration) - Only basic info required
export const signup = async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, designation, specialization, yearsOfExperience, country, email, phoneNumber, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !dateOfBirth || !gender || !designation || !specialization || !yearsOfExperience || !country || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if Professional already exists by email or phone number
    const existingProfessional = await Professional.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingProfessional) {
      return res.status(400).json({ message: 'Professional already exists with this email or phone number.' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new Professional with only signup fields
    const newProfessional = new Professional({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      designation,
      specialization: Array.isArray(specialization) ? specialization : [specialization],
      yearsOfExperience,
      country,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the Professional to the database
    const savedProfessional = await newProfessional.save();

    // Send success response without password
    const { password: _, ...professionalData } = savedProfessional.toObject();
    res.status(201).json({
      success: true,
      message: 'Professional registered successfully! Please complete your profile with required documents.',
      professional: professionalData,
    });
  } catch (error) {
    console.error('Error during signup controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the Professional exists
    const professional = await Professional.findOne({ email });
    if (!professional) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, professional.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token with 7 days expiration
    const token = jwt.sign(
      { professionalId: professional._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token to client (as a cookie) - Safari compatible
    res.cookie('soulace_professional_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Respond with Professional data (without password)
    const { password: _, ...professionalData } = professional.toObject();
    res.status(200).json({ success: true, professional: professionalData });
  } catch (err) {
    console.error("Error in login controller", err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('soulace_professional_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    // Send a success response
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

// Update Professional's profile with documents and additional information
export const updateProfessional = async (req, res) => {
  try {
    const professionalId = req.professional?._id || req.params.id;

    if (!professionalId) {
      return res.status(400).json({ message: "Professional ID is required" });
    }

    // Extract text data from request body
    const {
      registrationNumber,
      workplaceName,
      workplaceAddress,
      nameOfBank,
      accountHoldersName,
      accountNumber,
      upiId,
      licenseNumber,
      licenseIssuingAuthority,
    } = req.body;

    // Extract file URLs from uploaded files
    const files = req.files || {};
    
    const updateData = {};

    // Add text fields if provided
    if (registrationNumber) updateData.registrationNumber = registrationNumber;
    if (licenseNumber) updateData.licenseNumber = licenseNumber;
    if (licenseIssuingAuthority) updateData.licenseIssuingAuthority = licenseIssuingAuthority;
    if (nameOfBank) updateData.nameOfBank = nameOfBank;
    if (accountHoldersName) updateData.accountHoldersName = accountHoldersName;
    if (accountNumber) updateData.accountNumber = accountNumber;
    if (upiId) updateData.upiId = upiId;

    // Handle workplace as an array
    if (workplaceName && workplaceAddress) {
      updateData.workplace = [{
        name: workplaceName,
        address: workplaceAddress,
      }];
    }

    // Add file URLs from multer-cloudinary uploads
    if (files.profilePicture && files.profilePicture[0]) {
      updateData.profilePicture = files.profilePicture[0].path;
    }
    if (files.licenseDocument && files.licenseDocument[0]) {
      updateData.licenseDocument = files.licenseDocument[0].path;
    }
    if (files.primaryCertificate && files.primaryCertificate[0]) {
      updateData.primaryCertificate = files.primaryCertificate[0].path;
    }
    if (files.selfieImage && files.selfieImage[0]) {
      updateData.selfieImage = files.selfieImage[0].path;
    }
    if (files.governmentIDDocument && files.governmentIDDocument[0]) {
      updateData.governmentIDDocument = files.governmentIDDocument[0].path;
    }
    if (files.additionalCertificates) {
      updateData.additionalCertificates = files.additionalCertificates.map(file => file.path);
    }

    // Update Professional's profile
    const updatedProfessional = await Professional.findByIdAndUpdate(
      professionalId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!updatedProfessional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      professional: updatedProfessional,
    });
  } catch (err) {
    console.error("Error in updateProfessional Controller:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const professionalSchedule = async (req, res) => {

};