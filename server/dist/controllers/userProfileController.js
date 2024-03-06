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
exports.addVerification = exports.createPaymentRequest = exports.getSavedPosts = exports.getUserPosts = exports.getMyPosts = exports.getConnectionCount = exports.updateProfile = exports.deleteProfileImg = exports.updateProfileImg = exports.deleteCoverImg = exports.updateCoverImg = exports.getUserProfile = void 0;
const mongodb_1 = require("mongodb");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const connectionSchema_1 = __importDefault(require("../models/connectionSchema"));
const postSchema_1 = __importDefault(require("../models/postSchema"));
const savedPost_1 = __importDefault(require("../models/savedPost"));
const razorpay_1 = __importDefault(require("razorpay"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const planSchema_1 = __importDefault(require("../models/planSchema"));
const verificationSchema_1 = __importDefault(require("../models/verificationSchema"));
const paymentSchema_1 = __importDefault(require("../models/paymentSchema"));
// import { IConnections } from "../Interfaces";
// import User from "../models/userModel";
// import { IUser } from "../Interfaces";
const instance = new razorpay_1.default({
    key_id: validateEnv_1.default.RAZORPAY_KEY,
    key_secret: validateEnv_1.default.RAZORPAY_SECRET,
});
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userProfile = yield userProfile_1.default.aggregate([
        {
            $match: {
                user_id: new mongodb_1.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
            }
        }, {
            $lookup: {
                from: 'verifications',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'verified',
                pipeline: [
                    {
                        $match: {
                            endingDate: { $gt: new Date() }
                        }
                    }
                ]
            }
        }, {
            $project: {
                fullname: 1,
                gender: 1,
                bio: 1,
                username: 1,
                profile_img: 1,
                isVerified: { $cond: { if: { $gt: [{ $size: "$verified" }, 0] }, then: true, else: false } },
                account_type: 1,
                cover_img: 1,
                interest: 1
            }
        }
    ]);
    res.status(200).json({
        status: 'OK',
        message: "User profile details fetched",
        userProfile: userProfile[0]
    });
}));
/**
 * @desc function for updating user cover image.
 * @route POST /api/profile/update-cover-img
 * @access private
 */
