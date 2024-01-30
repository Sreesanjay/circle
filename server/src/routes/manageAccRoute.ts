import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getAllInterest, getMyInterest, addInterest, deleteMyInterest,getBlockedUsers } from "../controllers/accountManagementController";
import { resetPassword } from "../controllers/userAuthController";
const router: Router = Router();

router.route('/interest')
    .get(protect, getAllInterest)
    .post(protect, getMyInterest)
router.post('/interest/add-interest', protect, addInterest)
router.delete('/interest/:id', protect, deleteMyInterest)
router.post('/reset-password',protect, resetPassword)
router.get('/blocked-users',protect, getBlockedUsers)
export default router;