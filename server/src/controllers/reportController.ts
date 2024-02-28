import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Report from "../models/reportSchema";
import { ObjectId } from "mongodb";


/**
 * @desc function for getting story viewers
 * @route PUT /api/story/get-viewers-list/:id
 * @access private
 */
export const getReports: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const reports = await Report.aggregate([
            {
                $match: {
                    reported_id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userProfile',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
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
                                fullname: 1,
                                email: '$user.email'
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
                }
            },
        ])

        if (reports) {
            res.status(200).json({
                status: 'ok',
                message: 'reports fetched',
                reports
            })
        } else {
            next(new Error('Internal server error'))
        }

    })