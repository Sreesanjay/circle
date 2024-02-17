import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createCommunity, updateCommunity, updateIcon, getCommunities, joinCommunity, getMyCommunities } from "../controllers/communityController";
const router: Router = Router();

router.post('/', protect, createCommunity)
router.put('/:id', protect, updateCommunity)
router.put('/icon/:id', protect, updateIcon)
router.get('/', protect, getCommunities)
router.post('/join', protect, joinCommunity)
router.get('/my-communities', protect, getMyCommunities)


export default router;