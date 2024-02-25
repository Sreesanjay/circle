import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Community from "../models/communitySchema";

/**
 * @desc function for fetching communities
 * @route GET /api/admin/community-management
 * @access private
 */
export const getCommunities: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const pageSize = 10;
        let sort = {}
        if (req.query.sort === 'RECENTLTY_CREATED') sort = { createdAt: -1 };
        else if (req.query.sort === 'OLDEST_COMMUNITY') sort = { createdAt: 1 };
        else if (req.query.sort === 'REPORTS') sort = { reports: -1 };
        const communityList = await Community.aggregate([
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
                    from: 'members',
                    localField: '_id',
                    foreignField: 'community_id',
                    as: 'members',
                    pipeline: [
                        {
                            $match: {
                                status: 'active'
                            }
                        }
                    ]
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
        if (communityList) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                communityList
            })
        } else {
            next(new Error())
        }
    }
)


/**
* @desc function for undoing deleting post
* @route GET /api/admin/community-management/analytics
* @access private
*/
export const getCommunityAnalytics: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const total_community = await Community.countDocuments();
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const communityToday = await Community.countDocuments({ createdAt: { $gte: today } });

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const communityMonth = await Community.countDocuments({

            createdAt: {
                $gte: firstDayOfMonth
            }
        });

        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const communityYear = await Community.countDocuments({
            createdAt: {
                $gte: firstDayOfYear
            }
        });
        if (total_community && communityToday !== null && communityMonth !== null && communityYear !== null) {
            res.status(200).json({
                status: 'ok',
                message: "details fetched",
                analytics: {
                    total_community,
                    todays_community: communityToday,
                    thismonth_community: communityMonth,
                    this_year_community: communityYear
                }
            })
        } else {
            next(new Error())
        }
    })



/**
 * @desc request for removing community
 * @route PUT /api/community/undo-remove/:id
 * @access private
 */
export const undoRemoveCommunity: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const community_id = req.params.id;
        if (!community_id) {
            res.status(400);
            return next(new Error('Invalid community'))
        }
        const community = await Community.findOneAndUpdate({ _id: community_id }, { $set: { is_delete: false } }, { new: true });
        if (community) {
            res.status(200).json({
                status: 'ok',
                message: 'Community deleted undo successfully',
                community
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

