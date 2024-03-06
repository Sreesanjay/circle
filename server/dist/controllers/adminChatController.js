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
exports.undoRemovechat = exports.removechat = exports.getChatAnalytics = exports.getAllChats = void 0;
const chatSchema_1 = __importDefault(require("../models/chatSchema"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @desc request for creating new chat
 * @route POST /api/chat
 * @access private
 */
exports.getAllChats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 10;
    let sort = {};
    if (req.query.sort === 'RECENTLTY_CREATED')
        sort = { createdAt: -1 };
    else if (req.query.sort === 'OLDEST_CHAT')
        sort = { createdAt: 1 };
    else if (req.query.sort === 'REPORTS')
        sort = { reports: -1 };
    const groups = yield chatSchema_1.default.aggregate([
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
            $skip: (page - 1) * pageSize
        },
        {
            $limit: pageSize
        },
    ]);
    if (groups) {
        res.status(200).json({
            status: 'ok',
            message: 'details fetched',
            groups
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
* @desc function for undoing deleting post
* @route GET /api/admin/chat-management/analytics
* @access private
*/
exports.getChatAnalytics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const total_chat = yield chatSchema_1.default.countDocuments();
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const chatToday = yield chatSchema_1.default.countDocuments({ createdAt: { $gte: today } });
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const chatMonth = yield chatSchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfMonth
        }
    });
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const chatYear = yield chatSchema_1.default.countDocuments({
        createdAt: {
            $gte: firstDayOfYear
        }
    });
    if (total_chat && chatToday !== null && chatMonth !== null && chatYear !== null) {
        res.status(200).json({
            status: 'ok',
            message: "details fetched",
            analytics: {
                total_chat,
                todays_chat: chatToday,
                thismonth_chat: chatMonth,
                this_year_chat: chatYear
            }
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc request for removing community
 * @route PUT /api/chat-management/undo-remove/:id
 * @access private
 */
exports.removechat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = req.params.id;
    if (!chat_id) {
        res.status(400);
        return next(new Error('Invalid community'));
    }
    const chat = yield chatSchema_1.default.findOneAndUpdate({ _id: chat_id }, { $set: { is_delete: true } }, { new: true });
    if (chat) {
        res.status(200).json({
            status: 'ok',
            message: 'chat deleted undo successfully',
            chat
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for removing community
 * @route PUT /api/chat-management/undo-remove/:id
 * @access private
 */
exports.undoRemovechat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = req.params.id;
    if (!chat_id) {
        res.status(400);
        return next(new Error('Invalid community'));
    }
    const chat = yield chatSchema_1.default.findOneAndUpdate({ _id: chat_id }, { $set: { is_delete: false } }, { new: true });
    if (chat) {
        res.status(200).json({
            status: 'ok',
            message: 'chat deleted undo successfully',
            chat
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
