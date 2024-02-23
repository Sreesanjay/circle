import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import BoostedPost from "../models/boostedPostSchema";
import Payment from "../models/paymentSchema";
import Plan from "../models/planSchema";
import Post from "../models/postSchema";
import Stripe from "stripe";
import env from "../util/validateEnv";
const stripe = new Stripe(env.STRIPE_SECRET);
// import Notification from "../models/notificationSchema";
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

/**
 * @desc function for uploading post
 * @route POST /api/posts/create-payment-intent
 * @access private
 */
export const createPayment: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { plan_id, post_id } = req.body;
        const post = await Post.findById(post_id);
        if (!post) {
            res.status(400);
            return next(new Error('Post not found'));
        }
        const plan = await Plan.findById(plan_id);
        if (!plan || !plan.is_active) {
            res.status(400);
            return next(new Error('Plan not found'));
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "post boost",
                        },
                        unit_amount: plan.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/posts/boost/success",
            cancel_url: "http://localhost:5173/posts/boost/cancel",
        });

        if (session) {
            res.status(201).json({
                status: 'created',
                message: 'payment created',
                id: session.id
            })
        }

    })