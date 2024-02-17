import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Community from "../models/communitySchema";
import Members from "../models/membersSchema";
import Interest from "../models/interestSchema";
import UserProfile from "../models/userProfile";

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
            await new Members({
                community_id: community._id,
                user_id: req.user?._id,
                is_admin: true
            }).save()

            res.status(201).json({
                status: 'created',
                message: 'Community created successfully',
                community
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
 * @desc function fetching all interest matched community
 * @route GET /api/community
 * @access private
 */
export const getCommunities: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const interest = await UserProfile.findOne({ user_id: req.user?._id }, { _id: 0, interest: 1 });
        const community = await Community.aggregate([
            {
                $match: {
                    topic: { $in: interest?.interest },
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
            res.status(409);
            return next(new Error("You are already a member"))
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
        const member = await Members.find({ user_id: req.user?._id }, { _id: 0, community_id: 1 });
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


