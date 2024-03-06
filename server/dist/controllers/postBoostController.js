"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClick = exports.getInsights = exports.boostPaymentSuccess = exports.createPayment = exports.boostPost = void 0;
const commentSchema_1 = __importDefault(require("../models/commentSchema"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const boostedPostSchema_1 = __importDefault(require("../models/boostedPostSchema"));
const paymentSchema_1 = __importDefault(require("../models/paymentSchema"));
const planSchema_1 = __importDefault(require("../models/planSchema"));
const postSchema_1 = __importDefault(require("../models/postSchema"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const razorpay_1 = __importDefault(require("razorpay"));
const instance = new razorpay_1.default({
    key_id: validateEnv_1.default.RAZORPAY_KEY,
    key_secret: validateEnv_1.default.RAZORPAY_SECRET,
});
/**
 * @desc function for uploading post
 * @route POST /api/posts/boost
 * @access private
 */
exports.boostPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { post_id, plan_id, amount, action, payment } = req.body;
    if (!post_id || !plan_id || !payment || !action) {
        res.status(400);
        return next(new Error('Invalid details'));
    }
    const newPayment = yield new paymentSchema_1.default({
        payment_id: payment.razorpay_payment_id,
        order_id: payment.razorpay_order_id,
        user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        amount: amount
    }).save();
    if (!newPayment) {
        res.status(500);
        next(new Error('Payment Process failed'));
        return;
    }
    const plan = yield planSchema_1.default.findById(plan_id);
    if (plan === null || plan === void 0 ? void 0 : plan.duration) {
        const currentDate = new Date();
        const endingDate = new Date(currentDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // Adding totalDay days
        const boostedPost = yield new boostedPostSchema_1.default({
            post_id: post_id,
            plan_id: plan_id,
            startingDate: new Date(),
            endingDate: endingDate,
            action: action,
            payment_details: newPayment._id
        }).save();
        if (boostedPost) {
            res.status(201).json({
                status: 'created',
                message: 'post boosted successfully',
                boostedPost
            });
        }
    }
}));
/**
 * @desc function for uploading post
 * @route POST /api/posts/create-payment-intent
 * @access private
 */
exports.createPayment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { plan_id, post_id } = req.body;
    const post = yield postSchema_1.default.findById(post_id);
    if (!post) {
        res.status(400);
        return next(new Error('Post not found'));
    }
    const plan = yield planSchema_1.default.findById(plan_id);
    if (!plan || !plan.is_active) {
        res.status(400);
        return next(new Error('Plan not found'));
    }
    const options = {
        amount: plan.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "sdgsdgsdgsdg"
    };
    instance.orders.create(options, function (err, order) {
        res.status(201).json({
            status: 'created',
            message: 'payment created',
            order
        });
    });
}));
/**
 * @desc function for handling success payment
 * @route POST /api/posts/boost/payment-success
 * @access private
 */
exports.boostPaymentSuccess = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { plan_id, post_id } = req.body;
    const post = yield postSchema_1.default.findById(post_id);
    if (!post) {
        res.status(400);
        return next(new Error('Post not found'));
    }
    const plan = yield planSchema_1.default.findById(plan_id);
    if (!plan || !plan.is_active) {
        res.status(400);
        return next(new Error('Plan not found'));
    }
    const options = {
        amount: plan.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "sdgsdgsdgsdg"
    };
    instance.orders.create(options, function (err, order) {
        res.status(201).json({
            status: 'created',
            message: 'payment created',
            order
        });
    });
}));
/**
 * @desc function for handling success payment
 * @route GET /api/posts/insights/:id
 * @access private
 */
exports.getInsights = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.query.post_id;
    if (!post_id) {
        res.status(400);
        return next(new Error("post not found"));
    }
    const boostedPost = yield boostedPostSchema_1.default.findOne({ post_id: post_id });
    const comment = yield commentSchema_1.default.countDocuments({ post_id: post_id });
    if (boostedPost) {
        res.status(200).json({
            status: 'ok',
            message: 'insigts fetched',
            boostedPost,
            comment
        });
    }
}));
/**
 * @desc function for handling success payment
 * @route GET /api/posts/add-click
 * @access private
 */
exports.addClick = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { post_id } = req.body;
    if (!post_id) {
        res.status(400);
        return next(new Error("post not found"));
    }
    const addedClick = yield postSchema_1.default.findOneAndUpdate({ _id: post_id }, { $addToSet: { clicks: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id } });
    if (addedClick) {
        res.status(200).json({
            status: 'ok',
            message: 'added click'
        });
    }
}));
