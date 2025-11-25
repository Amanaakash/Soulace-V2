import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import Professional from '../models/professional.model.js';  // Assuming Professional model is at this path
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
export const profSendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Find Professional by email
    const professional = await Professional.findOne({ email });
    
    if (!professional) {
      return res.status(400).json({ message: 'Professional not found' });
    }

    // Generate a JWT token for email verification
    const token = jwt.sign({ professionalId: professional._id }, JWT_SECRET, { expiresIn: '1h' });

    // Create a verification URL
    const verificationUrl = `${process.env.BACKEND_URL}/api/verify-prof/prof-verify-email?token=${token}`;

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
    
    res.status(200).json({ success: true, message: 'Verification email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
};

// Function to verify the email by token
export const profVerifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the Professional by decoded professionalId
    const professional = await Professional.findById(decoded.professionalId);

    if (!professional) {
      return res.status(400).json({ message: 'Professional not found' });
    }

    // Set the emailVerified flag to true
    professional.emailVerified = true;

    // Save the Professional to update the verification status
    await professional.save();

    res.status(200).json({ success: true, message: 'Email successfully verified' });
  } catch (err) {
    console.error("Error in verifyEmail controller", err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
