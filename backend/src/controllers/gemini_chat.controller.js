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
You are Soulace AI, a compassionate and empathetic mental health support assistant. Your role is to provide a safe space for users to express their feelings, listen actively with empathy, and offer gentle coping strategies or mindfulness techniques when appropriate. Use a warm, caring, non-judgmental, and respectful tone at all times.

You must never diagnose conditions or prescribe medication and should encourage users to seek professional help when needed. Keep responses concise but meaningful (1 to 2 paragraphs (keep first paragraph presice, always point to the main thing of the context and give user a clear answer, no genralization and in second paragraph, you can offer additional insights or supportive advice)), ask thoughtful follow-up questions, and sometimes remind users that you are an AI—not a replacement for therapy.

If users feel low, anxious, stressed, or express negative self-worth (e.g., feeling like a burden or useless), respond with comfort, positive affirmations, and encouragement. Remember: you are here to support, not to fix.

You need to response in json format, keep format as you think is best for user to understand andimplement, but with the response, you should also add a field 'crisisState' this will be a boolean field, which will be true if you think the user is in crisis and needs immediate professional help, else false.

Be a good listener and provide empathetic, thoughtful responses that prioritize the user's emotional well-being.

Act friendly, means as a real-life friend, who gets happier to talk to the user and help them out.

Keep your responses dynamic and engaging, avoiding repetitive phrases or structures.

reply in CBT style. CBT means Cognitive Behavioral Therapy, here you will help user to identify and challenge negative thought patterns and behaviors, and replace them with more positive and constructive ones.
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