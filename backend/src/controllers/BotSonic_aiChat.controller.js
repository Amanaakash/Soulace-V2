import axios from 'axios';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Generate valid UUID

dotenv.config();

const BOTSONIC_API_URL = 'https://api-azure.botsonic.ai/v1/botsonic/generate';
const BOTSONIC_API_TOKEN = process.env.BOTSONIC_API_TOKEN; // Your API Token (not API Key)

// Function to interact with the chatbot
export const chatWithBotSonic = async (req, res) => {
  try {
    let { message, chatId } = req.body;

    // Validate inputs
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    // Ensure chatId is a valid UUID, or generate a new one if not provided
    if (!chatId) {
      chatId = uuidv4();
    }

    // Prepare the request payload
    const requestBody = {
      input_text: message, // The user's input message
      chat_id: chatId, // The unique chat ID (ensure it's a valid UUID)
      enable_memory: true, // Enable memory for the conversation
    };

    // Send the request to Botsonic API
    const response = await axios.post(
      BOTSONIC_API_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'token': BOTSONIC_API_TOKEN, // Use the API Token here in the custom `token` header
        },
      }
    );

    // Log the response for debugging
    console.log("Botsonic Response:", response.data);

    // Return the full bot's response to the client
    return res.status(200).json({
      success: true,
      chatId,
      answer: response.data.answer, // The chatbot's generated answer
      message_id: response.data.message_id, // The message ID from the response
      chat_history: response.data.chat_history, // The full chat history
      generated_images: response.data.generated_images, // Any generated images (if any)
      follow_up_questions: response.data.follow_up_questions, // Follow-up questions (if any)
      human_handoff_status: response.data.human_handoff_status, // Human handoff status
      user_options: response.data.user_options, // User options (if any)
      chat_ended: response.data.chat_ended, // Whether the chat has ended
      end_chat_feedback: response.data.end_chat_feedback, // Feedback (if any)
    });

  } catch (error) {
    console.error("Error communicating with Botsonic:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Error processing request. Please try again later.",
      error: error.response?.data || error.message,
    });
  }
};
