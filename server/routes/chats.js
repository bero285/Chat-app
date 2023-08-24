import express from "express";
import { createChat } from "../controllers/chats.js";
// import { createChat, sendMessage } from "../controllers/chats.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ */
router.post("/", createChat);
// router.post("/send", sendMessage);

export default router;
