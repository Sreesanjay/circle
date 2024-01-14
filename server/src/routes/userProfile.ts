import { Router } from "express";
import { getUserProfile } from "../controllers/userProfileController";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();
router.route('/').get(protect, getUserProfile)
export default router;