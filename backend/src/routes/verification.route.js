import express from 'express';
import { sendVerificationEmail, verifyEmail } from '../controllers/emailVerification.controller.js';
import { sendOTP, verifyOTP } from '../controllers/phoneVerification.controller.js';

const router = express.Router();

// User Signup Route
router.post('/send-email', sendVerificationEmail);

router.get('/verify-email', verifyEmail);

router.post('/send-otp',sendOTP);

router.post('/verify-otp',verifyOTP);
export default router;
