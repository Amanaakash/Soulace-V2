import ChatRequest from '../models/ChatRequest.model.js';
import { getReceiverSocketId, io } from '../config/socket.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Send a chat request
export const sendChatRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user._id; // Assuming user is attached by auth middleware

        // Check if there's already a pending request between these users
        const existingRequest = await ChatRequest.findOne({
            sender: senderId,
            receiver: receiverId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json(errorResponse('A pending request already exists'));
        }

        // Create new chat request
        const chatRequest = await ChatRequest.create({
            sender: senderId,
            receiver: receiverId
        });

        // Get receiver's socket id and emit event
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('chat:request', {
                requestId: chatRequest._id,
                senderId: senderId
            });
        }

        res.status(201).json(successResponse('Chat request sent successfully', chatRequest));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

// Respond to a chat request (accept/decline)
export const respondToChatRequest = async (req, res) => {
    try {
        const { requestId, action } = req.body; // action should be 'accepted' or 'declined'
        const userId = req.user._id;

        const chatRequest = await ChatRequest.findById(requestId);
        if (!chatRequest) {
            return res.status(404).json(errorResponse('Chat request not found'));
        }

        // Verify the receiver is the one responding
        if (chatRequest.receiver.toString() !== userId.toString()) {
            return res.status(403).json(errorResponse('Unauthorized to respond to this request'));
        }

        // Update request status
        chatRequest.status = action;
        await chatRequest.save();

        // Emit event to sender
        const senderSocketId = getReceiverSocketId(chatRequest.sender.toString());
        if (senderSocketId) {
            io.to(senderSocketId).emit(`chat:${action}`, {
                requestId: chatRequest._id,
                receiverId: userId
            });
        }

        res.json(successResponse('Chat request updated successfully', chatRequest));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

// Get pending chat requests for a user
export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        const pendingRequests = await ChatRequest.find({
            receiver: userId,
            status: 'pending'
        }).populate('sender', 'name email'); // Adjust fields based on your User model

        res.json(successResponse('Pending requests retrieved successfully', pendingRequests));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};
