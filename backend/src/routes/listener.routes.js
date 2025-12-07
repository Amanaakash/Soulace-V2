import express from 'express';
import { listenerLogin, setListenerOnline, setListenerOffline } from '../controllers/listener.controller.js';
import limiter from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// Listener login route
router.post('/login', limiter, listenerLogin);

// Set listener online/offline routes
router.post('/set-online', setListenerOnline);
router.post('/set-offline', setListenerOffline);

export default router;