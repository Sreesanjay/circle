import Chat from "../models/chatSchema";
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
                    ]
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
 * @desc request for fetching members profile details
 * @route POST /api/chat/get-members
 * @access private
 */
export const getMembers: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.body.members.length < 1) {
            res.status(400);
            return next(new Error('Members not found'))
        }
        const members = await UserProfile.aggregate([
            {
                $match: {
                    user_id: { $in: req.body.members.map((memberId: string) => new ObjectId(memberId)) }
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: { path: '$user' }
            },
            {
                $project: {
                    username: 1,
                    profile_img: 1,
                    fullname: 1,
                    user_id: 1,
                    verified: 1,
                    email: '$user.email'
                }
            }
        ])
        if (members) {
            res.status(200).json({
                status: 'ok',
                message: 'members details fetched',
                members
            })
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
        console.log("remove member", chat_id)
        const { user } = req.body;
        if (!chat_id || !user) {
            res.status(400);
            return next(new Error('Internal error'));
        }
        const chat = await Chat.findByIdAndUpdate(chat_id, { $addToSet: { removed_members: user }, $pull: { members: user } }, { new: true });
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

