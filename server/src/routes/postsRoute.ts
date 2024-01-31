import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getPosts, postComment, uploadPost,getReplys,getComments } from "../controllers/postController";
const router: Router = Router();

router.route('/').post(protect, uploadPost)
router.route('/').get(protect, getPosts)
router.post('/comment',protect,postComment)
router.get('/comment/:id',protect,getComments)
router.get('/comment/replys/:id',protect,getReplys)
export default router;