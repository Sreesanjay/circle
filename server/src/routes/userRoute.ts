import { Router } from "express";
import { signup, googleAuth, signin, verifyMail, verifyOtp, refreshToken } from "../controllers/userAuthController";
import userProfile from "./userProfile";
import manageAccRoute from "./manageAccRoute";
import usersRoute from "./usersRoute";
import storyRoute from "./storyRoute";
import postsRoute from "./postsRoute";
import chatRoute from "./chatRoute";
import messageRoute from "./messageRoute";
import notificationRoute from "./notificationRoute";
import communityRoute from "./communityRoute";
const router: Router = Router();


router.post('/signup', signup)
router.post('/google-auth', googleAuth)
router.post('/verify-mail', verifyMail)
router.post('/refresh-token', refreshToken)
router.post('/verify-otp', verifyOtp)
router.post('/signin', signin)
router.use('/profile', userProfile)
router.use('/manage-account', manageAccRoute)
router.use('/users', usersRoute)
router.use('/story', storyRoute)
router.use('/posts', postsRoute)
router.use('/chat', chatRoute)
router.use('/message', messageRoute)
router.use('/notifications', notificationRoute)
router.use('/community', communityRoute)

export default router;  