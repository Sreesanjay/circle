import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import BoostedPost from "../models/boostedPostSchema";
import Payment from "../models/paymentSchema";
// import Notification from "../models/notificationSchema";
// import Post from "../models/postSchema";
// import Connection from "../models/connectionSchema";
// import UserProfile from "../models/userProfile";
// import { ObjectId } from 'mongodb';
// import Comment from "../models/commentSchema";
// import SavedPost from "../models/savedPost";

/**
 * @desc function for uploading post
 * @route POST /api/posts/boost
 * @access private
 */
export const boostPost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { post_id, plan_id, action, payment } = req.body;
        if (!post_id || !plan_id || !payment.transaction_id || !action) {
            res.status(400);
            return next(new Error('Invalid details'));
        }
        const newPayment = await new Payment({
            ...payment
        }).save();
        if (!newPayment) {
            res.status(500);
            next(new Error('Payment Process failed'));
            return;
        }
        const boostedPost = await new BoostedPost({
            post_id: post_id,
            plan_id: plan_id,
            startingDate: new Date(),
            action: action,
            payment_details: newPayment._id
        })

        if (boostedPost) {
            res.status(201).json({
                status: 'created',
                message: 'post boosted successfully'
            })
        }

    })