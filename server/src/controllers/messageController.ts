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
        const message = new Message({ ...req.body, delivered_to: chat.members });
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
                    content_type: newMessage.content_type,
                    file_type: newMessage.file_type,
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
        const page = (req.query.page && typeof req.query.page === 'string') ? req.query.page : null;
        const query = page ? {
            chat_id: new ObjectId(chat_id),
            createdAt: { $lt: new Date(page) },
            delivered_to: {
                $elemMatch: {
                    $eq: new ObjectId(req.user?._id)
                }
            }
        } : {
            chat_id: new ObjectId(chat_id),
            delivered_to: {
                $elemMatch: {
                    $eq: new ObjectId(req.user?._id)
                }
            }
        }

        const messages = await Message.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $match: query
            },
            {
                $limit: 10
            },
            {
                $sort: { createdAt: 1 }
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




/**
 * @desc request for getting all the messages in a chat
 * @route PUT /api/message/read/:id
 * @access private
 */
export const readMessage: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const message_id = req.params.id;
        if (!message_id) {
            res.status(400);
            return next(new Error('message_id not found'))
        }
        const messages = await Message.findByIdAndUpdate(message_id, { $addToSet: { read_by: req.user?._id } }, { new: true })
        if (messages) {
            res.status(200).json({
                status: "ok",
                message: 'message read added',
                messages
            })
        } else {
            next(new Error("Internal server error"))
        }
    })

/**
 * @desc request for deleting message
 * @route DELETE /api/message/:id
 * @access private
 */
export const deleteMessage: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const message_id = req.params.id;
        if (!message_id) {
            res.status(400);
            return next(new Error('message not found'))
        }
        const messages = await Message.findByIdAndUpdate(message_id, { $set: { is_delete: true } }, { new: true })
        if (messages) {
            res.status(200).json({
                status: "ok",
                message: 'message deleted successfully',
                messages
            })
        } else {
            next(new Error("Internal server error"))
        }
    })


