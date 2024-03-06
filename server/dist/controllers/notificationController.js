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
exports.readNotificaiton = exports.getUnreadNotifications = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
/**
 * @desc req for fetching all unread notifications
 * @route GET /api/notifications
 * @access private
 */
exports.getUnreadNotifications = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const notifications = yield notificationSchema_1.default.aggregate([
        {
            $match: {
                user_id: new mongodb_1.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id),
                is_read: false
            }
        },
        {
            $lookup: {
                from: "userprofiles",
                localField: 'sender_id',
                foreignField: 'user_id',
                as: 'userProfile',
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'user',
                        }
                    },
                    {
                        $unwind: {
                            path: '$user'
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            profile_img: 1,
                            email: '$user.email'
                        }
                    }
                ]
            }
        }, {
            $unwind: {
                path: '$userProfile'
            }
        }
    ]);
    if (notifications) {
        res.status(200).json({
            status: 'ok',
            message: 'fetched all unread notifications',
            notifications
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc req for fetching all unread notifications
 * @route GET /api/notifications/:id
 * @access private
 */
exports.readNotificaiton = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        return next(new Error("Notification not found"));
    }
    const notifications = yield notificationSchema_1.default.findOneAndUpdate({ _id: id }, { $set: { is_read: true } }, { new: true });
    if (notifications) {
        res.status(200).json({
            status: 'ok',
            message: 'fetched all unread notifications',
            notifications
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
