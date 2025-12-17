// 1. NETWORK FIX: This MUST be the very first line
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config();

import { OpenRouter } from "@openrouter/sdk";

// Debug check
console.log("Debug API Key:", process.env.OPEN_ROUTER_KEY ? "Exists" : "MISSING");

const openrouter = new OpenRouter({
  apiKey: process.env.OPEN_ROUTER_KEY,
});

const SOULACE_SYSTEM_PROMPT = `
You are Soulace AI, a compassionate and empathetic mental health support assistant. Your role is to provide a safe space for users to express their feelings, listen actively with empathy, and offer gentle coping strategies or mindfulness techniques when appropriate. Use a warm, caring, non-judgmental, and respectful tone at all times.

You must never diagnose conditions or prescribe medication and should encourage users to seek professional help when needed. Keep responses concise but meaningful (1 to 2 paragraphs (keep first paragraph presice, always point to the main thing of the context and give user a clear answer, no genralization and in second paragraph, you can offer additional insights or supportive advice)), ask thoughtful follow-up questions, and sometimes remind users that you are an AI—not a replacement for therapy.

If users feel low, anxious, stressed, or express negative self-worth (e.g., feeling like a burden or useless), respond with comfort, positive affirmations, and encouragement. Remember: you are here to support, not to fix.

IMPORTANT: You MUST respond in valid JSON format only. Your response should be a JSON object with exactly these two fields:
{
  "response": "your empathetic message here",
  "crisisState": false
}

The "response" field should contain your complete message to the user. The "crisisState" field should be true only if the user expresses suicidal thoughts, self-harm intent, or immediate danger requiring professional intervention, otherwise false.

Be a good listener and provide empathetic, thoughtful responses that prioritize the user's emotional well-being.

Act friendly, means as a real-life friend, who gets happier to talk to the user and help them out.

Keep your responses dynamic and engaging, avoiding repetitive phrases or structures.

Reply in CBT style. CBT means Cognitive Behavioral Therapy, here you will help user to identify and challenge negative thought patterns and behaviors, and replace them with more positive and constructive ones.
`;

export const chatWithGemini = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.OPEN_ROUTER_KEY) {
      console.error("❌ OPEN_ROUTER_KEY is missing from .env file");
      return res.status(500).json({ 
        error: "OpenRouter API key not configured",
        details: "Please add OPEN_ROUTER_KEY to your .env file and restart the server"
      });
    }

    console.log("✅ OpenRouter API Key found, making request...");

    // Format chat history for OpenRouter
    const messages = [
      {
        role: "system",
        content: SOULACE_SYSTEM_PROMPT,
      },
    ];

    // Add conversation history
    if (Array.isArray(history) && history.length > 0) {
      history.forEach((msg) => {
        messages.push({
          role: msg.role === "model" || msg.role === "assistant" ? "assistant" : "user",
          content: msg.message || msg.content || msg.parts?.[0]?.text || "",
        });
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message,
    });

    console.log("🔄 Sending request to OpenRouter API...");
    console.log("📝 Message count:", messages.length);

    // Use OpenRouter SDK to send chat request (non-streaming)
    let completion;
    try {
      completion = await openrouter.chat.send({
        model: "deepseek/deepseek-r1-0528:free", // Free DeepSeek model
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        response_format: { type: "json_object" }, // Request JSON format
        stream: false, // Non-streaming response
      });
    } catch (apiError) {
      console.error("❌ OpenRouter API Request Failed:", apiError.message);
      
      // Check if it's a network error
      if (apiError.code === 'ECONNRESET' || apiError.code === 'ETIMEDOUT' || apiError.message.includes('terminated')) {
        throw new Error("Network connection error. Please try again.");
      }
      
      // Re-throw other errors
      throw apiError;
    }

    console.log("✅ Received response from OpenRouter");

    if (!completion.choices || !completion.choices[0] || !completion.choices[0].message) {
      console.error("❌ Unexpected API response structure:", JSON.stringify(completion, null, 2));
      throw new Error("Invalid response structure from OpenRouter");
    }

    const responseText = completion.choices[0].message.content;
    console.log("📄 Response text length:", responseText.length);

    // Strip markdown code fences if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    // Try to parse JSON with better error handling
    let responseJson;
    try {
      // First attempt: direct parse
      responseJson = JSON.parse(cleanedText);
    } catch (parseError) {
      console.warn("Initial JSON parse failed, attempting to fix common issues...");

      try {
        // Attempt to fix common JSON issues
        // 1. Remove potential trailing commas
        let fixedText = cleanedText.replace(/,(\s*[}\]])/g, '$1');

        // 2. Fix unescaped newlines in strings
        fixedText = fixedText.replace(/\n/g, '\\n');

        // 3. Try to extract JSON if it's embedded in text
        const jsonMatch = fixedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          fixedText = jsonMatch[0];
        }

        responseJson = JSON.parse(fixedText);
        console.log("Successfully parsed JSON after fixes");
      } catch (secondError) {
        console.error("JSON Parse Error Details:", {
          original: responseText.substring(0, 500),
          cleaned: cleanedText.substring(0, 500),
          error: secondError.message
        });

        // Fallback: Create a response object from the text
        responseJson = {
          response: cleanedText || "I'm here to listen. Could you tell me more about what's on your mind?",
          crisisState: false
        };

        console.log("Using fallback response due to JSON parse failure");
      }
    }

    return res.status(200).json({
      success: true,
      reply: responseJson.response || responseJson.reply || "I'm here to help. How are you feeling?",
      crisisState: responseJson.crisisState || false,
    });

  } catch (error) {
    console.error("❌ Soulace AI Error:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      error: "Failed to process request",
      details: error.message,
    });
  }
};