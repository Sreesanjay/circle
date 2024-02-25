import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getDiscussion, getDiscussionAnalytics, undoRemoveDiscussion } from "../controllers/discussionManagementController";
import { deleteDiscussion } from "../controllers/discussionController";
const router: Router = Router();

router.get('/', protectAdmin, getDiscussion)
router.get('/', protectAdmin, getDiscussion)
router.get('/analytics', protectAdmin, getDiscussionAnalytics)
router.delete('/remove/:id', protectAdmin,deleteDiscussion)
router.put('/undo-remove/:id', protectAdmin,undoRemoveDiscussion)

export default router;