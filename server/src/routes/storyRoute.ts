import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addStory, getMyStory, getStories, viewStory, likeStory, dislikeStory, getUserList, deleteStory } from "../controllers/storyController";
const router: Router = Router();

router.route('/')
    .get(protect, getMyStory)
    .post(protect, addStory)
router.delete('/:id', protect, deleteStory);
router.get('/all-stories', protect, getStories);
router.put('/view-story/:id', protect, viewStory);
router.put('/like-story/:id', protect, likeStory);
router.put('/dislike-story/:id', protect, dislikeStory);
router.get('/get-viewers-list/:id', protect, getUserList);

export default router;