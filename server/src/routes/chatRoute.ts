import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createChat, userChats, createGroup, getMembers, updateChatName, updateGroupIcon, addMember, removeMember } from "../controllers/chatController";
const router: Router = Router();

router.post('/', protect, createChat);
router.post('/group', protect, createGroup);
router.get('/', protect, userChats);
router.post('/get-members', protect, getMembers)
router.put('/chat_name/:id', protect, updateChatName);
router.put('/icon/:id', protect, updateGroupIcon);
router.put('/members/:id', protect, addMember);
router.put('/members/remove/:id', protect, removeMember)
// router.put('/exit/:id', protect, exitChat)



export default router