import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getAllInterest, getMyInterest, addInterest, deleteMyInterest } from "../controllers/accountManagementController";
const router: Router = Router();

router.route('/interest')
    .get(protect, getAllInterest)
    .post(protect, getMyInterest)
router.post('/interest/add-interest', protect, addInterest)
router.delete('/interest/:id', protect, deleteMyInterest)
export default router;