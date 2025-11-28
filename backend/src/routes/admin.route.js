import express from 'express';
import { 
  adminLogin, 
  adminLogout, 
  getAdminDashboard, 
  insertAdmin,
  getAllAdmins,
  deleteAdmin,
  getAllProfessionals,
  deleteProfessional,
  updateProfessional,
  getAllUsers,
  deleteUser,
  getAllReports,
  getAllContacts,
  getAllFeedbacks,
  getAllInquiries
} from '../controllers/admin.controller.js';
import isAdmin from '../middleware/isAdmin.middleware.js';
import limiter from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// Admin authentication routes
router.post('/login', limiter, adminLogin);
router.post('/logout', adminLogout);
router.get('/dashboard', isAdmin, getAdminDashboard);

// Admin management routes
router.post('/insert-admin', isAdmin, insertAdmin);
router.get('/all-admins', isAdmin, getAllAdmins);
router.delete('/delete-admins/:id', isAdmin, deleteAdmin);

// Professional management routes
router.get('/all-professionals', isAdmin, getAllProfessionals);
router.put('/update-professionals/:id', isAdmin, updateProfessional);
router.delete('/delete-professionals/:id', isAdmin, deleteProfessional);

// User management routes
router.get('/all-users', isAdmin, getAllUsers);
router.delete('/delete-users/:id', isAdmin, deleteUser);

router.get('/all-reports', isAdmin, getAllReports);
router.get('/all-contacts', isAdmin, getAllContacts);
router.get('/all-inquiries', isAdmin, getAllInquiries);
router.get('/all-feedbacks', isAdmin, getAllFeedbacks);



export default router;