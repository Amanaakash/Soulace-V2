import express from 'express';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import userRoute from './src/routes/user.routes.js';
import VerifyRoute from './src/routes/verification.route.js';
import aiRoute from './src/routes/aiChat.route.js';
import professionalRoute from './src/routes/professional.route.js';
import cors from 'cors';// Middleware for handling CORS errors
import profVerifyRoute from './src/routes/professionalVerification.route.js';
import adminRoute from './src/routes/admin.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './src/routes/message.routes.js';
import {app, server} from './src/config/socket.js';
import matchRoute from './src/routes/match.routes.js';
import chatRequestRoute from './src/routes/chatRequest.route.js';
import checkRegisteredUser from './src/middleware/authUser.middleware.js';


app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectDB();



// Routes for users
app.use('/api/users',userRoute);
app.use('/api/verify', VerifyRoute);

//Routes for professionals
app.use('/api/professional',professionalRoute);
app.use('/api/verify-prof',profVerifyRoute);

//AI chatbot routes
app.use('/api/aiChat',aiRoute);

//Admin Routes
app.use('/api/admin',adminRoute);

//Routes for messages
app.use("/api/messages", messageRoutes);
app.use('/api/online-users',matchRoute);
app.use('/api/chat-requests',checkRegisteredUser,chatRequestRoute);



// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});