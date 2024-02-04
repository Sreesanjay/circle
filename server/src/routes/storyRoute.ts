import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addStory, getMyStory, getStories } from "../controllers/storyController";
const router: Router = Router();

router.route('/')
    .get(protect, getMyStory)
    .post(protect, addStory)
router.get('/all-stories',protect,getStories);

export default router;