import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
// import UserProfile from "../models/userProfile";
import User from "../models/userModel";
// import { ObjectId } from 'mongodb';
// import Report from "../models/reportSchema";


/**
 * @desc function for fetching friend suggestions
 * @route GET /api/admin/user-management/userlist
 * @access private
 */
export const getUserManagement: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const pageSize = 10;
        let sort = {}
        if (req.query.sort === 'RECENTLTY_JOINED') sort = { createdAt: -1 };
        else if (req.query.sort === 'OLDEST_MEMBERS') sort = { createdAt: 1 };
        else if (req.query.sort === 'REPORTS') sort = { reports: -1 };
        else if (req.query.sort === 'USERNAME') sort = { "profile.username": 1 }
        const users = await User.aggregate([
            {
                $match: { role: 'USER' }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'profile'
                }
            },
            {
                $unwind: {
                    path: '$profile'
                }
            },
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
                $project: {
                    username: "$profile.username",
                    fullname: "$profile.fullname",
                    profile_img: "$profile.profile_img",
                    email: 1,
                    is_blocked: 1,
                    reports: 1,
                }
            },
            {
                $skip: (page - 1) * pageSize
            },
            {
                $limit: pageSize
            },
        ])
        if (users) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                userList: users
            })
        } else {
            next(new Error())
        }
    })

/**
 * @desc function for fetching analytics for user management
 * @route GET /api/admin/user-management/analytics
 * @access private
 */
export const getUserAnalytics: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const total_users = await User.countDocuments({ role: 'USER' });
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const usersToday = await User.countDocuments({ role: 'USER', createdAt: { $gte: today } });

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const usersMonth = await User.countDocuments({
            role: 'USER',
            createdAt: {
                $gte: firstDayOfMonth
            }
        });

        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const usersYear = await User.countDocuments({
            role: 'USER',
            createdAt: {
                $gte: firstDayOfYear,
                $lt: today
            }
        });
        if (total_users && usersMonth !== null && usersToday !== null && usersYear !== null) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                analytics: {
                    total_users,
                    todays_users: usersToday,
                    thismonth_users: usersMonth,
                    this_year_users: usersYear
                }
            })
        } else {
            next(new Error())
        }
    })

/**
 * @desc function for blocking user
 * @route GET /api/admin/user-management/block/:id
 * @access private
 */
export const blockUser: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const user = await User.findOneAndUpdate({ _id: id }, { $set: { is_blocked: true } }, { new: true })
        if (user) {
            res.status(200).json({
                status: 'ok',
                message: 'account blocked'
            })
        } else {
            next(new Error())
        }
    })

/**
 * @desc function for unblocking user
 * @route GET /api/admin/user-management/unblock/:id
 * @access private
 */
export const unblockuser: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const user = await User.findOneAndUpdate({ _id: id }, { $set: { is_blocked: false } }, { new: true })
        if (user) {
            res.status(200).json({
                status: 'ok',
                message: 'account blocked'
            })
        } else {
            next(new Error())
        }
    })