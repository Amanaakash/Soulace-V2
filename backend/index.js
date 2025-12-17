import express from 'express';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import userRoute from './src/routes/user.routes.js';
import professionalRoute from './src/routes/professional.route.js';
import listenerRoute from './src/routes/listener.routes.js';
import cors from 'cors';// Middleware for handling CORS errors
import adminRoute from './src/routes/admin.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './src/routes/message.routes.js';
import {app, server} from './src/config/socket.js';
import matchRoute from './src/routes/match.routes.js';
import chatRequestRoute from './src/routes/chatRequest.route.js';
import checkRegisteredUser from './src/middleware/authUser.middleware.js';
import aiRoute from './src/routes/aiChat.route.js';
import authRoutes from "./src/routes/authRoute.js";
import calendarRoutes from "./src/routes/calendar.routes.js";


dotenv.config();

// CORS configuration to allow credentials
const allowedOrigins = [
  'https://soulace-v2.vercel.app',
  'http://localhost:5173',
  'http://localhost:5000'
];

// If FRONTEND_URL is set in env, add it to allowed origins
if (process.env.FRONTEND_URL) {
  const envOrigins = process.env.FRONTEND_URL.split(',').map(origin => origin.trim());
  allowedOrigins.push(...envOrigins);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
connectDB();


// Routes for users
app.use('/api/users',userRoute);

//Routes for professionals
app.use('/api/professional',professionalRoute);
//google auth
app.use("/api/professional/google-auth", authRoutes);

//Calendar routes for professionals
app.use('/api/calendar', calendarRoutes);

//Routes for listeners
app.use('/api/listener',listenerRoute);

//Admin Routes
app.use('/api/admin',adminRoute);

//Routes for messages
app.use("/api/messages", messageRoutes);
app.use('/api/match-online-users',matchRoute);
app.use('/api/chat-requests',checkRegisteredUser,chatRequestRoute);

app.use('/api/ai-chat',aiRoute);



app.get('/', (req, res) => {
res.json({
  message: "Soulace BackendAPI is running...",
  serverTime: new Date().toLocaleString()
});


});
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global error handlers to prevent server crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, just log the error
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // Don't exit the process, just log the error
});