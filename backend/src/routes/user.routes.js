import express from 'express';
import { checkAuth, login, logout, signup, setOnline, setOffline, updateMoodPreferences } from '../controllers/user.controller.js'; // Import the signup controller
import limiter from '../middleware/rateLimiter.middleware.js';
import checkRegisteredUser from '../middleware/authUser.middleware.js';
import { sendVerificationEmail, verifyEmail } from '../controllers/emailVerification.controller.js';
import { sendOTP, verifyOTP } from '../controllers/phoneVerification.controller.js';
import { connectWithListener } from '../controllers/professional_support.controller.js';
import { getAllProfessionalsWithAvailability, getPublicAvailableSlots } from '../controllers/calendar.controller.js';

const router = express.Router();

// User Signup Route
router.post('/signup', signup);

// You can add other user-related routes here like login, logout, etc.
router.post('/login',limiter ,login);

router.post('/logout', logout);

router.get('/checkAuth',checkRegisteredUser ,checkAuth);

router.post('/set-online', checkRegisteredUser, setOnline);

router.post('/set-offline', checkRegisteredUser, setOffline);

router.put('/update-mood-preferences', checkRegisteredUser, updateMoodPreferences);

router.post('/professional-support/connect-listener', checkRegisteredUser, connectWithListener);

// PUBLIC ENDPOINTS (No authentication required)

// Get public available slots for a specific professional
// GET /api/calendar/public/slots?email=prof@example.com&month=2025-01
router.get('/public/slots', checkRegisteredUser,getPublicAvailableSlots);

// Get all professionals with their next available slot
// GET /api/calendar/public/professionals
router.get('/public/professionals', checkRegisteredUser, getAllProfessionalsWithAvailability);


//curently not using these
router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email', verifyEmail);
router.post('/send-verification-otp',sendOTP);
router.post('/verify-otp',verifyOTP);


export default router;
