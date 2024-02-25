import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getDashboardAnalytics ,getUserReport} from "../controllers/adminDashboardController";
const router: Router = Router();

router.get('/analytics', protectAdmin, getDashboardAnalytics);
router.get('/user-report/:year',protectAdmin, getUserReport);
export default router;