import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true,
      ref: 'User'
    },
    feedbackOn: { 
      type: String, 
      required: true,
      enum: ['Call', 'Chat', 'Professional Service', 'AI Chatbot', 'Peer Support', 'App Experience', 'Other'],
    },
    message: { 
      type: String, 
      required: true,
      trim: true
    },
    rating: { 
      type: Number, 
      min: 1,
      max: 5,
      default: null // Optional rating from 1-5 stars
    },
    professionalId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Professional',
      default: null // If feedback is about a specific professional
    },
    status: { 
      type: String, 
      enum: ['New', 'Reviewed', 'Acknowledged'],
      default: 'New'
    },
    reviewedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Admin',
      default: null 
    },
    reviewedAt: { 
      type: Date, 
      default: null 
    },
    adminNotes: { 
      type: String, 
      default: null 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Index for faster queries
feedbackSchema.index({ username: 1, createdAt: -1 });
feedbackSchema.index({ feedbackOn: 1, createdAt: -1 });
feedbackSchema.index({ rating: 1 });
feedbackSchema.index({ status: 1 });

export default mongoose.model("Feedback", feedbackSchema);
