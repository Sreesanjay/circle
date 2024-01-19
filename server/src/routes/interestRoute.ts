import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { newInterest } from "../controllers/adminInterestController";

const router: Router = Router();

router.route('/')
    .post(protectAdmin, newInterest)

export default router;