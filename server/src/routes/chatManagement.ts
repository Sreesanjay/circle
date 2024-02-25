import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getAllChats, getChatAnalytics, removechat, undoRemovechat } from "../controllers/adminChatController";
const router: Router = Router();

router.get('/', getAllChats)
router.get('/analytics', protectAdmin, getChatAnalytics)
router.delete('/remove/:id', protectAdmin, removechat)
router.put('/undo-remove/:id', protectAdmin, undoRemovechat)

export default router;