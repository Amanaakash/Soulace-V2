import express from 'express';
import { chatWithBotSonic } from '../controllers/BotSonic_aiChat.controller.js';
import checkRegisteredUser from '../middleware/authUser.middleware.js';
import { DeepSeekBotChat } from '../controllers/DeepSeek_Ai_chat.controller.js';

const router = express.Router();

router.post('/bot-sonic',checkRegisteredUser ,chatWithBotSonic);


router.post('/deepseek',checkRegisteredUser,DeepSeekBotChat)

export default router;
