import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
import User from "../models/userModel";
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
        const userProfile = await UserProfile.findOneAndUpdate({ user_id: req.user?._id }, { $set: { cover_img: req.body.url, user_id: req.user?._id } }, { new: true });
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
 * @route POST /api/profile/update-cover-img
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
 * @route POST /api/profile/update-cover-img
 * @access private
 */
export const deleteProfileImg: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userProfile = await User.findOneAndUpdate({ user_id: req.user?._id }, { $unset: { profile_img: 1 } }, { new: true })
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