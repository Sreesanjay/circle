import { Request, RequestHandler, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
import Connection from "../models/connectionSchema";
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
                connectionCount: { followers, following: following.following.length}
            })
        }else{
            next(Error())
        }
    }
)

