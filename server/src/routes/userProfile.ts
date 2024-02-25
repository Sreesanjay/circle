import { Router } from "express";
import { getUserProfile, updateCoverImg, deleteCoverImg, updateProfileImg, deleteProfileImg, updateProfile, getConnectionCount, getMyPosts, getSavedPosts, createPaymentRequest, addVerification } from "../controllers/userProfileController";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();


router.route('/')
    .get(protect, getUserProfile)
    .put(protect, updateProfile)
router.patch('/update-cover-img', protect, updateCoverImg)
router.delete('/delete-cover-img', protect, deleteCoverImg)
router.patch('/update-profile_img', protect, updateProfileImg)
router.delete('/delete-profile_img', protect, deleteProfileImg)
router.get('/connection-count', protect, getConnectionCount)
router.get('/posts', protect, getMyPosts)
router.get('/saved-posts', protect, getSavedPosts)


//verification
router.post('/createPayment', protect, createPaymentRequest)
router.post('/add-verification', protect, addVerification)
export default router;