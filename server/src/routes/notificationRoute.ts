import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getUnreadNotifications, readNotificaiton } from "../controllers/notificationController";
const router: Router = Router();

router.get('/', protect, getUnreadNotifications)
router.put('/:id', protect, readNotificaiton)

export default router;