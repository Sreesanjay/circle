import Chat from "../models/chatSchema";
import User from "../models/userModel";
import { ObjectId } from "mongodb";
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
        const exist = await Chat.findOne({ members: { $all: [user_id, req.user?._id] }, is_groupchat: false });
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
 * @desc request for creating new group
 * @route POST /api/chat/group
 * @access private
 */
export const createGroup: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.body.members.length < 1) {
            res.status(400);
            return next(new Error('Minimum two members required'))
        }
        const newChat = new Chat({
            members: [...req.body.members, req.user?._id],
            chat_name: req.body.chat_name,
            is_groupchat: true,
            admins: [req.user?._id]
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
        const chats = await Chat.aggregate([

            {
                $match: {
                    $or: [
                        {
                            members: {
                                $elemMatch: {
                                    $eq: new ObjectId(req.user?._id)
                                }
                            }
                        },
                        {
                            removed_members: {
                                $elemMatch: {
                                    $eq: new ObjectId(req.user?._id)
                                }
                            }
                        }
                    ],
                    is_delete: false
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: '_id',
                    foreignField: 'chat_id',
                    as: 'latest_message',
                    pipeline: [
                        {
                            $match: {
                                delivered_to: {
                                    $elemMatch: {
                                        $eq: new ObjectId(req.user?._id)
                                    }
                                }
                            }
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                    ]
                }
            },
            {
                $addFields: {
                    latest_message: { $arrayElemAt: ["$latest_message", 0] }
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'latest_message.sender_id',
                    foreignField: 'user_id',
                    as: 'latest_message.userDetails',
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                fullname: 1,
                                user_id: 1,
                                verified: 1,
                                _id: 0
                            }
                        }
                    ],
                }
            },
            {
                $unwind: { path: '$latest_message.userDetails', preserveNullAndEmptyArrays: true }
            },
        ])

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

/**
 * @desc request for fetching all chats of user
 * @route GET /api/chat/get-chat
 * @access private
 */
export const getPersonalChat: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user_id = req.params.id;
        const chats = await Chat.aggregate([

            {
                $match: {
                    members: {
                        $all: [new ObjectId(user_id), new ObjectId(req.user?._id)]
                    },
                    is_groupchat: false,
                    is_delete: false
                },
            },
            {
                $lookup: {
                    from: "messages",
                    localField: '_id',
                    foreignField: 'chat_id',
                    as: 'latest_message',
                    pipeline: [
                        {
                            $match: {
                                delivered_to: {
                                    $elemMatch: {
                                        $eq: new ObjectId(req.user?._id)
                                    }
                                }
                            }
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                    ]
                }
            },
            {
                $addFields: {
                    latest_message: { $arrayElemAt: ["$latest_message", 0] }
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'latest_message.sender_id',
                    foreignField: 'user_id',
                    as: 'latest_message.userDetails',
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                fullname: 1,
                                user_id: 1,
                                verified: 1,
                                _id: 0
                            }
                        }
                    ],
                }
            },
            {
                $unwind: { path: '$latest_message.userDetails', preserveNullAndEmptyArrays: true }
            },
        ])
        if (chats.length) {
            res.status(200).json({
                status: 'ok',
                message: 'all chats fetched',
                chat: chats[0]
            })
            return
        }
        else {
            const newChat = new Chat({
                members: [req.user?._id, user_id]
            })
            const chat = await newChat.save();
            if (chat) {
                res.status(200).json({
                    status: 'ok',
                    message: 'all chats fetched',
                    chat
                })
            } else {
                next(new Error('chat creation failed'))
            }
        }
    })




/**
 * @desc request for updating chat name (group admin)
 * @route PUT /api/chat/chat_name/:id
 * @access private
 */
export const updateChatName: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.id;
        if (!chat_id) {
            res.status(400);
            return next(new Error('chat not found'));
        }
        const chat = await Chat.findByIdAndUpdate(chat_id, { $set: { chat_name: req.body.chat_name } }, { new: true });
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'Chat updated successfully',
                chat
            })
        } else {
            next(new Error('Internal Error'))
        }
    })


/**
 * @desc request for updating group icon
 * @route PUT /api/chat/iocn/:id
 * @access private
 */
export const updateGroupIcon: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.id;
        if (!chat_id) {
            res.status(400);
            return next(new Error('chat not found'));
        }
        const chat = await Chat.findByIdAndUpdate(chat_id, { $set: { icon: req.body.icon } }, { new: true });
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'Chat updated successfully',
                chat
            })
        } else {
            next(new Error('Internal Error'))
        }
    })

/**
 * @desc request for adding a new member (group admin) 
 * @route PUT /api/chat/members/:id
 * @access private
 */
export const addMember: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.id;
        const { user } = req.body;
        if (!chat_id || !user) {
            res.status(400);
            return next(new Error('Internal error'));
        }
        const chat = await Chat.findByIdAndUpdate(chat_id, { $addToSet: { members: user }, $pull: { removed_members: user } }, { new: true });
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'Chat updated successfully',
                chat
            })
        } else {
            next(new Error('Internal Error'))
        }
    })

/**
 * @desc request for removing a member (group admin)
 * @route PUT /api/chat/members/remove/:id
 * @access private
 */
export const removeMember: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.id;
        const { user } = req.body;
        if (!chat_id || !user) {
            res.status(400);
            return next(new Error('Internal error'));
        }
        const existChat = await Chat.findById(chat_id);
        if (existChat && existChat.admins.includes(user) && existChat.admins.length === 1 && existChat.members.length > 1) {
            await Chat.findByIdAndUpdate(chat_id, { $push: { admins: existChat.members[1] } })
        }
        const chat = await Chat.findByIdAndUpdate(chat_id, { $addToSet: { removed_members: user }, $pull: { members: user, admins: user } }, { new: true });
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'Chat updated successfully',
                chat
            })
        } else {
            next(new Error('Internal Error'))
        }
    })

/**
 * @desc request for checking whether the user is blocked or not
 * @route GET /api/chat/members/is-blocked/:id
 * @access private
 */
export const isBlocked: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user = req.params.id;
        if (!user) {
            res.status(400);
            return next(new Error('Invalid user'));
        }
        const youBlocked = await User.findOne({ _id: req.user?._id, blocked_users: { $elemMatch: { $eq: user } } })
        const theyBlocked = await User.findOne({ _id: user, blocked_users: { $elemMatch: { $eq: req.user?._id } } })
        if (youBlocked) {
            res.status(200).json({
                status: 'ok',
                message: 'is Blocked fetched',
                blocked: 'You blocked this user'
            })
        } else if (theyBlocked) {
            res.status(200).json({
                status: 'ok',
                message: 'is Blocked fetched',
                blocked: 'You were blocked by this user'
            })
        } else {
            res.status(200).json({
                status: 'ok',
                message: 'is Blocked fetched'
            })
        }

    })

