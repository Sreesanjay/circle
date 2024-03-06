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
exports.undoRemoveDiscussion = exports.getDiscussionAnalytics = exports.getDiscussion = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const discussionSchema_1 = __importDefault(require("../models/discussionSchema"));
/**
 * @desc function for fetching all discussions
 * @route GET /api/admin/discussion-management
 * @access private
 */
exports.getDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 10;
    let sort = {};
    if (req.query.sort === 'RECENTLTY_CREATED')
        sort = { createdAt: -1 };
    else if (req.query.sort === 'OLDEST_Discussions')
        sort = { createdAt: 1 };
    else if (req.query.sort === 'REPORTS')
        sort = { reports: -1 };
    const discussionList = yield discussionSchema_1.default.aggregate([
        {
            $lookup: {
                from: 'reports',
                localField: '_id',
                foreignField: 'reported_id',
                as: 'reports'
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'userProfile',
            }
        },
        {
            $unwind: {
                path: '$userProfile'
            }
        },
        {
            $sort: sort
        },
        {
            $skip: (page - 1) * pageSize
        },
        {
            $limit: pageSize
        },
    ]);
    if (discussionList) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            discussionList
        });
    }
    else {
        next(new Error());
    }
}));
/**
* @desc function for undoing deleting post
* @route GET /api/admin/discussion-management/analytics
* @access private
*/
exports.getDiscussionAnalytics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const total_discussion = yield discussionSchema_1.default.countDocuments();
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const discussionToday = yield discussionSchema_1.default.countDocuments({ createdAt: { $gte: today } });
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const discussionMonth = yield discussionSchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfMonth
        }
    });
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const discussionYear = yield discussionSchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfYear
        }
    });
    if (total_discussion && discussionToday !== null && discussionMonth !== null && discussionYear !== null) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            analytics: {
                total_discussion,
                todays_discussion: discussionToday,
                thismonth_discussion: discussionMonth,
                this_year_discussion: discussionYear
            }
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc request for removing community
 * @route PUT /api/discussion-management/undo-remove/:id
 * @access private
 */
exports.undoRemoveDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const discussion_id = req.params.id;
    if (!discussion_id) {
        res.status(400);
        return next(new Error('Invalid community'));
    }
    const discussion = yield discussionSchema_1.default.findOneAndUpdate({ _id: discussion_id }, { $set: { is_delete: false } }, { new: true });
    if (discussion) {
        res.status(200).json({
            status: 'ok',
            message: 'discussion deleted undo successfully',
            discussion
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
