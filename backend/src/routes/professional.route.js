import express from 'express';
import {login, logout, signup, updateProfessional } from '../controllers/professional.controller.js';
import isAdmin from '../middleware/isAdmin.middleware.js';
import { uploadProfessionalDocuments } from '../config/multer.js';
import limiter from '../middleware/rateLimiter.middleware.js';
import { profSendVerificationEmail, profVerifyEmail } from '../controllers/professionalEmailVerification.controller.js';
import { profSendOTP, profVerifyOTP } from '../controllers/profPhoneVerification.controller.js';
import { isProfessional } from '../middleware/isProfessional.middleware.js';

const router = express.Router();

// Professional Signup Route (basic info only)
router.post('/signup', signup);

// Professional Login & Logout
router.post('/login', limiter, login);
router.post('/logout', logout);

// Update professional profile with documents and additional info
router.put('/update-profile/:id', isProfessional, uploadProfessionalDocuments, updateProfessional);




//curently not using these
// Email verification routes
router.post('/prof-send-email', profSendVerificationEmail);
router.get('/prof-verify-email', profVerifyEmail);
// Phone verification routes
router.post('/prof-send-otp', profSendOTP);
router.post('/prof-verify-otp', profVerifyOTP);


export default router;
