import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getUserList, addFriend, unFollow,getFollowing } from "../controllers/usersController";
const router: Router = Router();

router.route('/')
    .get(protect, getUserList)
    .post(protect, addFriend)
router.post('/unfollow',protect,unFollow)
router.get('/following',protect,getFollowing)
export default router