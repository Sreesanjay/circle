import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getAllInterest, getMyInterest } from "../controllers/accountManagementController";
const router: Router = Router();

router.route('/interest')
    .get(protect, getAllInterest)
    .post(protect, getMyInterest)

export default router;