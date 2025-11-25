import express from 'express';
import { adminLogin, adminLogout, getAdminDashboard, insertAdmin } from '../controllers/admin.controller.js';
import isAdmin from '../middleware/isAdmin.middleware.js';
import limiter from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

//Insert admin
router.post('/insert', isAdmin ,insertAdmin);
// Admin login route
router.post('/login', limiter,adminLogin);

// Admin logout route
router.post('/logout', adminLogout);

// Admin dashboard route
router.get('/dashboard',isAdmin, getAdminDashboard);

export default router;