import express from "express";
import { createChat } from "../controllers/chats.js";


const router = express.Router();

/*READ */
router.post("/", createChat);


export default router;
