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
exports.getAnalytics = exports.undoDelete = exports.getPostList = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postSchema_1 = __importDefault(require("../models/postSchema"));
// import Connection from "../models/connectionSchema";
// import UserProfile from "../models/userProfile";
// import { ObjectId } from 'mongodb';
/**
 * @desc function for adding new story
 * @route GET /api/admin/post-management
 * @access private
 */
exports.getPostList = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 10;
    let sort = {};
    if (req.query.sort === 'RECENTLTY_CREATED')
        sort = { createdAt: -1 };
    else if (req.query.sort === 'OLDEST_POST')
        sort = { createdAt: 1 };
    else if (req.query.sort === 'REPORTS')
        sort = { reports: -1 };
    else if (req.query.sort === 'LIKES')
        sort = { likes: -1 };
    else if (req.query.sort === 'LOWEST_LIKES')
        sort = { likes: 1 };
    const postList = yield postSchema_1.default.aggregate([
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'user_details',
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
        },
        {
            $unwind: {
                path: '$user_details'
            }
        },
        {
            $lookup: {
                from: 'reports',
                localField: '_id',
                foreignField: 'reported_id',
                as: 'reports'
            }
        },
        {
            $sort: sort
        },
        {
            $project: {
                user_id: 1,
                content: 1,
                caption: 1,
                "user_details.username": 1,
                "user_details.profile_img": 1,
                "user_details.email": 1,
                reports: 1,
                likes: 1,
                is_delete: 1
            }
        },
        {
            $skip: (page - 1) * pageSize
        },
        {
            $limit: pageSize
        },
    ]);
    if (postList) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            postList
        });
    }
    else {
        next(new Error());
    }
}));
/**
* @desc function for undoing deleting post
* @route PUT /api/admin/post-management/undo-remove/:id
* @access private
*/
exports.undoDelete = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.id;
    if (!post_id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const deleted = yield postSchema_1.default.findOneAndUpdate({ _id: post_id }, { $set: { is_delete: false } }, { new: true });
    if (deleted) {
        res.status(200).json({
            status: 'ok',
            message: 'post deletion undoed',
            post_id,
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for undoing deleting post
* @route GET /api/admin/post-management/analytics
* @access private
*/
exports.getAnalytics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const total_posts = yield postSchema_1.default.countDocuments();
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const postsToday = yield postSchema_1.default.countDocuments({ createdAt: { $gte: today } });
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const postsMonth = yield postSchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfMonth
        }
    });
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const postsYear = yield postSchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfYear
        }
    });
    if (total_posts && postsMonth !== null && postsToday !== null && postsYear !== null) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            analytics: {
                total_posts,
                todays_posts: postsToday,
                thismonth_posts: postsMonth,
                this_year_posts: postsYear
            }
        });
    }
    else {
        next(new Error());
    }
}));
