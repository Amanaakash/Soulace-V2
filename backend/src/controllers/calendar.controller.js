import { google } from "googleapis";
import Professional from "../models/professional.model.js";
import AvailabilitySlot from "../models/AvailabilitySlot.model.js";
import { oauth2Client } from "../services/googleAuth.js";

// Helper function to refresh access token if expired
const refreshAccessToken = async (professional) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: professional.refreshToken,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    
    // Update tokens in database
    professional.accessToken = credentials.access_token;
    if (credentials.refresh_token) {
      professional.refreshToken = credentials.refresh_token;
    }
    professional.tokenExpiry = credentials.expiry_date;
    await professional.save();

    return credentials.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token");
  }
};

// Helper function to get authenticated calendar instance
const getCalendarInstance = async (professional) => {
  // Check if token is expired
  const now = Date.now();
  let accessToken = professional.accessToken;

  if (!accessToken || !professional.tokenExpiry || now >= professional.tokenExpiry) {
    // Token expired or missing, refresh it
    accessToken = await refreshAccessToken(professional);
  }

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: professional.refreshToken,
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
};

// Get all calendar events for a specific month
export const getCalendarEvents = async (req, res) => {
  try {
    const { email, month } = req.query;

    // Validate required parameters
    if (!email || !month) {
      return res.status(400).json({ 
        success: false,
        message: "Email and month (YYYY-MM) are required" 
      });
    }

    // Validate month format
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(month)) {
      return res.status(400).json({
        success: false,
        message: "Invalid month format. Use YYYY-MM (e.g., 2025-01)"
      });
    }

    // Find professional by email
    const professional = await Professional.findOne({ email });
    if (!professional) {
      return res.status(404).json({ 
        success: false,
        message: "Professional not found" 
      });
    }

    // Check if professional has connected Google account
    if (!professional.accessToken || !professional.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Google Calendar not connected. Please connect your Google account first."
      });
    }

    // Get calendar instance with refreshed token if needed
    const calendar = await getCalendarInstance(professional);

    // Calculate time range for the month
    const [year, monthNum] = month.split("-");
    const startDate = new Date(year, parseInt(monthNum) - 1, 1);
    const endDate = new Date(year, parseInt(monthNum), 0, 23, 59, 59);

    // Fetch events from Google Calendar
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    // Sync events to MongoDB for public access
    for (const event of events) {
      const startDateTime = event.start.dateTime || event.start.date;
      const endDateTime = event.end.dateTime || event.end.date;

      await AvailabilitySlot.findOneAndUpdate(
        { googleEventId: event.id },
        {
          professionalId: professional._id,
          professionalEmail: professional.email,
          googleEventId: event.id,
          summary: event.summary,
          description: event.description,
          startDateTime: new Date(startDateTime),
          endDateTime: new Date(endDateTime),
          location: event.location,
          googleCalendarLink: event.htmlLink,
          status: event.status === 'cancelled' ? 'cancelled' : 'available',
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Events fetched and synced successfully",
      count: events.length,
      events: events.map(event => ({
        id: event.id,
        summary: event.summary,
        description: event.description,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        location: event.location,
        status: event.status,
        htmlLink: event.htmlLink,
      })),
    });

  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch calendar events",
      error: error.message,
    });
  }
};

