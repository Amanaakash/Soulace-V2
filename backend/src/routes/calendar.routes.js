import express from 'express';
import { 
  getCalendarEvents, 
  createAvailabilityEvent, 
  updateAvailabilityEvent,
  getProfessionalSchedule,
  getPublicAvailableSlots,
  getAllProfessionalsWithAvailability
} from '../controllers/calendar.controller.js';
import { isProfessional } from '../middleware/isProfessional.middleware.js';

const router = express.Router();

// Get all calendar events for a specific month
// GET /api/calendar/events?email=prof@example.com&month=2025-01
router.get('/get-events',isProfessional ,getCalendarEvents);

// Create new availability event
// POST /api/calendar/events
// Body: { email, summary, description, startDateTime, endDateTime, location }
router.post('/post-events', isProfessional, createAvailabilityEvent);

// Update existing availability event
// PATCH /api/calendar/events/:eventId
// Body: { email, summary, description, startDateTime, endDateTime, location }
router.patch('/patch-events/:eventId', isProfessional, updateAvailabilityEvent);

// Get professional's schedule (optional helper)
// GET /api/calendar/schedule?email=prof@example.com
router.get('/schedule', isProfessional, getProfessionalSchedule);



export default router;
