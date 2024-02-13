import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { getUserList, addFriend, unFollow, getFollowing, getFollowers, getCloseFriends, getFollowingWithoutCloseFriends, addCloseFriend, removeCloseFriend, getProfile,blockUser,unblockUser, addReport,searchUser } from "../controllers/usersController";
const router: Router = Router();

router.route('/')
    .get(protect, getUserList)
    .post(protect, addFriend)
router.post('/unfollow', protect, unFollow)
router.get('/following', protect, getFollowing)
router.get('/followers', protect, getFollowers)
router.get('/close-friends', protect, getCloseFriends)
router.get('/get-following', protect, getFollowingWithoutCloseFriends)
router.post('/add-closefriend', protect, addCloseFriend)
router.delete('/close-friend/:id', protect, removeCloseFriend)
router.get('/get-user-profile/:id', protect, getProfile)
router.get('/block-user/:id', protect, blockUser)
router.get('/unblock-user/:id', protect, unblockUser)
router.post('/report', protect, addReport)
router.get('/user-search', protect, searchUser)

export default router