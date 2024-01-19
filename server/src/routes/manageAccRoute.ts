import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();

router.route('interest').get(protect, getAllInterest)

export default router;