import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AvailabilitySlot',
    required: true,
  },
  professionalEmail: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  bookingNotes: {
    type: String,
    default: '',
  },
  cancellationReason: {
    type: String,
    default: '',
  },
  cancelledBy: {
    type: String,
    enum: ['user', 'professional', ''],
    default: '',
  },
  cancelledAt: {
    type: Date,
  },
  googleCalendarLink: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Indexes for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ professionalId: 1, createdAt: -1 });
bookingSchema.index({ slotId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ startDateTime: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
