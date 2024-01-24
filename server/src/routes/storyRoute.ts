import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addStory, getMyStory } from "../controllers/storyController";
const router: Router = Router();

router.route('/')
    .get(protect, getMyStory)
    .post(protect, addStory)

export default router;