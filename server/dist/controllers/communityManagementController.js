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
exports.undoRemoveCommunity = exports.getCommunityAnalytics = exports.getCommunities = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const communitySchema_1 = __importDefault(require("../models/communitySchema"));
/**
 * @desc function for fetching communities
 * @route GET /api/admin/community-management
 * @access private
 */
exports.getCommunities = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 10;
    let sort = {};
    if (req.query.sort === 'RECENTLTY_CREATED')
        sort = { createdAt: -1 };
    else if (req.query.sort === 'OLDEST_COMMUNITY')
        sort = { createdAt: 1 };
    else if (req.query.sort === 'REPORTS')
        sort = { reports: -1 };
    const communityList = yield communitySchema_1.default.aggregate([
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
                from: 'members',
                localField: '_id',
                foreignField: 'community_id',
                as: 'members',
                pipeline: [
                    {
                        $match: {
                            status: 'active'
                        }
                    }
                ]
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
    if (communityList) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            communityList
        });
    }
    else {
        next(new Error());
    }
}));
/**
* @desc function for undoing deleting post
* @route GET /api/admin/community-management/analytics
* @access private
*/
exports.getCommunityAnalytics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const total_community = yield communitySchema_1.default.countDocuments();
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const communityToday = yield communitySchema_1.default.countDocuments({ createdAt: { $gte: today } });
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const communityMonth = yield communitySchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfMonth
        }
    });
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const communityYear = yield communitySchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfYear
        }
    });
    if (total_community && communityToday !== null && communityMonth !== null && communityYear !== null) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            analytics: {
                total_community,
                todays_community: communityToday,
                thismonth_community: communityMonth,
                this_year_community: communityYear
            }
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc request for removing community
 * @route PUT /api/community/undo-remove/:id
 * @access private
 */
exports.undoRemoveCommunity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const community_id = req.params.id;
    if (!community_id) {
        res.status(400);
        return next(new Error('Invalid community'));
    }
    const community = yield communitySchema_1.default.findOneAndUpdate({ _id: community_id }, { $set: { is_delete: false } }, { new: true });
    if (community) {
        res.status(200).json({
            status: 'ok',
            message: 'Community deleted undo successfully',
            community
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
