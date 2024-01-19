import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Interest from "../models/interestSchema"
/**
 * @desc function for deleting user profile image.
 * @route POST /api/profile/update-cover-img
 * @access private
 */
export const newInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const exist = await Interest.find({interest:req.body.interest});
        if(exist.length > 0){
            res.status(409);
            return next(Error('Interest already created!'));
        }
        const interest = new Interest(req.body);
        if(interest){
            const newInterest = await interest.save()
            res.status(201).json({
                status: "created",
                message : "New interest created",
                interest : newInterest
            })
        }
    }
)