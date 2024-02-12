import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { ObjectId } from 'mongodb';
import Notification from "../models/notificationSchema";


/**
 * @desc req for fetching all unread notifications 
 * @route GET /api/notifications
 * @access private
 */
export const getUnreadNotifications: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const notifications = await Notification.aggregate([
            {
                $match: {
                    user_id: new ObjectId(req.user?._id),
                    is_read: false
                }
            },
            {
                $lookup: {
                    from: "userprofiles",
                    localField: 'sender_id',
                    foreignField: 'user_id',
                    as: 'userProfile',
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
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
                                username: 1,
                                fullname: 1,
                                profile_img: 1,
                                email: '$user.email'
                            }
                        }
                    ]
                }
            }, {
                $unwind: {
                    path: '$userProfile'
                }
            }
        ])
        if (notifications) {
            res.status(200).json({
                status: 'ok',
                message: 'fetched all unread notifications',
                notifications
            })
        } else {
            next(new Error("Internal server error"))
        }
    })


/**
 * @desc req for fetching all unread notifications 
 * @route GET /api/notifications/:id
 * @access private
 */
export const readNotificaiton: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            res.status(400);
            return next(new Error("Notification not found"));
        }
        const notifications = await Notification.findOneAndUpdate({ _id: id }, { $set: { is_read: true } }, { new: true })
        if (notifications) {
            res.status(200).json({
                status: 'ok',
                message: 'fetched all unread notifications',
                notifications
            })
        } else {
            next(new Error("Internal server error"))
        }
    })