import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema(
  {
    professionalId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Professional',
      required: true,
      index: true
    },
    professionalEmail: { 
      type: String, 
      required: true,
      index: true
    },
    googleEventId: { 
      type: String, 
      required: true,
      unique: true 
    },
    summary: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      default: null 
    },
    startDateTime: { 
      type: Date, 
      required: true,
      index: true
    },
    endDateTime: { 
      type: Date, 
      required: true,
      index: true
    },
    location: { 
      type: String, 
      default: null 
    },
    status: { 
      type: String, 
      enum: ['available', 'booked', 'cancelled'],
      default: 'available',
      index: true
    },
    bookedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      default: null 
    },
    googleCalendarLink: { 
      type: String, 
      default: null 
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
availabilitySlotSchema.index({ professionalId: 1, startDateTime: 1 });
availabilitySlotSchema.index({ professionalEmail: 1, status: 1 });

export default mongoose.model("AvailabilitySlot", availabilitySlotSchema);
