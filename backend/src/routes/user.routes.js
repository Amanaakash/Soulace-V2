import express from 'express';
import { checkAuth, login, logout, signup } from '../controllers/user.controller.js'; // Import the signup controller
import limiter from '../middleware/rateLimiter.middleware.js';
import checkRegisteredUser from '../middleware/authUser.middleware.js';

const router = express.Router();

// User Signup Route
router.post('/signup', signup);

// You can add other user-related routes here like login, logout, etc.
router.post('/login',limiter ,login);

router.post('/logout', logout);

router.get('/checkAuth',checkRegisteredUser ,checkAuth);

export default router;
