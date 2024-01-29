import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getUserManagement, getUserAnalytics,blockUser,unblockuser } from "../controllers/userManagementController";
const router: Router = Router();

router.get('/userlist', protectAdmin, getUserManagement)
router.get('/analytics', protectAdmin, getUserAnalytics)
router.put('/block/:id', protectAdmin, blockUser)
router.put('/unblock/:id', protectAdmin, unblockuser)

export default router;