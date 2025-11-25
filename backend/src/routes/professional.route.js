import express from 'express';
import { deleteProfessional, getUnverifiedProfessionals, getVerifiedProfessionals, login, logout, profUploadDoc, signup, updateProfessional } from '../controllers/professional.controller.js'; // Import the signup controller
import isAdmin from '../middleware/isAdmin.middleware.js';
import upload from '../config/multer.js';
import limiter from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// User Signup Route
router.post('/signup', signup);

// You can add other user-related routes here like login, logout, etc.
router.post('/login',limiter ,login);
router.post('/logout', logout);

//upload document of professional
router.post('/upload-doc', upload, profUploadDoc);

//Get unverified professionals
router.get('/unverified',isAdmin ,getUnverifiedProfessionals);

//Get verified professionals
router.get('/verified', isAdmin , getVerifiedProfessionals);

//Update professional
router.put('/update/:id', isAdmin,updateProfessional);

//Delete professional
router.delete('/delete/:id',isAdmin, deleteProfessional);

export default router;
