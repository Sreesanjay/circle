import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { activatePlan, createPlan, deactivatePlan, getPlans } from "../controllers/planController";
const router: Router = Router();

router.route('/')
    .get(protectAdmin, getPlans)
    .post(protectAdmin, createPlan)
router.put('/activate/:id', protectAdmin, activatePlan)
router.put('/deactivate/:id', protectAdmin, deactivatePlan)

export default router;