import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addMessage, getMessages, readMessage } from "../controllers/messageController";
const router: Router = Router();

router.post('/', protect, addMessage);
router.get('/:chat_id', protect, getMessages);
router.put('/read/:id', protect, readMessage);

export default router