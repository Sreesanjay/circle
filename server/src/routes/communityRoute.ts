import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createCommunity, updateCommunity, updateIcon, getCommunities, joinCommunity, getMyCommunities, getCommunity, pendingRequest, acceptRequest } from "../controllers/communityController";
import { addComment, createDiscussion, deleteComment, deleteDiscussion, dislikeComment, dislikeDiscussion, getComments, getDiscussions, getReplyCommemts, likeComment, likeDiscussion } from "../controllers/discussionController";
const router: Router = Router();

router.post('/', protect, createCommunity)
router.put('/:id', protect, updateCommunity)
router.put('/icon/:id', protect, updateIcon)
router.get('/', protect, getCommunities)
router.get('/my-communities', protect, getMyCommunities)
router.get('/get-details/:id', protect, getCommunity)
router.post('/join', protect, joinCommunity)
router.get('/pending-request/:id', protect, pendingRequest)
router.post('/accept-request', protect, acceptRequest)


//discussion

router.get('/discussions/:id', protect, getDiscussions)
router.post('/discussions', protect, createDiscussion)
router.delete('/discussions/:id', protect, deleteDiscussion)
router.put('/discussions/like/:id', protect, likeDiscussion)
router.put('/discussions/dislike/:id', protect, dislikeDiscussion)

//comment
router.get('/discussions/comment/:id', protect, getComments)
router.get('/discussions/comment/reply/:id', protect, getReplyCommemts)
router.post('/discussions/comment', protect, addComment)
router.delete('/discussions/comment/:id', protect, deleteComment)
router.put('/discussions/comment/like/:id', protect, likeComment)
router.put('/discussions/comment/dislike/:id', protect, dislikeComment)


export default router;