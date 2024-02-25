import Chat from "../models/chatSchema";
// import User from "../models/userModel";
// import { ObjectId } from "mongodb";
// import UserProfile from "../models/userProfile";
import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";


/**
 * @desc request for creating new chat
 * @route POST /api/chat
 * @access private
 */
export const getAllChats: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const pageSize = 10;
        let sort = {}
        if (req.query.sort === 'RECENTLTY_CREATED') sort = { createdAt: -1 };
        else if (req.query.sort === 'OLDEST_CHAT') sort = { createdAt: 1 };
        else if (req.query.sort === 'REPORTS') sort = { reports: -1 };
        const groups = await Chat.aggregate([
            {
                $lookup: {
                    from: 'reports',
                    localField: '_id',
                    foreignField: 'reported_id',
                    as: 'reports'
                }
            },
            {
                $sort: sort
            },
            {
                $skip: (page - 1) * pageSize
            },
            {
                $limit: pageSize
            },

        ])
        if (groups) {
            res.status(200).json({
                status: 'ok',
                message: 'details fetched',
                groups
            })
        } else {
            next(new Error('Internal Error'))
        }
    })


/**
* @desc function for undoing deleting post
* @route GET /api/admin/chat-management/analytics
* @access private
*/
export const getChatAnalytics: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const total_chat = await Chat.countDocuments();
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const chatToday = await Chat.countDocuments({ createdAt: { $gte: today } });

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const chatMonth = await Chat.countDocuments({

            createdAt: {
                $gte: firstDayOfMonth
            }
        });

        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const chatYear = await Chat.countDocuments({
            createdAt: {
                $gte: firstDayOfYear
            }
        });
        if (total_chat && chatToday !== null && chatMonth !== null && chatYear !== null) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                analytics: {
                    total_chat,
                    todays_chat: chatToday,
                    thismonth_chat: chatMonth,
                    this_year_chat: chatYear
                }
            })
        } else {
            next(new Error())
        }
    })



/**
 * @desc request for removing community
 * @route PUT /api/chat-management/undo-remove/:id
 * @access private
 */
export const removechat: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.id;
        if (!chat_id) {
            res.status(400);
            return next(new Error('Invalid community'))
        }
        const chat = await Chat.findOneAndUpdate({ _id: chat_id }, { $set: { is_delete: true } }, { new: true });
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'chat deleted undo successfully',
                chat
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)




/**
 * @desc request for removing community
 * @route PUT /api/chat-management/undo-remove/:id
 * @access private
 */
export const undoRemovechat: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const chat_id = req.params.id;
        if (!chat_id) {
            res.status(400);
            return next(new Error('Invalid community'))
        }
        const chat = await Chat.findOneAndUpdate({ _id: chat_id }, { $set: { is_delete: false } }, { new: true });
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'chat deleted undo successfully',
                chat
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

