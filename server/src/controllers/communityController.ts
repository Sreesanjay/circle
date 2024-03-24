import { Request, RequestHandler, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import Community from "../models/communitySchema";
import Members from "../models/membersSchema";
import Discussion from "../models/discussionSchema";
import Notification from "../models/notificationSchema";
// import Interest from "../models/interestSchema";
// import UserProfile from "../models/userProfile";

/**
 * @desc function creating new community
 * @route POST /api/community
 * @access private
 */
export const createCommunity: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.body) {
            res.status(400);
            return next(new Error('Invalid credentials'))
        }
        const exist = await Community.findOne({ community_name: req.body.community_name });
        if (exist) {
            res.status(409);
            return next(new Error('Community name already exist'))
        }
        const newCommunity = new Community(req.body);
        const community = await newCommunity.save();
        if (community) {
            const members = await new Members({
                community_id: community._id,
                user_id: req.user?._id,
                is_admin: true
            }).save()

            res.status(201).json({
                status: 'created',
                message: 'Community created successfully',
                community,
                members
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc function creating new community
 * @route PUT /api/community/:id
 * @access private
 */
export const updateCommunity: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const community_id = req.params.id;
        if (!community_id) {
            res.status(400);
            return next(new Error('Community not found'))
        }
        const community = await Community.findOneAndUpdate({ _id: community_id }, { $set: req.body }, { new: true });
        if (community) {
            res.status(201).json({
                status: 'created',
                message: 'Community updated successfully',
                community
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc request for updating community
 * @route PUT /api/community/:id
 * @access private
 */
export const updateIcon: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const community_id = req.params.id;
        if (!community_id || !req.body.icon) {
            res.status(400);
            return next(new Error('Invalid credentials'))
        }
        const community = await Community.findOneAndUpdate({ _id: community_id }, { $set: { icon: req.body.icon } }, { new: true });
        if (community) {
            res.status(200).json({
                status: 'ok',
                message: 'Community updated successfully',
                community
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc request for removing community
 * @route PUT /api/community/remove/:id
 * @access private
 */
export const removeCommunity: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const community_id = req.params.id;
        if (!community_id) {
            res.status(400);
            return next(new Error('Invalid community'))
        }
        const community = await Community.findOneAndUpdate({ _id: community_id }, { $set: { is_delete: true } }, { new: true });
        if (community) {
            res.status(200).json({
                status: 'ok',
                message: 'Community deleted successfully',
                community
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc function fetching all interest matched community
 * @route GET /api/community
 * @access private
 */
export const getCommunities: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // const interest = await UserProfile.findOne({ user_id: req.user?._id }, { _id: 0, interest: 1 });
        const community = await Community.aggregate([
            {
                $match: {
                    is_delete: false
                }
            }, {
                $lookup: {
                    from: 'members',
                    localField: '_id',
                    foreignField: 'community_id',
                    as: 'members',
                    // pipeline: [
                    //     {
                    //         $match: {
                    //             status: { $ne: 'removed' },
                    //         }
                    //     }
                    // ]

                }
            }

        ])
        if (community) {
            res.status(200).json({
                status: 'ok',
                message: 'Community fetched successfully',
                community
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)


/**
 * @desc request for joining community
 * @route POST /api/community/join
 * @access private
 */
export const joinCommunity: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { community_id } = req.body;
        const community = await Community.findById(community_id);
        if (!community) {
            res.status(400);
            return next(new Error("Couldn't find community"));
        }
        const exist = await Members.findOne({ community_id: community_id, user_id: req.user?._id });
        if (exist) {
            if (exist.status !== 'removed') {
                res.status(409);
                return next(new Error("You are already a member"))
            } else {
                const newMember = await Members.findOneAndUpdate({ community_id: community_id, user_id: req.user?._id }, { $set: { status: 'pending' } }, { new: true });
                if (newMember) {
                    res.status(200).json({
                        status: 'ok',
                        message: 'request added',
                        newMember
                    })
                    return;
                }
            }
        }
        const newMember = await new Members({
            community_id,
            user_id: req.user?._id,
            status: community.privacy === 'private' ? 'pending' : 'active'
        }).save()
        if (newMember) {
            res.status(200).json({
                status: 'ok',
                message: 'added new member',
                newMember
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc request fetching my communities
 * @route GET /api/community/my-communities
 * @access private
 */
export const getMyCommunities: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const member = await Members.find({ user_id: req.user?._id, status: 'active' }, { _id: 0, community_id: 1 });
        const memberIds = member.map(item => item.community_id);
        const community = await Community.aggregate([
            {
                $match: {
                    _id: { $in: memberIds },
                    is_delete: false
                }
            }, {
                $lookup: {
                    from: 'members',
                    localField: '_id',
                    foreignField: 'community_id',
                    as: 'members'

                }
            }

        ])
        if (community) {
            res.status(200).json({
                status: 'ok',
                message: 'fetched your communities',
                community
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc request fetching community
 * @route GET /api/community/get-details/:id
 * @access private
 */
export const getCommunity: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            return next(new Error('Community not found'))
        }
        const community = await Community.aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                    is_delete: false
                }
            }, {
                $lookup: {
                    from: 'members',
                    localField: '_id',
                    foreignField: 'community_id',
                    as: 'members',
                    pipeline: [
                        {
                            $match: {
                                status: { $ne: 'removed' }
                            }
                        }
                    ]
                }
            }

        ])
        if (community) {
            res.status(200).json({
                status: 'ok',
                message: 'fetched community details',
                community: community[0]
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)

/**
 * @desc request fetching my communities
 * @route GET /api/community/pending-request/:id
 * @access private
 */
export const pendingRequest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            return next(new Error('Community not found'))
        }

        const userList = await Members.aggregate([
            {
                $match: {
                    community_id: new ObjectId(id),
                    status: 'pending'
                }
            },
            {
                $lookup: {
                    from: "userprofiles",
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userProfile',
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
                            }
                        },
                        {
                            $unwind: {
                                path: '$user'
                            }
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
                    ]
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
                }
            }
        ])
        if (userList) {
            res.status(200).json({
                status: 'ok',
                message: 'pending requests fetched',
                userList
            })
        } else {
            next(new Error("Internal server error"))
        }
    }
)


/**
 * @desc request fetching my communities
 * @route GET /api/community/pending-request/:id
 * @access private
 */
export const acceptRequest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { community_id, user_id } = req.body;
        const member = await Members.findOneAndUpdate({ community_id: community_id, user_id: user_id }, { $set: { status: 'active' } }, { new: true })
        if (member) {
            const community = await Community.findOne({ _id: community_id });
            if (community) {
                const newMessage = new Notification({
                    user_id: user_id,
                    sender_id: req.user?._id,
                    message: `Accepted your request to join ${community.community_name}`
                })
                newMessage.save()
            }
            res.status(200).json({
                status: 'ok',
                message: 'accept user request',
                member
            })

        } else {
            next(new Error("Internal server error"))
        }
    }
)



/**
 * @desc rquest for removing a member
 * @route POST /api/community/remove-member
 * @access private
 */
export const removeMember: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { community_id, user_id } = req.body;
        const exist = await Members.findOne({ community_id, user_id });
        if (!exist) {
            res.status(400);
            return next(new Error('Invalid Member'))
        }
        if (exist.is_admin) {
            const secondlastmember = await Members.find({ community_id, user_id: { $ne: user_id } }).sort({ createdAt: 1 })
            if (secondlastmember[0]) {
                await Members.findOneAndUpdate({ community_id, user_id: secondlastmember[0].user_id }, { $set: { is_admin: true } })
            }

        }
        const member = await Members.findOneAndUpdate({ community_id, user_id }, { $set: { status: 'removed', is_admin: false } }, { new: true });
        if (member) {
            res.status(200).json({
                status: 'ok',
                message: 'member removed',
                member
            })
        } else {
            next(new Error('Internal server error'))
        }
    }
)

/**
 * @desc rquest for fetching analytics
 * @route POST /api/community/analytics
 * @access private
 */
export const getAnalytics: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const exist = await Community.findOne({ _id: id });
        if (!exist) {
            res.status(400);
            return next(new Error('Invalid Community'))
        }
        const total_members = await Members.countDocuments({ community_id: id, status: 'active' });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const discussions_today = await Discussion.countDocuments({ community_id: id, createdAt: { $gte: today }, is_delete: false });
        const total_discussion = await Discussion.countDocuments({ community_id: id, is_delete: false });

        if (total_members || discussions_today || total_discussion) {
            res.status(200).json({
                status: 'ok',
                message: 'analytics fetched',
                analytics: {
                    total_members,
                    discussions_today,
                    total_discussion
                }
            })
        } else {
            next(new Error('Internal server error'))
        }
    }
)