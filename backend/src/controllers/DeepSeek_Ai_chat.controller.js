import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1';

const systemPrompt = `
You are SoulBot, a compassionate and emotionally supportive AI friend.
Your job is to actively listen to users who may be sad, anxious, or emotionally overwhelmed.
At first, just listen and engage warmly like a real human would.
Only offer advice when the user feels safe, heard, and supported.
Respond naturally and kindly — like a real friend who genuinely cares.
`;

/**
 * SoulBot AI Chat Handler
 */
export const DeepSeekBotChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: 'Message is required',
    });
  }

  try {
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 800
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    return res.status(200).json({
      success: true,
      message: 'SoulBot response generated successfully',
      response: reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('SoulBot Error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate SoulBot response',
      error: error.message
    });
  }
};
