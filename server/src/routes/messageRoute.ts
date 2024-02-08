import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addMessage, getMessages } from "../controllers/messageController";
const router: Router = Router();

router.post('/', protect, addMessage);

router.get('/:chat_id', protect, getMessages);

export default router