// Create a new availability event
export const createAvailabilityEvent = async (req, res) => {
  try {
    const { email, summary, description, startDateTime, endDateTime, location } = req.body;

    // Validate required fields
    if (!email || !summary || !startDateTime || !endDateTime) {
      return res.status(400).json({
        success: false,
        message: "Email, summary, startDateTime, and endDateTime are required"
      });
    }

    // Validate datetime format
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use ISO 8601 format (e.g., 2025-01-15T10:00:00)"
      });
    }

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "Start time must be before end time"
      });
    }

    // Find professional by email
    const professional = await Professional.findOne({ email });
    if (!professional) {
      return res.status(404).json({ 
        success: false,
        message: "Professional not found" 
      });
    }

    // Check if professional has connected Google account
    if (!professional.accessToken || !professional.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Google Calendar not connected. Please connect your Google account first."
      });
    }

    // Get calendar instance
    const calendar = await getCalendarInstance(professional);

    // Create event object
    const event = {
      summary: summary,
      description: description,
      location: location,
      start: {
        dateTime: start.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "UTC",
      },
      colorId: "2", // Light green for availability
    };

    // Insert event into Google Calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    // Save to MongoDB for public access
    const availabilitySlot = await AvailabilitySlot.create({
      professionalId: professional._id,
      professionalEmail: professional.email,
      googleEventId: response.data.id,
      summary: response.data.summary,
      description: response.data.description,
      startDateTime: new Date(response.data.start.dateTime),
      endDateTime: new Date(response.data.end.dateTime),
      location: response.data.location,
      googleCalendarLink: response.data.htmlLink,
      status: 'available',
    });

    res.status(201).json({
      success: true,
      message: "Availability event created successfully",
      event: {
        id: response.data.id,
        summary: response.data.summary,
        description: response.data.description,
        start: response.data.start.dateTime,
        end: response.data.end.dateTime,
        location: response.data.location,
        htmlLink: response.data.htmlLink,
        slotId: availabilitySlot._id,
      },
    });

  } catch (error) {
    console.error("Error creating availability event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create availability event",
      error: error.message,
    });
  }
};

// Update an existing availability event
export const updateAvailabilityEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { email, summary, description, startDateTime, endDateTime, location } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required"
      });
    }

    // Find professional by email
    const professional = await Professional.findOne({ email });
    if (!professional) {
      return res.status(404).json({ 
        success: false,
        message: "Professional not found" 
      });
    }

    // Check if professional has connected Google account
    if (!professional.accessToken || !professional.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Google Calendar not connected. Please connect your Google account first."
      });
    }

    // Get calendar instance
    const calendar = await getCalendarInstance(professional);

    // Fetch existing event first
    const existingEvent = await calendar.events.get({
      calendarId: "primary",
      eventId: eventId,
    });

    if (!existingEvent.data) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Build update object with only provided fields
    const updateData = {};

    if (summary) updateData.summary = summary;
    if (description !== undefined) updateData.description = description;
    if (location !== undefined) updateData.location = location;

    // Handle start time
    if (startDateTime) {
      const start = new Date(startDateTime);
      if (isNaN(start.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid start date format"
        });
      }
      updateData.start = {
        dateTime: start.toISOString(),
        timeZone: "UTC",
      };
    }

    // Handle end time
    if (endDateTime) {
      const end = new Date(endDateTime);
      if (isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid end date format"
        });
      }
      updateData.end = {
        dateTime: end.toISOString(),
        timeZone: "UTC",
      };
    }

    // Validate start is before end if both provided
    if (updateData.start && updateData.end) {
      const startTime = new Date(updateData.start.dateTime);
      const endTime = new Date(updateData.end.dateTime);
      if (startTime >= endTime) {
        return res.status(400).json({
          success: false,
          message: "Start time must be before end time"
        });
      }
    }

    // Update event in Google Calendar
    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId: eventId,
      requestBody: updateData,
    });

    // Update in MongoDB
    const dbUpdateData = {};
    if (updateData.summary) dbUpdateData.summary = updateData.summary;
    if (updateData.description !== undefined) dbUpdateData.description = updateData.description;
    if (updateData.location !== undefined) dbUpdateData.location = updateData.location;
    if (updateData.start) dbUpdateData.startDateTime = new Date(updateData.start.dateTime);
    if (updateData.end) dbUpdateData.endDateTime = new Date(updateData.end.dateTime);

    await AvailabilitySlot.findOneAndUpdate(
      { googleEventId: eventId },
      { $set: dbUpdateData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Availability event updated successfully",
      event: {
        id: response.data.id,
        summary: response.data.summary,
        description: response.data.description,
        start: response.data.start.dateTime || response.data.start.date,
        end: response.data.end.dateTime || response.data.end.date,
        location: response.data.location,
        htmlLink: response.data.htmlLink,
      },
    });

  } catch (error) {
    console.error("Error updating availability event:", error);
    
    if (error.code === 404) {
      return res.status(404).json({
        success: false,
        message: "Event not found in Google Calendar"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update availability event",
      error: error.message,
    });
  }
};

