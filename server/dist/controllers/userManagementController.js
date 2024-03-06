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
exports.unblockuser = exports.blockUser = exports.getUserAnalytics = exports.getUserManagement = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import UserProfile from "../models/userProfile";
const userModel_1 = __importDefault(require("../models/userModel"));
// import { ObjectId } from 'mongodb';
// import Report from "../models/reportSchema";
/**
 * @desc function for fetching friend suggestions
 * @route GET /api/admin/user-management/userlist
 * @access private
 */
exports.getUserManagement = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 10;
    let sort = {};
    if (req.query.sort === 'RECENTLTY_JOINED')
        sort = { createdAt: -1 };
    else if (req.query.sort === 'OLDEST_MEMBERS')
        sort = { createdAt: 1 };
    else if (req.query.sort === 'REPORTS')
        sort = { reports: -1 };
    else if (req.query.sort === 'USERNAME')
        sort = { "profile.username": 1 };
    const users = yield userModel_1.default.aggregate([
        {
            $match: { role: 'USER' }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: '_id',
                foreignField: 'user_id',
                as: 'profile'
            }
        },
        {
            $unwind: {
                path: '$profile'
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
                username: "$profile.username",
                fullname: "$profile.fullname",
                profile_img: "$profile.profile_img",
                email: 1,
                is_blocked: 1,
                reports: 1,
            }
        },
        {
            $skip: (page - 1) * pageSize
        },
        {
            $limit: pageSize
        },
    ]);
    if (users) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            userList: users
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for fetching analytics for user management
 * @route GET /api/admin/user-management/analytics
 * @access private
 */
exports.getUserAnalytics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const total_users = yield userModel_1.default.countDocuments({ role: 'USER' });
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const usersToday = yield userModel_1.default.countDocuments({ role: 'USER', createdAt: { $gte: today } });
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const usersMonth = yield userModel_1.default.countDocuments({
        role: 'USER',
        createdAt: {
            $gte: firstDayOfMonth
        }
    });
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const usersYear = yield userModel_1.default.countDocuments({
        role: 'USER',
        createdAt: {
            $gte: firstDayOfYear,
            $lt: today
        }
    });
    if (total_users && usersMonth !== null && usersToday !== null && usersYear !== null) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            analytics: {
                total_users,
                todays_users: usersToday,
                thismonth_users: usersMonth,
                this_year_users: usersYear
            }
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for blocking user
 * @route GET /api/admin/user-management/block/:id
 * @access private
 */
exports.blockUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userModel_1.default.findOneAndUpdate({ _id: id }, { $set: { is_blocked: true } }, { new: true });
    if (user) {
        res.status(200).json({
            status: 'ok',
            message: 'account blocked'
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for unblocking user
 * @route GET /api/admin/user-management/unblock/:id
 * @access private
 */
exports.unblockuser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userModel_1.default.findOneAndUpdate({ _id: id }, { $set: { is_blocked: false } }, { new: true });
    if (user) {
        res.status(200).json({
            status: 'ok',
            message: 'account blocked'
        });
    }
    else {
        next(new Error());
    }
}));
