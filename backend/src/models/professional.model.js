import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    profilePicture: { type: String, default: null },
    
    // Professional Details
    designation: { type: String, required: true },
    specialization: [{ type: String, required: true }], // Allow multiple specializations
    yearsOfExperience: { type: Number, required: true },
    
    // Licensing & Verification
    licenseNumber: { type: String, default: null },
    licenseIssuingAuthority: { type: String, default: null },
    registrationNumber: { type: String, default: null },
    licenseDocument: { type: String, default: null },
    primaryCertificate: { type: String, default: null },
    additionalCertificates: [{ type: String }], // Support multiple certificates
    governmentIDDocument: { type: String, default: null },
    selfieImage: { type: String, default: null },

    // Work Information
    workplace: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true },
      }
    ],
    country: { type: String, required: true },

    // Banking & Payment
    nameOfBank: { type: String, default: null },
    accountHoldersName: { type: String, default: null },
    accountNumber: { type: String, default: null }, // Consider encrypting this
    upiId: { type: String, default: null },

    // Authentication & Security
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Ensure hashed storage
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },  
    otpExpiration: { type: Date, default: null },
    otpVerificationId: { type: String, default: null },
    socialLogin: { type: Boolean, default: false }, // If logging in via Google, LinkedIn, etc.

    // Online Status & Availability
    isOnline: { type: Boolean, default: false },
    lastActiveAt: { type: Date, default: null }, // Track last activity time
    availabilitySchedule: [
      {
        day: { type: String }, // e.g., "Monday"
        startTime: { type: String }, // e.g., "09:00 AM"
        endTime: { type: String }, // e.g., "05:00 PM"
      }
    ],

    // Role & Verification
    role: { type: String, default: "Professional" },
    isApprovedByAdmin: { type: Boolean, default: false }, // Clarifies admin verification status
  },
  { timestamps: true }
);

export default mongoose.model("Professional", professionalSchema);
