import User from '../models/User.model.js';
import { sendSMS } from '../config/sendSMS.js';
import crypto from 'crypto';

// Twilio setup - replace with your actual Twilio credentials
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

// Function to send OTP to user's phone number
export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number is required." });
  }

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save OTP in DB with expiry time (5 minutes)
    await User.findOneAndUpdate(
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

// Function to verify the OTP entered by the user
export const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if OTP is correct and has not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // if (Date.now() > user.otpExpiration) {
    //   return res.status(400).json({ message: 'OTP has expired' });
    // }

    // OTP is valid, mark the phone number as verified
    user.phoneVerified = true;
    user.otp = null;  // Clear OTP after successful verification
    user.otpExpiration = null;  // Clear OTP expiration time
    await user.save();

    res.status(200).json({ message: 'Phone number verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during OTP verification' });
  }
};
