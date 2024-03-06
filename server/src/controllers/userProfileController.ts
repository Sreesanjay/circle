import { Request, RequestHandler, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
import Connection from "../models/connectionSchema";
import Post from "../models/postSchema";
import SavedPost from "../models/savedPost";
import Razorpay from "razorpay";
import env from "../util/validateEnv";
import Plan from "../models/planSchema";
import Verification from "../models/verificationSchema";
import Payment from "../models/paymentSchema";
// import { IConnections } from "../Interfaces";
// import User from "../models/userModel";
// import { IUser } from "../Interfaces";

const instance = new Razorpay({
    key_id: env.RAZORPAY_KEY,
    key_secret: env.RAZORPAY_SECRET,
});

export const getUserProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userProfile = await UserProfile.aggregate([
            {
                $match: {
                    user_id: new ObjectId(req.user?._id)
                }
            }, {
                $lookup: {
                    from: 'verifications',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'verified',
                    pipeline: [
                        {
                            $match: {
                                endingDate: { $gt: new Date() }
                            }
                        }
                    ]
                }
            }, {
                $project: {
                    fullname: 1,
                    gender: 1,
                    bio: 1,
                    username: 1,
                    profile_img: 1,
                    isVerified: { $cond: { if: { $gt: [{ $size: "$verified" }, 0] }, then: true, else: false } },
                    account_type: 1,
                    cover_img: 1,
                    interest: 1
                }
            }
        ])

        res.status(200).json({
            status: 'OK',
            message: "User profile details fetched",
            userProfile: userProfile[0]
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
                $lookup: {
                    from: "boostedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_boosted",
                    pipeline: [
                        {
                            $match: {
                                endingDate: { $gt: new Date() }
                            }
                        },
                        {
                            $project: {
                                post_id: 0,
                            }
                        }
                    ]
                }
            },
            { $unwind: { path: "$is_boosted", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    user_id: 1,
                    is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                    is_boosted: 1,
                    user_details: 1,
                    type: 1,
                    clicks: 1,
                    content: 1,
                    caption: 1,
                    tags: 1,
                    visibility: 1,
                    impressions: 1,
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
 * @desc function for fetching all posts of a user
 * @route GET /api/profile/get-posts/:id
 * @access private
 */
export const getUserPosts: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const posts = await Post.aggregate([
            {
                $match: {
                    user_id: new ObjectId(req.params.id),
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


/**
 * @desc function for fetching saved posts
 * @route GET /api/profile/saved-posts
 * @access private
 */
export const createPaymentRequest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { plan_id } = req.body;
        const plan = await Plan.findById(plan_id);
        if (!plan || !plan.is_active) {
            res.status(400);
            return next(new Error('Plan not found'));
        }
        const options = {
            amount: plan.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "subscription"
        };
        instance.orders.create(options, function (err, order) {
            res.status(201).json({
                status: 'created',
                message: 'payment created',
                order
            })
        });
    }
)

/**
 * @desc function for fetching saved posts
 * @route GET /api/profile/add-verification
 * @access private
 */
export const addVerification: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { plan_id, amount, document, document_type, payment } = req.body;
        const plan = await Plan.findById(plan_id);
        if (!plan || !plan.is_active) {
            res.status(400);
            return next(new Error('Plan not found'));
        }
        // user_id: ObjectId;
        // startingDate: Date,
        // endingDate: Date,
        // plan_id: ObjectId,
        // document: string;
        // document_type: string;
        // payment_details: ObjectId

        const newPayment = await new Payment({
            payment_id: payment.razorpay_payment_id,
            order_id: payment.razorpay_order_id,
            user_id: req.user?._id,
            amount: amount
        }).save();
        if (!newPayment) {
            res.status(500);
            next(new Error('Payment Process failed'));
            return;
        }

        const currentDate = new Date();
        const endingDate = new Date(currentDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // Adding totalDay days

        const verification = await new Verification({
            user_id: req.user?._id,
            plan_id: plan._id,
            startingDate: new Date(),
            endingDate: endingDate,
            document: document,
            document_type: document_type,
            payment_details: newPayment._id
        }).save()

        if (verification) {
            res.status(200).json({
                status: 'ok',
                message: 'verification added'
            })
        }

    }
)


