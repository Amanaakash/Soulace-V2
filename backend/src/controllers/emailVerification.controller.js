import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';  // Assuming User model is at this path
import dotenv from 'dotenv';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Transporter to send emails using Gmail (or another email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Function to send email verification link
export const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a JWT token for email verification
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Create a verification URL
    const verificationUrl = `${process.env.BACKEND_URL}/api/verify/verify-email?token=${token}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Recipient address
      subject: 'Email Verification', // Subject
      html: `
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `, // HTML content
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({success:true, message: 'Verification email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
};

// Function to verify the email by token
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by decoded userId
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Set the emailVerified flag to true
    user.emailVerified = true;

    // Save the user to update the verification status
    await user.save();

    res.status(200).json({success:true, message: 'Email successfully verified' });
  } catch (err) {
    console.error("Error in verifyEmail controller",err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
