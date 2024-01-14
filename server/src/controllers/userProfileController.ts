import {Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
// import User from "../models/userModel";
// import { IUser } from "../Interfaces";

export const getUserProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userProfile = await  UserProfile.findOne({user_profile : req.user?._id},{reports : 0})
            res.status(200).json({
                status : 'OK',
                message : "User profile details fetched",
                userProfile
            });
    }
)