import {Router} from "express";
import { signup,googleAuth,signin,verifyMail,verifyOtp, resetPassword } from "../controllers/userAuthController";
import userProfile from "./userProfile";
import manageAccRoute from "./manageAccRoute";
import { protect } from "../middlewares/authMiddleware";
const router:Router = Router();

router.post('/signup',signup)
router.post('/google-auth',googleAuth)
router.post('/verify-mail',verifyMail)
router.post('/verify-otp',verifyOtp)
router.post('/signin', signin)
router.use('/profile', userProfile)
router.use('/manage-account',manageAccRoute)
router.post('/reset-password',protect, resetPassword)
export default router;  