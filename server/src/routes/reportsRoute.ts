import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getReports } from "../controllers/reportController";
const router: Router = Router();

router.get('/:id', protectAdmin, getReports)

export default router;