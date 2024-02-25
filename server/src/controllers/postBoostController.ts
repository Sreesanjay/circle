import { Request, RequestHandler, Response, NextFunction } from "express";
import Comment from "../models/commentSchema";
import asyncHandler from "express-async-handler";
import BoostedPost from "../models/boostedPostSchema";
import Payment from "../models/paymentSchema";
import Plan from "../models/planSchema";
import Post from "../models/postSchema"
import env from "../util/validateEnv";
import Razorpay from "razorpay"


const instance = new Razorpay({
    key_id: env.RAZORPAY_KEY,
    key_secret: env.RAZORPAY_SECRET,
});

/**
 * @desc function for uploading post
 * @route POST /api/posts/boost
 * @access private
 */
export const boostPost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { post_id, plan_id, amount, action, payment } = req.body;
        if (!post_id || !plan_id || !payment || !action) {
            res.status(400);
            return next(new Error('Invalid details'));
        }
        const newPayment = await new Payment({
            payment_id: payment.razorpay_payment_id,
            order_id: payment.razorpay_order_id,
            user_id: req.user?._id,
            amount: amount
        }).save();
        if (!newPayment) {
            res.status(500);
            next(new Error('Payment Process failed'));
            return;
        }

        const plan = await Plan.findById(plan_id);
        if (plan?.duration) {
            const currentDate = new Date();
            const endingDate = new Date(currentDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // Adding totalDay days

            const boostedPost = await new BoostedPost({
                post_id: post_id,
                plan_id: plan_id,
                startingDate: new Date(),
                endingDate: endingDate,
                action: action,
                payment_details: newPayment._id
            }).save()

            if (boostedPost) {
                res.status(201).json({
                    status: 'created',
                    message: 'post boosted successfully',
                    boostedPost
                })
            }
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

        const options = {
            amount: plan.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "sdgsdgsdgsdg"
        };
        instance.orders.create(options, function (err, order) {
            res.status(201).json({
                status: 'created',
                message: 'payment created',
                order
            })
        });
    })

/**
 * @desc function for handling success payment
 * @route POST /api/posts/boost/payment-success
 * @access private
 */
export const boostPaymentSuccess: RequestHandler = asyncHandler(
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

        const options = {
            amount: plan.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "sdgsdgsdgsdg"
        };
        instance.orders.create(options, function (err, order) {
            res.status(201).json({
                status: 'created',
                message: 'payment created',
                order
            })
        });
    })



/**
 * @desc function for handling success payment
 * @route GET /api/posts/insights/:id
 * @access private
 */
export const getInsights: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const post_id = req.query.post_id;
        if (!post_id) {
            res.status(400);
            return next(new Error("post not found"));
        }
        const boostedPost = await BoostedPost.findOne({ post_id: post_id });
        const comment = await Comment.countDocuments({ post_id: post_id })
        if (boostedPost) {
            res.status(200).json({
                status: 'ok',
                message: 'insigts fetched',
                boostedPost,
                comment
            })
        }

    })

/**
 * @desc function for handling success payment
 * @route GET /api/posts/add-click
 * @access private
 */
export const addClick: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { post_id } = req.body;
        if (!post_id) {
            res.status(400);
            return next(new Error("post not found"));
        }
        const addedClick = await Post.findOneAndUpdate({ _id: post_id }, { $addToSet: { clicks: req.user?._id } })
        if (addedClick) {
            res.status(200).json({
                status: 'ok',
                message: 'added click'
            })
        }

    })

