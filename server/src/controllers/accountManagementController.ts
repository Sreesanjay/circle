import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Interest from "../models/interestSchema"


/**
 * @desc function for fetching all interests.
 * @route GET /api/admin/interest
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