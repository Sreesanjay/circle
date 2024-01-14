import {Router} from "express";
import { signup,googleAuth,signin } from "../controllers/userAuthController";
import userProfile from "./userProfile";
const router:Router = Router();

router.post('/signup',signup)
router.post('/google-auth',googleAuth)
router.post('/signin', signin)
router.use('/profile', userProfile)

export default router;  