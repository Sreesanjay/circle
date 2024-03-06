"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const postController_1 = require("../controllers/postController");
const planController_1 = require("../controllers/planController");
const postBoostController_1 = require("../controllers/postBoostController");
const router = (0, express_1.Router)();
router.route('/')
    .post(authMiddleware_1.protect, postController_1.uploadPost)
    .get(authMiddleware_1.protect, postController_1.getPosts);
router.put('/:id', authMiddleware_1.protect, postController_1.editPost);
router.delete('/:id', authMiddleware_1.protect, postController_1.deletePost);
router.post('/comment', authMiddleware_1.protect, postController_1.postComment);
router.get('/comment/:id', authMiddleware_1.protect, postController_1.getComments);
router.get('/comment/replys/:id', authMiddleware_1.protect, postController_1.getReplys);
router.put('/like/:id', authMiddleware_1.protect, postController_1.addLike);
router.put('/dislike/:id', authMiddleware_1.protect, postController_1.disLike);
router.post('/save/', authMiddleware_1.protect, postController_1.savePost);
router.delete('/unsave/:id', authMiddleware_1.protect, postController_1.unsavePost);
router.get('/liked-user-list/:id', authMiddleware_1.protect, postController_1.likedUserList);
router.get('/analytics', authMiddleware_1.protect, postBoostController_1.getInsights);
router.post('/add-click', authMiddleware_1.protect, postBoostController_1.addClick);
//post boost
router.get('/plans', authMiddleware_1.protect, planController_1.getPlans);
router.post('/create-payment', authMiddleware_1.protect, postBoostController_1.createPayment);
router.post('/boost', authMiddleware_1.protect, postBoostController_1.boostPost);
exports.default = router;
