"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const storyController_1 = require("../controllers/storyController");
const router = (0, express_1.Router)();
router.route('/')
    .get(authMiddleware_1.protect, storyController_1.getMyStory)
    .post(authMiddleware_1.protect, storyController_1.addStory);
router.delete('/:id', authMiddleware_1.protect, storyController_1.deleteStory);
router.get('/all-stories', authMiddleware_1.protect, storyController_1.getStories);
router.put('/view-story/:id', authMiddleware_1.protect, storyController_1.viewStory);
router.put('/like-story/:id', authMiddleware_1.protect, storyController_1.likeStory);
router.put('/dislike-story/:id', authMiddleware_1.protect, storyController_1.dislikeStory);
router.get('/get-viewers-list/:id', authMiddleware_1.protect, storyController_1.getUserList);
exports.default = router;
