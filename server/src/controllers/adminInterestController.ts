import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Interest from "../models/interestSchema"
import userProfile from "../models/userProfile";

/**
 * @desc function for creating new interest.
 * @route POST /api/admin/interest
 * @access private
 */
export const newInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const exist = await Interest.find({ interest: req.body.interest });
        if (exist.length > 0) {
            res.status(409);
            return next(Error('Interest already created!'));
        }
        const interest = new Interest(req.body);
        if (interest) {
            const newInterest = await interest.save()
            res.status(201).json({
                status: "created",
                message: "New interest created",
                interest: newInterest
            })
        }
    }
)

/**
 * @desc function for updating interest.
 * @route PUT /api/admin/interest
 * @access private
 */
export const updateInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const interest = await Interest.findOne({ _id: req.params.id })
        if (interest) {
            interest.interest = req.body.interest;
            interest.discription = req.body.discription;
            interest.image = req.body.image !== '' ? req.body.image : interest.image
            const newInterest = await interest.save();
            if (newInterest) {
                res.status(200).json({
                    status: "ok ",
                    message: "interest updated",
                    interest: newInterest
                })
            }
        } else {
            next(new Error())
        }
    }
)

/**
 * @desc function for fetching all interests.
 * @route GET /api/admin/interest
 * @access private
 */
export const getAllInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const interest = await Interest.aggregate([
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: '_id',
                    foreignField: 'interest',
                    as: 'users',
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'tags',
                    as: 'posts',
                },
            },
            {
                $lookup: {
                    from: 'communities',
                    localField: '_id',
                    foreignField: 'topic',
                    as: 'community',
                },
            },
            {
                $addFields: {
                    total_users: { $size: "$users" },
                    total_community: { $size: "$community" },
                    total_posts: { $size: "$posts" }
                }
            },
            {
                $project: {
                    _id: 1,
                    image: 1,
                    interest: 1,
                    discription: 1,
                    total_users: 1,
                    total_community: 1,
                    total_posts: 1
                },
            },
        ]);
        res.status(200).json({
            status: "ok",
            message: "Interest fetched",
            interest
        })
    }
)

/**
 * @desc function for deleting interest.
 * @route DELETE /api/admin/interest
 * @access private
 */
export const deleteInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            res.status(401)
            return next(Error('Invalid credentials'));
        }
        const deleted = await Interest.findByIdAndDelete(id);
        await userProfile.updateMany({ $pull: { interest: { _id: id } } })
        if (!deleted) return next(Error())
        res.status(200).json({
            status: "ok",
            message: "Interest deleted",
        })
    }
)