exports.updateCoverImg = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userProfile = yield userProfile_1.default.findOneAndUpdate({ user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, { $set: { cover_img: req.body.url } }, { new: true });
    if (userProfile) {
        res.status(200).json({
            status: 'OK',
            message: "User cover image updated",
            userProfile
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc function for deleting user cover image.
 * @route POST /api/profile/delete-cover-img
 * @access private
 */
exports.deleteCoverImg = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userProfile = yield userProfile_1.default.findOneAndUpdate({ user_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, { $unset: { cover_img: 1 } }, { new: true });
    if (userProfile) {
        res.status(200).json({
            status: 'OK',
            message: "User cover image deleted",
            userProfile
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc function for update user profile image.
 * @route POST /api/profile/update-profile_img
 * @access private
 */
exports.updateProfileImg = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userProfile = yield userProfile_1.default.findOneAndUpdate({ user_id: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }, { $set: { profile_img: req.body.url } }, { new: true });
    if (userProfile) {
        res.status(200).json({
            status: 'OK',
            message: "Profile image updated successfully",
            userProfile
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc function for deleting user profile image.
 * @route PUT /api/profile/delete-profile_img
 * @access private
 */
exports.deleteProfileImg = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userProfile = yield userProfile_1.default.findOneAndUpdate({ user_id: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id }, { $unset: { profile_img: 1 } }, { new: true });
    if (userProfile) {
        res.status(200).json({
            status: 'OK',
            message: "User profile image deleted",
            userProfile
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc function for deleting user profile image.
 * @route POST /api/profile/update-cover-img
 * @access private
 */
exports.updateProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    if (!((_f = req.body) === null || _f === void 0 ? void 0 : _f.username)) {
        res.status(400);
        return next(Error("Username is required"));
    }
    const existingUser = yield userProfile_1.default.findOne({ username: req.body.username, user_id: { $ne: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id } });
    if (existingUser) {
        res.status(409);
        return next(Error("Username already exists"));
    }
    const userProfile = yield userProfile_1.default.findOneAndUpdate({ user_id: (_h = req.user) === null || _h === void 0 ? void 0 : _h._id }, { $set: req.body }, { new: true });
    res.status(200).json({
        status: "ok",
        message: "User profile updated successfully",
        userProfile
    });
}));
/**
 * @desc function for fetching followers count and following count.
 * @route POST /api/profile/connection-count
 * @access private
 */
exports.getConnectionCount = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    const followers = yield connectionSchema_1.default.countDocuments({
        following: new mongodb_1.ObjectId((_j = req.user) === null || _j === void 0 ? void 0 : _j._id),
    });
    const following = yield connectionSchema_1.default.findOne({
        user_id: (_k = req.user) === null || _k === void 0 ? void 0 : _k._id
    });
    if (following && followers !== null) {
        res.status(200).json({
            message: "connection counts fetched",
            connectionCount: { followers, following: following.following.length }
        });
    }
    else {
        next(Error());
    }
}));
/**
 * @desc function for fetching my posts
 * @route GET /api/profile/posts
 * @access private
 */
exports.getMyPosts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    const posts = yield postSchema_1.default.aggregate([
        {
            $match: {
                user_id: new mongodb_1.ObjectId((_l = req.user) === null || _l === void 0 ? void 0 : _l._id),
                is_archive: false,
                is_delete: false
            }
        },
        {
            $lookup: {
                from: "savedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_saved",
                pipeline: [
                    {
                        $match: {
                            user_id: (_m = req.user) === null || _m === void 0 ? void 0 : _m._id
                        }
                    },
                    {
                        $project: {
                            user_id: 0,
                            post_id: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "boostedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_boosted",
                pipeline: [
                    {
                        $match: {
                            endingDate: { $gt: new Date() }
                        }
                    },
                    {
                        $project: {
                            post_id: 0,
                        }
                    }
                ]
            }
        },
        { $unwind: { path: "$is_boosted", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                user_id: 1,
                is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                is_boosted: 1,
                user_details: 1,
                type: 1,
                clicks: 1,
                content: 1,
                caption: 1,
                tags: 1,
                visibility: 1,
                impressions: 1,
                createdAt: 1,
                likes: 1
            }
        }
    ]);
    if (posts) {
        res.status(200).json({
            status: 'ok',
            message: 'posts fetched',
            posts
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc function for fetching all posts of a user
 * @route GET /api/profile/get-posts/:id
 * @access private
 */
exports.getUserPosts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postSchema_1.default.aggregate([
        {
            $match: {
                user_id: new mongodb_1.ObjectId(req.params.id),
                is_archive: false,
                is_delete: false
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: "user_details",
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: "email",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 0,
                                        email: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind: {
                            path: "$email"
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            profile_img: 1,
                            email: 1
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: "$user_details"
            }
        }
    ]);
    if (posts) {
        res.status(200).json({
            status: 'ok',
            message: 'posts fetched',
            posts
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc function for fetching saved posts
 * @route GET /api/profile/saved-posts
 * @access private
 */
exports.getSavedPosts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    const saved = yield savedPost_1.default.find({ user_id: (_o = req.user) === null || _o === void 0 ? void 0 : _o._id }, { post_id: 1, _id: 0 });
    const savedPostIds = saved.map(item => item.post_id);
    const posts = yield postSchema_1.default.aggregate([
        {
            $match: {
                _id: { $in: savedPostIds },
                is_archive: false,
                is_delete: false
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: "user_details",
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: "email",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 0,
                                        email: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind: {
                            path: "$email"
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            profile_img: 1,
                            email: 1
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: "$user_details"
            }
        }
    ]);
    if (posts) {
        res.status(200).json({
            status: 'ok',
            message: 'saved posts fetched',
            posts
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc function for fetching saved posts
 * @route GET /api/profile/saved-posts
 * @access private
 */
exports.createPaymentRequest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { plan_id } = req.body;
    const plan = yield planSchema_1.default.findById(plan_id);
    if (!plan || !plan.is_active) {
        res.status(400);
        return next(new Error('Plan not found'));
    }
    const options = {
        amount: plan.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "subscription"
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
 * @desc function for fetching saved posts
 * @route GET /api/profile/add-verification
 * @access private
 */
exports.addVerification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q;
    const { plan_id, amount, document, document_type, payment } = req.body;
    const plan = yield planSchema_1.default.findById(plan_id);
    if (!plan || !plan.is_active) {
        res.status(400);
        return next(new Error('Plan not found'));
    }
    // user_id: ObjectId;
    // startingDate: Date,
    // endingDate: Date,
    // plan_id: ObjectId,
    // document: string;
    // document_type: string;
    // payment_details: ObjectId
    const newPayment = yield new paymentSchema_1.default({
        payment_id: payment.razorpay_payment_id,
        order_id: payment.razorpay_order_id,
        user_id: (_p = req.user) === null || _p === void 0 ? void 0 : _p._id,
        amount: amount
    }).save();
    if (!newPayment) {
        res.status(500);
        next(new Error('Payment Process failed'));
        return;
    }
    const currentDate = new Date();
    const endingDate = new Date(currentDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // Adding totalDay days
    const verification = yield new verificationSchema_1.default({
        user_id: (_q = req.user) === null || _q === void 0 ? void 0 : _q._id,
        plan_id: plan._id,
        startingDate: new Date(),
        endingDate: endingDate,
        document: document,
        document_type: document_type,
        payment_details: newPayment._id
    }).save();
    if (verification) {
        res.status(200).json({
            status: 'ok',
            message: 'verification added'
        });
    }
}));
