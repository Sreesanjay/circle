import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { activatePlan, createPlan, deactivatePlan, getPlans } from "../controllers/planController";
const router: Router = Router();

router.route('/')
    .get(getPlans)
    .post(createPlan)
router.put('/activate/:id', activatePlan)
router.put('/deactivate/:id', deactivatePlan)

export default router;