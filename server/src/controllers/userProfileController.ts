import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
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
        const userProfile = await UserProfile.findByIdAndUpdate(req.user?._id, { $set: { cover_img: req.body.url, user_id: req.user?._id } }, { upsert: true })
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