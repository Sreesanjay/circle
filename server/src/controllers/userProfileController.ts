import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import UserProfile from "../models/userProfile"
// import User from "../models/userModel";
// import { IUser } from "../Interfaces";

export const getUserProfile: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userProfile = await  UserProfile.findOne({user_profile : req.user?._id})
        if(userProfile){
            res.status(200).json(userProfile);
        }else{
            res.status(404);
            next(Error("profile details not found"))
        }
    }
)