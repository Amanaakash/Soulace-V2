import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    message: { 
      type: String, 
      required: true,
      trim: true
    },
    status: { 
      type: String, 
      enum: ['New', 'In Progress', 'Resolved', 'Closed'],
      default: 'New'
    },
    respondedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Admin',
      default: null 
    },
    response: { 
      type: String, 
      default: null 
    },
    respondedAt: { 
      type: Date, 
      default: null 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Index for faster queries
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });

export default mongoose.model("Contact", contactSchema);
