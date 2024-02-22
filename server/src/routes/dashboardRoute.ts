import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
const router: Router = Router();

router.get('/analytics/:id', protectAdmin, getDashboardAnalytics);
export default router;