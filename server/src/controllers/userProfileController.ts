import { Request, RequestHandler, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
import Connection from "../models/connectionSchema";
import Post from "../models/postSchema";
import SavedPost from "../models/savedPost";
// import { IConnections } from "../Interfaces";
// import User from "../models/userModel";
// import { IUser } from "../Interfaces";

export const getUserProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userProfile = await UserProfile.findOne({ user_id: req.user?._id }, { reports: 0 })
        res.status(200).json({
            status: 'OK',
            message: "User profile details fetched",
            userProfile
        });
    }
)

/**
 * @desc function for updating user cover image.
 * @route POST /api/profile/update-cover-img
 * @access private
 */
export const updateCoverImg: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userProfile = await UserProfile.findOneAndUpdate({ user_id: req.user?._id }, { $set: { cover_img: req.body.url } }, { new: true });
        if (userProfile) {
            res.status(200).json({
                status: 'OK',
                message: "User cover image updated",
                userProfile
            });
        } else {
            next(new Error('Internal Error'))
        }
    }
)

/**
 * @desc function for deleting user cover image.
 * @route POST /api/profile/delete-cover-img
 * @access private
 */
export const deleteCoverImg: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userProfile = await UserProfile.findOneAndUpdate({ user_id: req.user?._id }, { $unset: { cover_img: 1 } }, { new: true })
        if (userProfile) {
            res.status(200).json({
                status: 'OK',
                message: "User cover image deleted",
                userProfile
            });
        } else {
            next(new Error('Internal Error'))
        }
    }
)

/**
 * @desc function for update user profile image.
 * @route POST /api/profile/update-profile_img
 * @access private
 */
export const updateProfileImg: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userProfile = await UserProfile.findOneAndUpdate({ user_id: req.user?._id }, { $set: { profile_img: req.body.url } }, { new: true })
        if (userProfile) {
            res.status(200).json({
                status: 'OK',
                message: "Profile image updated successfully",
                userProfile
            });
        } else {
            next(new Error('Internal Error'))
        }
    }
)

/**
 * @desc function for deleting user profile image.
 * @route PUT /api/profile/delete-profile_img
 * @access private
 */
export const deleteProfileImg: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userProfile = await UserProfile.findOneAndUpdate({ user_id: req.user?._id }, { $unset: { profile_img: 1 } }, { new: true })
        if (userProfile) {
            res.status(200).json({
                status: 'OK',
                message: "User profile image deleted",
                userProfile
            });
        } else {
            next(new Error('Internal Error'))
        }
    }
)



/**
 * @desc function for deleting user profile image.
 * @route POST /api/profile/update-cover-img
 * @access private
 */
export const updateProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.body?.username) {
            res.status(400);
            return next(Error("Username is required"))
        }
        const existingUser = await UserProfile.findOne({ username: req.body.username, user_id: { $ne: req.user?._id } })
        if (existingUser) {
            res.status(409)
            return next(Error("Username already exists"))
        }
        const userProfile = await UserProfile.findOneAndUpdate({ user_id: req.user?._id }, { $set: req.body }, { new: true })
        res.status(200).json({
            status: "ok",
            message: "User profile updated successfully",
            userProfile
        })
    }
)

/**
 * @desc function for fetching followers count and following count.
 * @route POST /api/profile/connection-count
 * @access private
 */
export const getConnectionCount: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const followers = await Connection.countDocuments({
            following: new ObjectId(req.user?._id),
        })
        const following = await Connection.findOne({
            user_id: req.user?._id
        })

        if (following && followers !== null) {
            res.status(200).json({
                message: "connection counts fetched",
                connectionCount: { followers, following: following.following.length }
            })
        } else {
            next(Error())
        }
    }
)

/**
 * @desc function for fetching my posts
 * @route GET /api/profile/posts
 * @access private
 */
export const getMyPosts: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const posts = await Post.aggregate([
            {
                $match: {
                    user_id: new ObjectId(req.user?._id),
                    is_archive: false,
                    is_delete: false
                }
            },
            {
                $lookup: {
                    from: "savedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_saved",
                    pipeline: [
                        {
                            $match: {
                                user_id: req.user?._id
                            }
                        },
                        {
                            $project: {
                                user_id: 0,
                                post_id: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    user_id: 1,
                    is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                    user_details: 1,
                    type: 1,
                    content: 1,
                    caption: 1,
                    tags: 1,
                    visibility: 1,
                    impressions: 1,
                    profile_visit: 1,
                    createdAt: 1,
                    likes: 1
                }
            }
        ])

        if (posts) {
            res.status(200).json({
                status: 'ok',
                message: 'posts fetched',
                posts
            })
        } else {
            next(new Error('Internal server error'))
        }
    }
)



/**
 * @desc function for fetching saved posts
 * @route GET /api/profile/saved-posts
 * @access private
 */
export const getSavedPosts: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const saved = await SavedPost.find({ user_id: req.user?._id }, { post_id: 1, _id: 0 });
        const savedPostIds = saved.map(item => item.post_id);
        const posts = await Post.aggregate([
            {
                $match: {
                    _id: { $in: savedPostIds },
                    is_archive: false,
                    is_delete: false
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: "user_details",
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: "$user_details"
                }
            }
        ])

        if (posts) {
            console.log(posts)
            res.status(200).json({
                status: 'ok',
                message: 'saved posts fetched',
                posts
            })
        } else {
            next(new Error('Internal server error'))
        }
    }
)

