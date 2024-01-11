import {Router} from "express";
import { signup } from "../controllers/userAuthController";
const router:Router = Router();

router.post('/signup',signup)

export default router;  