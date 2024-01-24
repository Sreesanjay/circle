import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
import Connection from "../models/connectionSchema";
import { ObjectId } from 'mongodb'

/**
 * @desc function for fetching friend suggestions
 * @route GET /api/users
 * @access private
 */
export const getUserList: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const userProfile = await UserProfile.findOne({ user_id: req.user?._id });
        if (!userProfile) {
            return next(Error("Internal error"));
        }
        if (userProfile) {
            const connection = await Connection.findOne({ user_id: req.user?._id });
            const interests = userProfile.interest;
            const suggestion = await UserProfile.aggregate([
                { $match: { interest: { $in: interests }, user_id: { $ne: req.user?._id } } },
                {
                    $lookup: {
                        from: "connections",
                        localField: "user_id",
                        foreignField: "user_id",
                        as: "connection"
                    }
                },
                {
                    $match: {
                        user_id: { $not: { $in: connection && connection?.following } }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: {
                        path: '$user'
                    }
                },
                {
                    $project: {
                        user_id: 1,
                        username: 1,
                        profile_img: 1,
                        verified: 1,
                        email: '$user.email'
                    }
                },
                { $sample: { size: 10 } },
                {
                    $addFields: {
                        "followed": false
                    }
                }
            ])
            const userList = await UserProfile.aggregate([
                { $match: { user_id: { $ne: req.user?._id } } },
                {
                    $lookup: {
                        from: "connections",
                        localField: "user_id",
                        foreignField: "user_id",
                        as: "connection"
                    }
                },
                {
                    $match: {
                        user_id: { $not: { $in: connection && connection?.following } }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: {
                        path: '$user'
                    }
                },
                {
                    $project: {
                        user_id: 1,
                        username: 1,
                        profile_img: 1,
                        verified: 1,
                        email: '$user.email'
                    }
                },
                { $sample: { size: 20 } },
                {
                    $addFields: {
                        "followed": false
                    }
                }
            ])
            res.status(200).json({
                status: "ok",
                message: "user list fetched",
                suggestion,
                userList
            })
        } else {
            next(new Error('Internal Error'))
        }
    }
)

/**
 * @desc function for adding friend
 * @route POST /api/users
 * @access private
 */
export const addFriend: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.body;
        const connection = await Connection.findOneAndUpdate({ user_id: req.user?._id }, { $addToSet: { following: new ObjectId(id) } }, { upsert: true, new: true });
        if (connection) {
            res.status(200).json({
                status: "ok",
                message: "follow request added"
            })
        } else {
            next(new Error())
        }
    }
)
/**
 * @desc function for unfollow friend
 * @route POST /api/users/unfollow
 * @access private
 */
export const unFollow: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.body;
        const connection = await Connection.findOneAndUpdate({ user_id: req.user?._id }, { $pull: { following: new ObjectId(id) } }, { new: true });
        if (connection) {
            res.status(200).json({
                status: "ok",
                message: "user unfollowed"
            })
        } else {
            next(new Error())
        }
    }
)

/**
 * @desc function for fetching following details
 * @route POST /api/users/following
 * @access private
 */
export const getFollowing: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const searchKey = req.query.search;
        console.log("search=>", searchKey);
        const connection = await Connection.findOne({ user_id: req.user?._id }, { _id: 0, user_id: 0, close_friend: 0 })
        const following = connection?.following
        let userList = await UserProfile.find({ user_id: { $in: following } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 });
        if (userList) {
            userList = userList.filter((item) => {
                return searchKey === ""
                    ? item
                    : item.username
                        .toLowerCase()
                        .includes(searchKey as string) ||
                    item.fullname
                        ?.toLowerCase()
                        .includes(searchKey as string);
            })
            console.log(userList)
            res.status(200).json({
                status: 'ok',
                message: 'following details fetched',
                userList
            })
        } else {
            next(new Error("Server error"))
        }
    }
)
