import Chat from "../models/chatSchema";
import UserProfile from "../models/userProfile";
import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

/**
 * @desc request for creating new chat
 * @route POST /api/chat
 * @access private
 */
export const createChat: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { user_id } = req.body;
        if (!user_id) {
            res.status(400)
            return next('user not found');
        }
        const exist = await Chat.findOne({ members: { $in: user_id }, is_groupchat: false });
        if (exist) {
            res.status(200).json({
                status: 'ok',
                message: 'chat already exists',
                chat: exist
            })
            return
        }
        const user = await UserProfile.findOne({ user_id: user_id });
        if (!user) {
            return next('Internal server error')
        }
        const newChat = new Chat({
            members: [req.user?._id, user_id]
        })
        const chat = await newChat.save();
        if (chat) {
            res.status(201).json({
                status: 'created',
                message: 'New chat created',
                chat
            })
        }

    })

/**
 * @desc request for fetching all chats of user
 * @route GET /api/chat
 * @access private
 */
export const userChats: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chats = await Chat.find({ members: { $in: req.user?._id } })
        if (chats) {
            res.status(200).json({
                status: 'ok',
                message: 'all chats fetched',
                chats
            })
        } else {
            next(new Error("Internal server error"))
        }
    })