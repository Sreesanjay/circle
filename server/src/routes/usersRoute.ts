import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getUserList, addFriend, unFollow,getFollowing,getFollowers } from "../controllers/usersController";
const router: Router = Router();

router.route('/')
    .get(protect, getUserList)
    .post(protect, addFriend)
router.post('/unfollow',protect,unFollow)
router.get('/following',protect,getFollowing)
router.get('/followers',protect,getFollowers)
export default router