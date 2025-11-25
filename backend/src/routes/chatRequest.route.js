import express from 'express';
import checkRegisteredUser from '../middleware/authUser.middleware.js';
import {
    sendChatRequest,
    respondToChatRequest,
    getPendingRequests
} from '../controllers/chatRequest.controller.js';

const router = express.Router();

// Protect all routes with authentication
router.use(checkRegisteredUser);

// Routes
router.post('/send', sendChatRequest);
router.post('/respond', respondToChatRequest);
router.get('/pending', getPendingRequests);

export default router;
