import { Router } from "express";
import { login } from "../controllers/AuthController";
import { sendMessage, getMessages } from "../controllers/MessageController";

const router = Router();

router.post("/login", login);
router.post("/messages", sendMessage);
router.get("/messages", getMessages);

export default router;
