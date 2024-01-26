import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
import Connection from "../models/connectionSchema";
import { ObjectId } from 'mongodb'

interface IUserList {
    user_id: {
        _id: ObjectId,
        email: string
    }, username: string, verified: boolean, profile_img: string, fullname: string
}

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
        const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 0;
        const connection = await Connection.findOne({ user_id: req.user?._id }, { _id: 0, user_id: 0, close_friend: 0 })
        const following = connection?.following
        const userList: IUserList[] = await UserProfile.find({ user_id: { $in: following } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 }).populate({ path: 'user_id', select: "email" })
        let modifiedUserList = userList.map(({ username, verified, user_id, profile_img, fullname }) => ({
            username,
            verified,
            user_id: user_id._id,
            email: user_id.email,
            profile_img,
            fullname,
        }));
        if (modifiedUserList) {
            modifiedUserList = modifiedUserList.filter((item: { username: string; fullname: string; }) => {
                return searchKey === ""
                    ? item
                    : item.username
                        .toLowerCase()
                        .includes(searchKey as string) ||
                    item.fullname
                        ?.toLowerCase()
                        .includes(searchKey as string);
            })
            modifiedUserList = modifiedUserList.slice(page, page + 10)
            res.status(200).json({
                status: 'ok',
                message: 'following details fetched',
                userList: modifiedUserList
            })
        } else {
            next(new Error("Server error"))
        }
    }
)

/**
 * @desc function for fetching following details
 * @route POST /api/users/following
 * @access private
 */
export const getFollowers: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const searchKey = req.query.search;
        const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 0;
        const connection = await Connection.aggregate([
            {
                $match: {
                    following: new ObjectId(req.user?._id)
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userProfile'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
                }
            },
            {
                $project: {
                    _id: 0,
                    user_id: "$userProfile.user_id", username: "$userProfile.username", verified: "$userProfile.verified", profile_img: "$userProfile.profile_img", fullname: "$userProfile.fullname", email: "$user.email"
                },
            },
        ])
        if (connection) {
            let userList = connection?.filter((item) => {
                return searchKey === ""
                    ? item
                    : item.username
                        .toLowerCase()
                        .includes(searchKey as string) ||
                    item.fullname
                        ?.toLowerCase()
                        .includes(searchKey as string);
            })
            userList = userList.slice(page, page + 10)
            res.status(200).json({
                status: 'ok',
                message: 'followers details fetched',
                userList
            })
        } else {
            next(new Error("Server error"))
        }
    }
)

/**
 * @desc for fetching close friends
 * @route GET /api/users/close-friends
 * @access private
 */
export const getCloseFriends: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const connection = await Connection.findOne({ user_id: req.user?._id }, { _id: 0, user_id: 0, following: 0 });
        const closeFriends = connection?.close_friend
        const userList: IUserList[] = await UserProfile.find({ user_id: { $in: closeFriends } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 }).populate({ path: 'user_id', select: "email" })
        console.log(userList)
        if (userList) {
            res.status(200).json({
                status: "ok",
                message: "close friends fetched",
                userList
            })
        } else {
            next(new Error())
        }
    }
)

/**
 * @desc function for fetching following details without close friends
 * @route GET /api/users/get-following
 * @access private
 */

export const getFollowingWithoutCloseFriends: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("request got")
        const connection = await Connection.aggregate([
            {
                $match: {
                    user_id: req.user?._id
                }
            },
            {
                $project: {
                    followingNotInCloseFriends: {
                        $setDifference: ['$following', '$close_friend'],
                    },
                },
            }
        ])
        const closeFriends = connection[0]?.followingNotInCloseFriends
        const userList: IUserList[] = await UserProfile.find({ user_id: { $in: closeFriends } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 }).populate({ path: 'user_id', select: "email" })
        const modifiedUserList = userList.map(({ username, verified, user_id, profile_img, fullname }) => ({
            username,
            verified,
            user_id: user_id._id,
            email: user_id.email,
            profile_img,
            fullname,
        }))
        if (modifiedUserList) {
            res.status(200).json({
                status: 'ok',
                message: 'following details fetched',
                userList: modifiedUserList
            })
        } else {
            next(new Error("Server error"))
        }
    }
)

/**
 * @desc function adding new close friend
 * @route POST /api/users/add-closefriend
 * @access private
 */

export const addCloseFriend: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.body;
        const connection = await Connection.findOneAndUpdate({ user_id: req.user?._id }, { $addToSet: { close_friend: new ObjectId(id) } }, { upsert: true, new: true });
        if (connection) {
            res.status(200).json({
                status: "ok",
                message: "Add to close friends"
            })
        } else {
            next(new Error())
        }
    }
)
