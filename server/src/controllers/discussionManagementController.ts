import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Discussion from "../models/discussionSchema";

/**
 * @desc function for fetching all discussions
 * @route GET /api/admin/discussion-management
 * @access private
 */
export const getDiscussion: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const pageSize = 10;
        let sort = {}
        if (req.query.sort === 'RECENTLTY_CREATED') sort = { createdAt: -1 };
        else if (req.query.sort === 'OLDEST_Discussions') sort = { createdAt: 1 };
        else if (req.query.sort === 'REPORTS') sort = { reports: -1 };
        const discussionList = await Discussion.aggregate([
            {
                $lookup: {
                    from: 'reports',
                    localField: '_id',
                    foreignField: 'reported_id',
                    as: 'reports'
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userProfile',
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
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
        if (discussionList) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                discussionList
            })
        } else {
            next(new Error())
        }
    }
)


/**
* @desc function for undoing deleting post
* @route GET /api/admin/discussion-management/analytics
* @access private
*/
export const  getDiscussionAnalytics: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const total_discussion = await Discussion.countDocuments();
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const discussionToday = await Discussion.countDocuments({ createdAt: { $gte: today } });

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const discussionMonth = await Discussion.countDocuments({

            createdAt: {
                $gte: firstDayOfMonth
            }
        });

        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const discussionYear = await Discussion.countDocuments({
            createdAt: {
                $gte: firstDayOfYear
            }
        });
        if (total_discussion && discussionToday !== null && discussionMonth !== null && discussionYear !== null) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                analytics: {
                    total_discussion,
                    todays_discussion: discussionToday,
                    thismonth_discussion: discussionMonth,
                    this_year_discussion: discussionYear
                }
            })
        } else {
            next(new Error())
        }
    })



/**
 * @desc request for removing community
 * @route PUT /api/discussion-management/undo-remove/:id
 * @access private
 */
export const undoRemoveDiscussion: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const discussion_id = req.params.id;
        if (!discussion_id) {
            res.status(400);
            return next(new Error('Invalid community'))
        }
        const discussion = await Discussion.findOneAndUpdate({ _id: discussion_id }, { $set: { is_delete: false } }, { new: true });
        if (discussion) {
            res.status(200).json({
                status: 'ok',
                message: 'discussion deleted undo successfully',
                discussion
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

