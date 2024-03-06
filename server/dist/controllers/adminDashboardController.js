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
exports.getUserReport = exports.getDashboardAnalytics = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postSchema_1 = __importDefault(require("../models/postSchema"));
const communitySchema_1 = __importDefault(require("../models/communitySchema"));
const discussionSchema_1 = __importDefault(require("../models/discussionSchema"));
const userModel_1 = __importDefault(require("../models/userModel"));
/**
 * @desc request for getting details such as total users total posts total community total discussions
 * @route GET /api/admin/dashboard/analytics
 * @access private
 */
exports.getDashboardAnalytics = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const total_users = yield userModel_1.default.countDocuments();
    const total_posts = yield postSchema_1.default.countDocuments();
    const total_community = yield communitySchema_1.default.countDocuments();
    const total_discussions = yield discussionSchema_1.default.countDocuments();
    res.status(200).json({
        status: 'ok',
        message: 'details fetched',
        analytics: {
            total_users,
            total_posts,
            total_community,
            total_discussions
        }
    });
}));
/**
 * @desc request for getting user report in a year
 * @route GET /api/admin/dashboard/user-report/:year
 * @access private
 */
exports.getUserReport = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.params.year;
    if (!year) {
        res.status(400);
        return next(new Error("year is not specified"));
    }
    const userList = yield userModel_1.default.aggregate([
        {
            $match: {
                role: 'USER',
                $expr: {
                    $eq: [
                        {
                            $year: "$createdAt"
                        },
                        Number(year)
                    ]
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
            }
        }
    ]);
    const userCount = {};
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthNames.forEach(month => {
        userCount[month] = 0;
    });
    // Update counts for existing months
    userList.forEach((result) => {
        const monthName = new Date(Number(year), result._id - 1).toLocaleString('default', { month: 'long' });
        userCount[monthName] = result.count;
    });
    if (userCount) {
        res.status(200).json({
            status: 'ok',
            message: 'user report fetched',
            userCount
        });
    }
}));
