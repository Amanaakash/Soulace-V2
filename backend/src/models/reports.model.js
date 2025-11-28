import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: { 
      type: String, 
      required: true,
      ref: 'User' // Username of the user who is reporting
    },
    reportedUser: { 
      type: String, 
      required: true,
      ref: 'User' // Username of the user being reported
    },
    reason: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String, 
      default: null,
      trim: true
    },
    status: { 
      type: String, 
      enum: ['Pending', 'Under Review', 'Resolved', 'Dismissed'],
      default: 'Pending'
    },
    actionTaken: { 
      type: String, 
      default: null 
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
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Index for faster queries
reportSchema.index({ reportedBy: 1, createdAt: -1 });
reportSchema.index({ reportedUser: 1, createdAt: -1 });
reportSchema.index({ status: 1 });

export default mongoose.model("Report", reportSchema);
