import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getUserList, addFriend, unFollow,getFollowing,getFollowers,getCloseFriends,getFollowingWithoutCloseFriends,addCloseFriend } from "../controllers/usersController";
const router: Router = Router();

router.route('/')
    .get(protect, getUserList)
    .post(protect, addFriend)
router.post('/unfollow',protect,unFollow)
router.get('/following',protect,getFollowing)
router.get('/followers',protect,getFollowers)
router.get('/close-friends',protect,getCloseFriends)
router.get('/get-following',protect,getFollowingWithoutCloseFriends)
router.post('/add-closefriend',protect,addCloseFriend)
export default router