import { Router } from "express";
import { getUserProfile,updateCoverImg } from "../controllers/userProfileController";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();
router.route('/').get(protect, getUserProfile)
router.patch('/update-cover-img',protect,updateCoverImg)
export default router;