import {Router} from "express";
import { signup,googleAuth,signin,verifyMail,verifyOtp} from "../controllers/userAuthController";
import userProfile from "./userProfile";
import manageAccRoute from "./manageAccRoute";
import usersRoute from "./usersRoute";
import storyRoute from "./storyRoute";
const router:Router = Router();

router.post('/signup',signup)
router.post('/google-auth',googleAuth)
router.post('/verify-mail',verifyMail)
router.post('/verify-otp',verifyOtp)
router.post('/signin', signin)
router.use('/profile', userProfile)
router.use('/manage-account',manageAccRoute)
router.use('/users',usersRoute)
router.use('/story',storyRoute)
export default router;  