import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getCommunities, getCommunityAnalytics, undoRemoveCommunity } from "../controllers/communityManagementController";
import {removeCommunity } from "../controllers/communityController";
const router: Router = Router();

router.get('/', protectAdmin, getCommunities)
router.get('/analytics', protectAdmin, getCommunityAnalytics)
router.put('/remove/:id', protectAdmin, removeCommunity)
router.put('/undo-remove/:id', protectAdmin, undoRemoveCommunity)

export default router;