// Get professional's availability schedule (optional helper endpoint)
export const getProfessionalSchedule = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const professional = await Professional.findOne({ email })
      .select('firstName lastName email isOnline availabilitySchedule');

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found"
      });
    }

    res.status(200).json({
      success: true,
      professional: {
        name: `${professional.firstName} ${professional.lastName}`,
        email: professional.email,
        isOnline: professional.isOnline,
        availabilitySchedule: professional.availabilitySchedule || [],
      },
    });

  } catch (error) {
    console.error("Error fetching professional schedule:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch professional schedule",
      error: error.message,
    });
  }
};

// PUBLIC: Get professional's available slots (for users to view and book)
export const getPublicAvailableSlots = async (req, res) => {
  try {
    const { email, month } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Professional email is required"
      });
    }

    // Find professional
    const professional = await Professional.findOne({ email })
      .select('firstName lastName email profilePicture designation specialization');

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found"
      });
    }

    // Build query
    const query = {
      professionalEmail: email,
      status: 'available',
      endDateTime: { $gte: new Date() }, // Only future slots
    };

    // If month specified, filter by month
    if (month) {
      const monthRegex = /^\d{4}-\d{2}$/;
      if (!monthRegex.test(month)) {
        return res.status(400).json({
          success: false,
          message: "Invalid month format. Use YYYY-MM"
        });
      }

      const [year, monthNum] = month.split("-");
      const startDate = new Date(year, parseInt(monthNum) - 1, 1);
      const endDate = new Date(year, parseInt(monthNum), 0, 23, 59, 59);

      query.startDateTime = { $gte: startDate, $lte: endDate };
    }

    // Fetch available slots from MongoDB
    const availableSlots = await AvailabilitySlot.find(query)
      .sort({ startDateTime: 1 })
      .select('-googleEventId -createdAt -updatedAt');

    res.status(200).json({
      success: true,
      message: "Available slots fetched successfully",
      professional: {
        name: `${professional.firstName} ${professional.lastName}`,
        email: professional.email,
        profilePicture: professional.profilePicture,
        designation: professional.designation,
        specialization: professional.specialization,
      },
      count: availableSlots.length,
      slots: availableSlots,
    });

  } catch (error) {
    console.error("Error fetching public available slots:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch available slots",
      error: error.message,
    });
  }
};

// PUBLIC: Get all professionals with their next available slot
export const getAllProfessionalsWithAvailability = async (req, res) => {
  try {
    // Get all approved professionals
    const professionals = await Professional.find({ isApprovedByAdmin: true })
      .select('firstName lastName email profilePicture designation specialization');

    // Get next available slot for each professional
    const professionalsWithSlots = await Promise.all(
      professionals.map(async (prof) => {
        const nextSlot = await AvailabilitySlot.findOne({
          professionalEmail: prof.email,
          status: 'available',
          endDateTime: { $gte: new Date() },
        })
          .sort({ startDateTime: 1 })
          .limit(1);

        return {
          id: prof._id,
          name: `${prof.firstName} ${prof.lastName}`,
          email: prof.email,
          profilePicture: prof.profilePicture,
          designation: prof.designation,
          specialization: prof.specialization,
          nextAvailableSlot: nextSlot ? {
            slotId: nextSlot._id,
            startDateTime: nextSlot.startDateTime,
            endDateTime: nextSlot.endDateTime,
            location: nextSlot.location,
          } : null,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Professionals with availability fetched successfully",
      count: professionalsWithSlots.length,
      professionals: professionalsWithSlots,
    });

  } catch (error) {
    console.error("Error fetching professionals with availability:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch professionals with availability",
      error: error.message,
    });
  }
};
