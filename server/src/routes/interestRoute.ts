import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { newInterest, getAllInterest,deleteInterest,updateInterest } from "../controllers/adminInterestController";

const router: Router = Router();

router.route('/')
    .post(protectAdmin, newInterest)
    .get(protectAdmin, getAllInterest)

router.delete('/:id', protectAdmin, deleteInterest)
router.put('/:id', protectAdmin, updateInterest)

export default router;