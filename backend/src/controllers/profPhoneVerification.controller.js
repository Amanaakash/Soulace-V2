import Professional from '../models/professional.model.js';
import { sendSMS } from '../config/sendSMS.js';
import crypto from 'crypto';

// Function to send OTP to Professional's phone number
export const profSendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number is required." });
  }

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save OTP in DB with expiry time (5 minutes)
    await Professional.findOneAndUpdate(
      { phoneNumber },
      { otp, otpExpiresAt: Date.now() + 5 * 60 * 1000 },
      { upsert: true, new: true }
    );

    // Send OTP via Infobip
    await sendSMS(phoneNumber, `Your verification code is: ${otp}`);

    return res.status(200).json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error sending OTP." });
  }
};

// Function to verify the OTP entered by the Professional
export const profVerifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Find the Professional by phone number
    const isProfessional = await Professional.findOne({ phoneNumber });

    if (!isProfessional) {
      return res.status(400).json({ message: 'Professional not found' });
    }

    // Check if OTP is correct and has not expired
    if (isProfessional.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > isProfessional.otpExpiresAt) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid, mark the phone number as verified
    isProfessional.phoneVerified = true;
    isProfessional.otp = null;  // Clear OTP after successful verification
    isProfessional.otpExpiresAt = null;  // Clear OTP expiration time
    await isProfessional.save();

    res.status(200).json({ message: 'Phone number verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during OTP verification' });
  }
};
