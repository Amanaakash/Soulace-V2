import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv';

const app = express();
const server = http.createServer(app);
dotenv.config();

const io = new Server(server, {
  cors: {
    origin:process.env.FRONTEND_URL, // Adjust based on frontend URL
  },
});

// Online users mapping
const userSocketMap = {}; // {userId: socketId}

// Function to get receiver's socket id
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Emit updated online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // 🔹 Handle Incoming Chat Request
  socket.on("chat:request", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("chat:incomingRequest", { senderId });
    }
  });

  // 🔹 Handle Chat Request Acceptance
  socket.on("chat:accept", ({ senderId, receiverId }) => {
    const senderSocketId = userSocketMap[senderId];

    if (senderSocketId) {
      io.to(senderSocketId).emit("chat:accepted", { receiverId });
    }
  });

  // 🔹 Handle Chat Request Rejection
  socket.on("chat:reject", ({ senderId, receiverId }) => {
    const senderSocketId = userSocketMap[senderId];

    if (senderSocketId) {
      io.to(senderSocketId).emit("chat:rejected", { receiverId });
    }
  });

  // Handle chat request timeout
  socket.on("chat:requestTimeout", ({ requestId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("chat:requestExpired", { requestId });
    }
  });

  // Handle user typing status
  socket.on("chat:typing", ({ receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("chat:userTyping", { senderId: userId });
    }
  });

  socket.on("chat:stopTyping", ({ receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("chat:userStoppedTyping", { senderId: userId });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove user from online users
    const userId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    );
    if (userId) delete userSocketMap[userId];

    // Emit updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
