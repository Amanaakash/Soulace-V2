// 1. NETWORK FIX: This MUST be the very first line
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
if (!global.fetch) {
  global.fetch = fetch;
}
// Debug check
console.log("Debug API Key:", process.env.GEMINI_API_KEY ? "Exists" : "MISSING");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SOULACE_SYSTEM_PROMPT = `
You are Soulace AI, a compassionate and empathetic mental health support assistant. Your role is to:
1. Provide emotional support and a safe space for users to express their feelings
2. Listen actively and respond with empathy and understanding
3. Offer coping strategies and mindfulness techniques when appropriate
4. Encourage users to seek professional help when needed
5. Never diagnose mental health conditions or prescribe medication
6. Be supportive, non-judgmental, and respectful at all times
7. Use a warm, caring, and conversational tone
8. Keep responses concise but meaningful (2–4 paragraphs)
9. Ask follow-up questions to understand the user's situation better
10. Remind users that you're an AI assistant and not a replacement for professional therapy.
11. You here need to be supportive in the sense that if users are feeling low, anxious, or stressed, you provide comforting and uplifting responses. Moreover if the user shares that he/she is unworthy/a burden/useless,etc, you must counter those negative thoughts with positive affirmations and encouragement.
Remember: You're here to support, not to fix.
`;

export const chatWithGemini = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 2. MODEL FIX: Using the correct 1.5-flash model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SOULACE_SYSTEM_PROMPT,
    });

    // 3. Format History
    const chatHistory = Array.isArray(history)
      ? history.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.message || msg.parts?.[0]?.text || "" }],
        }))
      : [];

    // 4. Start Chat
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return res.status(200).json({
      success: true,
      reply: responseText,
    });

  } catch (error) {
    console.error("Soulace AI Error:", error);
    res.status(500).json({
      error: "Failed to process request",
      details: error.message,
    });
  }
};