"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const chatController_1 = require("../controllers/chatController");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.protect, chatController_1.createChat);
router.get('/get-chat/:id', authMiddleware_1.protect, chatController_1.getPersonalChat);
router.post('/group', authMiddleware_1.protect, chatController_1.createGroup);
router.get('/', authMiddleware_1.protect, chatController_1.userChats);
router.post('/get-members', authMiddleware_1.protect, usersController_1.getMembers);
router.put('/chat_name/:id', authMiddleware_1.protect, chatController_1.updateChatName);
router.put('/icon/:id', authMiddleware_1.protect, chatController_1.updateGroupIcon);
router.put('/members/:id', authMiddleware_1.protect, chatController_1.addMember);
router.put('/members/remove/:id', authMiddleware_1.protect, chatController_1.removeMember);
router.get('/members/is-blocked/:id', authMiddleware_1.protect, chatController_1.isBlocked);
// router.put('/exit/:id', protect, exitChat)
exports.default = router;
