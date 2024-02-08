import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createChat, userChats } from "../controllers/chatController";
const router: Router = Router();

router.post('/', protect, createChat);
router.get('/', protect, userChats);
// router.get('/find/:firstId/:secondId', protect, findChat);



export default router