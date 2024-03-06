"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.route('/')
    .get(authMiddleware_1.protect, usersController_1.getUserList)
    .post(authMiddleware_1.protect, usersController_1.addFriend);
router.post('/unfollow', authMiddleware_1.protect, usersController_1.unFollow);
router.get('/following', authMiddleware_1.protect, usersController_1.getFollowing);
router.get('/followers', authMiddleware_1.protect, usersController_1.getFollowers);
router.get('/close-friends', authMiddleware_1.protect, usersController_1.getCloseFriends);
router.get('/get-following', authMiddleware_1.protect, usersController_1.getFollowingWithoutCloseFriends);
router.post('/add-closefriend', authMiddleware_1.protect, usersController_1.addCloseFriend);
router.delete('/close-friend/:id', authMiddleware_1.protect, usersController_1.removeCloseFriend);
router.get('/get-user-profile/:id', authMiddleware_1.protect, usersController_1.getProfile);
router.get('/block-user/:id', authMiddleware_1.protect, usersController_1.blockUser);
router.get('/unblock-user/:id', authMiddleware_1.protect, usersController_1.unblockUser);
router.post('/report', authMiddleware_1.protect, usersController_1.addReport);
router.get('/user-search', authMiddleware_1.protect, usersController_1.searchUser);
exports.default = router;
