import express from 'express';
import { profSendVerificationEmail, profVerifyEmail } from '../controllers/professionalEmailVerification.controller.js';
import { profSendOTP, profVerifyOTP } from '../controllers/profPhoneVerification.controller.js';
import { profUploadDoc } from '../controllers/professional.controller.js';
import upload from '../config/multer.js';
import { isProfessional } from '../middleware/isProfessional.middleware.js';

const router = express.Router();

// User Signup Route
router.post('/prof-send-email', profSendVerificationEmail);

router.get('/prof-verify-email', profVerifyEmail);

router.post('/prof-send-otp',profSendOTP);

router.post('/prof-verify-otp',profVerifyOTP);

router.post('/prof-upload-doc',isProfessional,upload,profUploadDoc);
export default router;
