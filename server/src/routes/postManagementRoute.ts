import { Router } from "express";
import { protectAdmin } from "../middlewares/authMiddleware";
import { getPostList, undoDelete,getAnalytics } from "../controllers/postManagementController";
import { deletePost } from "../controllers/postController";
const router: Router = Router();

router.get('/postlist', protectAdmin, getPostList)
router.get('/analytics', protectAdmin, getAnalytics)
router.delete('/remove/:id', protectAdmin,deletePost)
router.put('/undo-remove/:id', protectAdmin,undoDelete)

export default router