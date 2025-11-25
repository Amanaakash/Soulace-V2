import express from 'express';
import { checkAuth, login, logout, signup } from '../controllers/user.controller.js'; // Import the signup controller
import limiter from '../middleware/rateLimiter.middleware.js';
import checkRegisteredUser from '../middleware/authUser.middleware.js';
import { sendVerificationEmail, verifyEmail } from '../controllers/emailVerification.controller.js';
import { sendOTP, verifyOTP } from '../controllers/phoneVerification.controller.js';
import aiRoute from './src/routes/aiChat.route.js';

const router = express.Router();

// User Signup Route
router.post('/signup', signup);

// You can add other user-related routes here like login, logout, etc.
router.post('/login',limiter ,login);

router.post('/logout', logout);

router.get('/checkAuth',checkRegisteredUser ,checkAuth);


router.post('/send-verification-email', sendVerificationEmail);

router.get('/verify-email', verifyEmail);

router.post('/send-verification-otp',sendOTP);

router.post('/verify-otp',verifyOTP);

//AI chatbot routes
app.use('/aiChat',aiRoute);

export default router;
