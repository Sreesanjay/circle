import { Router } from "express";
import { getUserProfile, updateCoverImg, deleteCoverImg, updateProfileImg, deleteProfileImg, updateProfile } from "../controllers/userProfileController";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();


router.route('/')
.get(protect, getUserProfile)
.put(protect,updateProfile)
router.patch('/update-cover-img', protect, updateCoverImg)
router.delete('/delete-cover-img', protect, deleteCoverImg)
router.patch('/update-profile_img', protect, updateProfileImg)
router.delete('/delete-profile_img', protect, deleteProfileImg)
export default router;