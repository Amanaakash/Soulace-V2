import { hashPassword } from '../utils/hash.js';  // Import hashPassword function
import Professional from '../models/professional.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Signup (Professional Registration)
export const signup = async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, profilePic, designation, specialization, yearsOfExperience, licenseNumber, licenseIssuingAuthority, country, registrationNumber, workplaceName, workplaceAddress, licenseImage, certificateImage, selfieImage, governmentIssuedID, additionalCertificate, nameOfBank, accountHoldersName, accountNumber, upiId, email, phoneNumber, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !dateOfBirth || !gender || !profilePic || !designation || !specialization || !yearsOfExperience || !licenseNumber || !licenseIssuingAuthority || !country || !registrationNumber || !workplaceName || !workplaceAddress || !licenseImage || !certificateImage || !selfieImage || !governmentIssuedID || !additionalCertificate || !nameOfBank || !accountHoldersName || !accountNumber || !upiId || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if Professional already exists
    const existingProfessional = await Professional.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingProfessional) {
      return res.status(400).json({ message: 'Professional already exists.' });
    }

    // Hash the password using the hashPassword function from hash.js
    const hashedPassword = await hashPassword(password);  // Use the hashPassword function

    // Create new Professional
    const newProfessional = new Professional({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      profilePic,
      designation,
      specialization,
      yearsOfExperience,
      licenseNumber,
      licenseIssuingAuthority,
      country,
      registrationNumber,
      workplaceName,
      workplaceAddress,
      licenseImage,
      certificateImage,
      selfieImage,
      governmentIssuedID,
      additionalCertificate,
      nameOfBank,
      accountHoldersName,
      accountNumber,
      upiId,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the Professional to the database
    const savedProfessional = await newProfessional.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Professional registered successfully! OTP sent for phone verification.',
      professional: { id: savedProfessional._id, firstName: savedProfessional.firstName, lastName: savedProfessional.lastName, email: savedProfessional.email },
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

    // Create a JWT token
    const token = jwt.sign(
      { professionalId: professional._id },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '1h' } // Set token expiration time (1 hour)
    );

    // Send token to client (as a cookie)
    res.cookie('token', token, {
      httpOnly: true, // Ensures the cookie cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      sameSite: 'strict', // CSRF protection
    });

    // Respond with Professional data (without password)
    const { password: _, ...professionalData } = professional.toObject(); // Omit the password
    res.status(200).json({ success: true, professional: professionalData, token });
  } catch (err) {
    console.error("Error in login controller", err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: 'strict', // CSRF protection
    });

    // Send a success response
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

// Upload Professional's document
export const profUploadDoc = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = req.file.path; // Cloudinary file URL

    // Update Professional's document_image field
    const updatedProfessional = await Professional.findByIdAndUpdate(
      req.user.id, 
      { document_image: fileUrl },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
      professional: updatedProfessional
    });
  } catch (err) {
    console.error("Error in profUploadDoc Controller:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all unverified professionals
export const getUnverifiedProfessionals = async (req, res) => {
  try {
    const unverifiedProfessionals = await Professional.find({ isVerified: false }).select('-password');
    res.status(200).json({ success: true, professionals: unverifiedProfessionals });
  } catch (err) {
    console.error('Error in getUnverifiedProfessionals controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch all verified professionals
export const getVerifiedProfessionals = async (req, res) => {
  try {
    const verifiedProfessionals = await Professional.find({ isVerified: true }).select('-password');
    res.status(200).json({ success: true, professionals: verifiedProfessionals });
  } catch (err) {
    console.error('Error in getVerifiedProfessionals controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a professional
export const updateProfessional = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Prevent updating the password directly
  if (updateData.password) {
    return res.status(400).json({ message: 'Password cannot be updated directly' });
  }

  try {
    const updatedProfessional = await Professional.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!updatedProfessional) {
      return res.status(404).json({ message: 'Professional not found' });
    }
    res.status(200).json({ success: true, professional: updatedProfessional });
  } catch (err) {
    console.error('Error in updateProfessional controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a professional
export const deleteProfessional = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfessional = await Professional.findByIdAndDelete(id);
    if (!deletedProfessional) {
      return res.status(404).json({ message: 'Professional not found' });
    }
    res.status(200).json({ success: true, message: 'Professional deleted successfully' });
  } catch (err) {
    console.error('Error in deleteProfessional controller:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

