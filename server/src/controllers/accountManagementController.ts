import { Request, RequestHandler, Response} from "express";
import asyncHandler from "express-async-handler";
import Interest from "../models/interestSchema"


/**
 * @desc function for fetching all interests.
 * @route GET /api/manage-account/interest
 * @access private
 */
export const getAllInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const interest = await Interest.find();
        res.status(200).json({
            status: "ok",
            message: "Interest fetched",
            interest
        })
    }
)

/**
 * @desc function for fetching user interest.
 * @route GET /api/manage-account/interest
 * @access private
 */
export const getMyInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        console.log(req.body)
        const interest = await Interest.find({_id:{$in:req.body.interest}});
        res.status(200).json({
            status: "ok",
            message: "Interest fetched",
            interest
        })
    }
)