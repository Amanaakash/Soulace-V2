import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    role: { type: String, default:"User"},
    isOnline: { type: Boolean, default: false }, // Online status
    myMood: [{ type: String }], // User's current moods (multiple)
    preferedMood: { 
      type: String, 
      enum: ['similar', 'different'], 
      default: null 
    }, // User's preference: similar or different mood
    otp: { type: String, default: null },  // OTP for phone number verification
    otpExpiration: { type: Date, default: null }, // Expiration time for OTP
    otpVerificationId: { type: String },  // Store the temporary OTP verification ID
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
