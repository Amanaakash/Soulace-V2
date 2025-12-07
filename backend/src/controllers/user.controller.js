import { hashPassword } from '../utils/hash.js';  // Import hashPassword function
import User from '../models/User.model.js';
import Booking from '../models/Booking.model.js';
import AvailabilitySlot from '../models/AvailabilitySlot.model.js';
import Professional from '../models/professional.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config(); // Load environment variables from .env file

// Helper function to generate a unique username using faker
const generateUniqueUsername = async () => {
  let username;
  let isUnique = false;

  while (!isUnique) {
    // Generate a first name using faker
    const firstName = faker.person.firstName();
    
    // Generate a random 3-digit number (100-999)
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    
    // Combine first name with random 3-digit number
    username = `${firstName.toLowerCase()}${randomNumber}`;

    // Check if username already exists in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return username;
};

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Signup (User Registration)
export const signup = async (req, res) => {
  const { firstName, lastName, gender, dateOfBirth, phoneNumber,  email, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !gender || !dateOfBirth || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists by email or phone number
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or phone number.' });
    }

    // Generate a unique username
    const username = await generateUniqueUsername();

    // Calculate age from date of birth
    const age = calculateAge(dateOfBirth);

    // Hash the password using the hashPassword function from hash.js
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      gender,
      dateOfBirth,
      age,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send success response
    const { password: _, ...userData } = savedUser.toObject(); // Remove password from response
    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: userData,
    });
  } catch (error) {
    console.error('Error during signup controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '7d' } // Set token expiration time (7 days)
    );

    // Send token to client (as a cookie)
    res.cookie('soulace_user_token', token, {
      httpOnly: true, // Ensures the cookie cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-browser support in production with secure flag, 'lax' for development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Respond with user data (without password)
    const { password: _, ...userData } = user.toObject(); // Omit the password
    res.status(200).json({ success: true, user: userData });
  } catch (err) {
    console.error("Error in login controller", err);
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('soulace_user_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Match the login cookie settings
    });

    // Send a success response
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const setOnline = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { isOnline: true });

    res.status(200).json({ message: 'User set to online' });
  } catch (error) {
    console.error('Error in setOnline controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const setOffline = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { isOnline: false });

    res.status(200).json({ message: 'User set to offline' });
  } catch (error) {
    console.error('Error in setOffline controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update user mood preferences
export const updateMoodPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const { myMood, preferedMood } = req.body;

    // Validate myMood
    if (!myMood || !Array.isArray(myMood) || myMood.length === 0) {
      return res.status(400).json({ message: 'myMood is required and must be a non-empty array.' });
    }

    // Validate preferedMood
    if (!preferedMood || !['similar', 'different'].includes(preferedMood)) {
      return res.status(400).json({ message: 'preferedMood must be either "similar" or "different".' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { myMood, preferedMood },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Mood preferences updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error in updateMoodPreferences controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// BOOKING FUNCTIONS

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { slotId, bookingNotes } = req.body;

    // Validate required fields
    if (!slotId) {
      return res.status(400).json({
        success: false,
        message: 'Slot ID is required'
      });
    }

    // Find the availability slot
    const slot = await AvailabilitySlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Availability slot not found'
      });
    }

    // Check if slot is available
    if (slot.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'This slot is no longer available'
      });
    }

    // Check if slot is in the future
    if (new Date(slot.startDateTime) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book a slot in the past'
      });
    }

    // Check if user already has a booking for this slot
    const existingBooking = await Booking.findOne({
      userId,
      slotId,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this slot'
      });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get professional details
    const professional = await Professional.findById(slot.professionalId);
    if (!professional) {
      return res.status(404).json({
        success: false,
        message: 'Professional not found'
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      professionalId: slot.professionalId,
      slotId: slot._id,
      professionalEmail: slot.professionalEmail,
      userEmail: user.email,
      userName: user.username,
      startDateTime: slot.startDateTime,
      endDateTime: slot.endDateTime,
      location: slot.location,
      bookingNotes: bookingNotes || '',
      googleCalendarLink: slot.googleCalendarLink,
      status: 'pending',
    });

    // Update slot status to booked
    slot.status = 'booked';
    slot.bookedBy = userId;
    await slot.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        professionalName: `${professional.firstName} ${professional.lastName}`,
        professionalEmail: professional.email,
        startDateTime: booking.startDateTime,
        endDateTime: booking.endDateTime,
        location: booking.location,
        status: booking.status,
        googleCalendarLink: booking.googleCalendarLink,
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// Get all bookings for the logged-in user
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, upcoming } = req.query;

    // Build query
    const query = { userId };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter upcoming bookings (future dates only)
    if (upcoming === 'true') {
      query.startDateTime = { $gte: new Date() };
    }

    // Fetch bookings with professional details
    const bookings = await Booking.find(query)
      .populate('professionalId', 'firstName lastName email profilePicture designation specialization')
      .sort({ startDateTime: 1 });

    res.status(200).json({
      success: true,
      message: 'Bookings fetched successfully',
      count: bookings.length,
      bookings: bookings.map(booking => ({
        id: booking._id,
        professional: {
          id: booking.professionalId._id,
          name: `${booking.professionalId.firstName} ${booking.professionalId.lastName}`,
          email: booking.professionalId.email,
          profilePicture: booking.professionalId.profilePicture,
          designation: booking.professionalId.designation,
          specialization: booking.professionalId.specialization,
        },
        startDateTime: booking.startDateTime,
        endDateTime: booking.endDateTime,
        location: booking.location,
        status: booking.status,
        bookingNotes: booking.bookingNotes,
        googleCalendarLink: booking.googleCalendarLink,
        createdAt: booking.createdAt,
      }))
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// Get a specific booking by ID
export const getBookingById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookingId } = req.params;

    // Find booking
    const booking = await Booking.findOne({ _id: bookingId, userId })
      .populate('professionalId', 'firstName lastName email profilePicture designation specialization phoneNumber');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking details fetched successfully',
      booking: {
        id: booking._id,
        professional: {
          id: booking.professionalId._id,
          name: `${booking.professionalId.firstName} ${booking.professionalId.lastName}`,
          email: booking.professionalId.email,
          profilePicture: booking.professionalId.profilePicture,
          designation: booking.professionalId.designation,
          specialization: booking.professionalId.specialization,
          phoneNumber: booking.professionalId.phoneNumber,
        },
        startDateTime: booking.startDateTime,
        endDateTime: booking.endDateTime,
        location: booking.location,
        status: booking.status,
        bookingNotes: booking.bookingNotes,
        googleCalendarLink: booking.googleCalendarLink,
        cancellationReason: booking.cancellationReason,
        cancelledBy: booking.cancelledBy,
        cancelledAt: booking.cancelledAt,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking details',
      error: error.message
    });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookingId } = req.params;
    const { cancellationReason } = req.body;

    // Find booking
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking is already cancelled or completed
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed booking'
      });
    }

    // Check if booking is in the past
    if (new Date(booking.startDateTime) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a booking that has already started or passed'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason || 'Cancelled by user';
    booking.cancelledBy = 'user';
    booking.cancelledAt = new Date();
    await booking.save();

    // Update availability slot status back to available
    await AvailabilitySlot.findByIdAndUpdate(
      booking.slotId,
      {
        status: 'available',
        $unset: { bookedBy: 1 }
      }
    );

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: {
        id: booking._id,
        status: booking.status,
        cancellationReason: booking.cancellationReason,
        cancelledAt: booking.cancelledAt,
      }
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
};