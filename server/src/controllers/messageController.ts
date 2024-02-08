import { ObjectId } from "mongodb";
import Message from "../models/messageSchema";
import Chat from "../models/chatSchema";
import UserProfile from "../models/userProfile";
import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

/**
 * @desc request for creating new message
 * @route POST /api/message
 * @access private
 */
export const addMessage: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.body.chat_id;
        const chat = await Chat.findById(chat_id);
        if (!chat) {
            res.status(400);
            return next(new Error('Chat not found'))
        }
        if (!req.body.sender_id) req.body.sender_id = req.user?._id
        const message = new Message({ ...req.body });
        const newMessage = await message.save();
        const userProfile = await UserProfile.findOne({ user_id: req.user?._id })
        if (newMessage && userProfile) {
            res.status(201).json({
                status: 'created',
                message: 'new message added',
                newMessage: {
                    userDetails: {
                        username: userProfile.username,
                        email: req.user?._id,
                        fullname: userProfile.fullname,
                        profile_img: userProfile.profile_img
                    },
                    _id: newMessage._id,
                    chat_id: newMessage.chat_id,
                    sender_id: newMessage.sender_id,
                    content: newMessage.content,
                    read_by: newMessage.read_by,
                    reply_to: newMessage.reply_to,
                    is_delete: newMessage.is_delete
                }
            })
        } else {
            next(new Error("Internal server error"))
        }
    })


/**
 * @desc request for getting all the messages in a chat
 * @route POST /api/message/:id
 * @access private
 */
export const getMessages: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.chat_id;
        if (!chat_id) {
            res.status(400);
            return next(new Error('Chat not found'))
        }
        const messages = await Message.aggregate([
            {
                $match: {
                    chat_id: new ObjectId(chat_id)
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'sender_id',
                    foreignField: 'user_id',
                    as: 'userDetails',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
                            }
                        }, {
                            $unwind: { path: '$user' }
                        }, {
                            $project: {
                                _id: 0,
                                email: '$user.email',
                                username: 1,
                                fullname: 1,
                                profile_img: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: { path: '$userDetails' }
            }
        ])
        if (messages) {
            res.status(200).json({
                status: "ok",
                message: 'messages fetched',
                messages
            })
        } else {
            next(new Error("Internal server error"))
        }
    })