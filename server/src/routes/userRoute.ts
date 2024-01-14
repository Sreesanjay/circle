import {Router} from "express";
import { signup,googleAuth,signin } from "../controllers/userAuthController";
const router:Router = Router();

router.post('/signup',signup)
router.post('/google-auth',googleAuth)
router.post('/signin', signin)

export default router;  