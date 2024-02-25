import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getPosts, postComment, uploadPost, getReplys, getComments, addLike, disLike, savePost, unsavePost, deletePost, editPost, likedUserList } from "../controllers/postController";
import { getPlans } from "../controllers/planController";
import { addClick, boostPost, createPayment, getInsights } from "../controllers/postBoostController";
const router: Router = Router();

router.route('/')
    .post(protect, uploadPost)
    .get(protect, getPosts)
router.put('/:id', protect, editPost)
router.delete('/:id', protect, deletePost)
router.post('/comment', protect, postComment)
router.get('/comment/:id', protect, getComments)
router.get('/comment/replys/:id', protect, getReplys)
router.put('/like/:id', protect, addLike)
router.put('/dislike/:id', protect, disLike)
router.post('/save/', protect, savePost)
router.delete('/unsave/:id', protect, unsavePost)
router.get('/liked-user-list/:id', protect, likedUserList)
router.get('/analytics', protect, getInsights)
router.post('/add-click', protect, addClick)


//post boost
router.get('/plans', protect, getPlans)
router.post('/create-payment', protect, createPayment)
router.post('/boost', protect, boostPost)
export default router;