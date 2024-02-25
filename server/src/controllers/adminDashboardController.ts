import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import Post from "../models/postSchema";
import Community from "../models/communitySchema";
import Discussion from "../models/discussionSchema";
import User from "../models/userModel";


/**
 * @desc request for getting details such as total users total posts total community total discussions
 * @route GET /api/admin/dashboard/analytics
 * @access private
 */
export const getDashboardAnalytics: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const total_users = await User.countDocuments();
    const total_posts = await Post.countDocuments();
    const total_community = await Community.countDocuments();
    const total_discussions = await Discussion.countDocuments();
    res.status(200).json({
        status: 'ok',
        message: 'details fetched',
        analytics: {
            total_users,
            total_posts,
            total_community,
            total_discussions
        }
    })
})


/**
 * @desc request for getting user report in a year
 * @route GET /api/admin/dashboard/user-report/:year
 * @access private
 */
export const getUserReport: RequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const year = req.params.year;
    if (!year) {
        res.status(400);
        return next(new Error("year is not specified"));
    }
    const userList = await User.aggregate([
        {
            $match: {
                role: 'USER',
                $expr: {
                    $eq: [
                        {
                            $year: "$createdAt"
                        },
                        Number(year)
                    ]
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
            }
        }
    ])
    
    const userCount: { [month: string]: number } = {};
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthNames.forEach(month => {
        userCount[month] = 0;
    });

    // Update counts for existing months
    userList.forEach((result: { _id: number, count: number }) => {
        const monthName = new Date(Number(year), result._id - 1).toLocaleString('default', { month: 'long' });
        userCount[monthName] = result.count;
    });

    if (userCount) {
        res.status(200).json({
            status: 'ok',
            message: 'user report fetched',
            userCount
        })
    }

})
