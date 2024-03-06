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
exports.deleteMessage = exports.readMessage = exports.getMessages = exports.addMessage = void 0;
const mongodb_1 = require("mongodb");
const messageSchema_1 = __importDefault(require("../models/messageSchema"));
const chatSchema_1 = __importDefault(require("../models/chatSchema"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @desc request for creating new message
 * @route POST /api/message
 * @access private
 */
exports.addMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const chat_id = req.body.chat_id;
    const chat = yield chatSchema_1.default.findById(chat_id);
    if (!chat) {
        res.status(400);
        return next(new Error('Chat not found'));
    }
    if (!req.body.sender_id)
        req.body.sender_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const message = new messageSchema_1.default(Object.assign(Object.assign({}, req.body), { delivered_to: chat.members }));
    const newMessage = yield message.save();
    const userProfile = yield userProfile_1.default.findOne({ user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
    if (newMessage && userProfile) {
        res.status(201).json({
            status: 'created',
            message: 'new message added',
            newMessage: {
                userDetails: {
                    username: userProfile.username,
                    email: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
                    fullname: userProfile.fullname,
                    profile_img: userProfile.profile_img
                },
                _id: newMessage._id,
                chat_id: newMessage.chat_id,
                sender_id: newMessage.sender_id,
                content: newMessage.content,
                content_type: newMessage.content_type,
                file_type: newMessage.file_type,
                read_by: newMessage.read_by,
                reply_to: newMessage.reply_to,
                is_delete: newMessage.is_delete
            }
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for getting all the messages in a chat
 * @route POST /api/message/:id
 * @access private
 */
exports.getMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const chat_id = req.params.chat_id;
    if (!chat_id) {
        res.status(400);
        return next(new Error('Chat not found'));
    }
    const page = (req.query.page && typeof req.query.page === 'string') ? req.query.page : null;
    const query = page ? {
        chat_id: new mongodb_1.ObjectId(chat_id),
        createdAt: { $lt: new Date(page) },
        delivered_to: {
            $elemMatch: {
                $eq: new mongodb_1.ObjectId((_d = req.user) === null || _d === void 0 ? void 0 : _d._id)
            }
        }
    } : {
        chat_id: new mongodb_1.ObjectId(chat_id),
        delivered_to: {
            $elemMatch: {
                $eq: new mongodb_1.ObjectId((_e = req.user) === null || _e === void 0 ? void 0 : _e._id)
            }
        }
    };
    const messages = yield messageSchema_1.default.aggregate([
        {
            $sort: { createdAt: -1 }
        },
        {
            $match: query
        },
        {
            $limit: 10
        },
        {
            $sort: { createdAt: 1 }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'sender_id',
                foreignField: 'user_id',
                as: 'userDetails',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'user',
                        }
                    }, {
                        $unwind: { path: '$user' }
                    }, {
                        $project: {
                            _id: 0,
                            email: '$user.email',
                            username: 1,
                            fullname: 1,
                            profile_img: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: { path: '$userDetails' }
        }
    ]);
    if (messages) {
        res.status(200).json({
            status: "ok",
            message: 'messages fetched',
            messages
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for getting all the messages in a chat
 * @route PUT /api/message/read/:id
 * @access private
 */
exports.readMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const message_id = req.params.id;
    if (!message_id) {
        res.status(400);
        return next(new Error('message_id not found'));
    }
    const messages = yield messageSchema_1.default.findByIdAndUpdate(message_id, { $addToSet: { read_by: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id } }, { new: true });
    if (messages) {
        res.status(200).json({
            status: "ok",
            message: 'message read added',
            messages
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for deleting message
 * @route DELETE /api/message/:id
 * @access private
 */
exports.deleteMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message_id = req.params.id;
    if (!message_id) {
        res.status(400);
        return next(new Error('message not found'));
    }
    const messages = yield messageSchema_1.default.findByIdAndUpdate(message_id, { $set: { is_delete: true } }, { new: true });
    if (messages) {
        res.status(200).json({
            status: "ok",
            message: 'message deleted successfully',
            messages
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
