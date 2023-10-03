import express from "express";
import { getUser } from "../controllers/users.js";


const router = express.Router();

/*READ*/
router.get("/", getUser);

export default router;
