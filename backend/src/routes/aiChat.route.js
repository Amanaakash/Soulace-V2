import express from 'express';
import checkRegisteredUser from '../middleware/authUser.middleware.js';
import { chatWithGemini} from '../controllers/gemini_chat.controller.js';

const router = express.Router();

// Gemini AI chat routes
router.post('/gemini', checkRegisteredUser, chatWithGemini);

export default router;
