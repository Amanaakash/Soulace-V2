import express from "express";
import checkRegisteredUser from "../middleware/authUser.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
// import { matchUsers } from "../controllers/match.controller.js";

const router = express.Router();

router.get("/users", checkRegisteredUser, getUsersForSidebar);
router.get("/:id", checkRegisteredUser, getMessages);
router.post("/send/:id", checkRegisteredUser, sendMessage);


export default router;
