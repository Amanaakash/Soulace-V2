import express from "express";
import { matchUsers } from "../controllers/match.controller.js";
import checkRegisteredUser from "../middleware/authUser.middleware.js";

const router = express.Router();

router.post('/match',checkRegisteredUser, matchUsers);

export default router;
