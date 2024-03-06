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
exports.isBlocked = exports.removeMember = exports.addMember = exports.updateGroupIcon = exports.updateChatName = exports.getPersonalChat = exports.userChats = exports.createGroup = exports.createChat = void 0;
const chatSchema_1 = __importDefault(require("../models/chatSchema"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongodb_1 = require("mongodb");
const userProfile_1 = __importDefault(require("../models/userProfile"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @desc request for creating new chat
 * @route POST /api/chat
 * @access private
 */
exports.createChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { user_id } = req.body;
    if (!user_id) {
        res.status(400);
        return next('user not found');
    }
    const exist = yield chatSchema_1.default.findOne({ members: { $all: [user_id, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id] }, is_groupchat: false });
    if (exist) {
        res.status(200).json({
            status: 'ok',
            message: 'chat already exists',
            chat: exist
        });
        return;
    }
    const user = yield userProfile_1.default.findOne({ user_id: user_id });
    if (!user) {
        return next('Internal server error');
    }
    const newChat = new chatSchema_1.default({
        members: [(_b = req.user) === null || _b === void 0 ? void 0 : _b._id, user_id]
    });
    const chat = yield newChat.save();
    if (chat) {
        res.status(201).json({
            status: 'created',
            message: 'New chat created',
            chat
        });
    }
}));
/**
 * @desc request for creating new group
 * @route POST /api/chat/group
 * @access private
 */
exports.createGroup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    if (req.body.members.length < 1) {
        res.status(400);
        return next(new Error('Minimum two members required'));
    }
    const newChat = new chatSchema_1.default({
        members: [...req.body.members, (_c = req.user) === null || _c === void 0 ? void 0 : _c._id],
        chat_name: req.body.chat_name,
        is_groupchat: true,
        admins: [(_d = req.user) === null || _d === void 0 ? void 0 : _d._id]
    });
    const chat = yield newChat.save();
    if (chat) {
        res.status(201).json({
            status: 'created',
            message: 'New chat created',
            chat
        });
    }
}));
/**
 * @desc request for fetching all chats of user
 * @route GET /api/chat
 * @access private
 */
exports.userChats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const chats = yield chatSchema_1.default.aggregate([
        {
            $match: {
                $or: [
                    {
                        members: {
                            $elemMatch: {
                                $eq: new mongodb_1.ObjectId((_e = req.user) === null || _e === void 0 ? void 0 : _e._id)
                            }
                        }
                    },
                    {
                        removed_members: {
                            $elemMatch: {
                                $eq: new mongodb_1.ObjectId((_f = req.user) === null || _f === void 0 ? void 0 : _f._id)
                            }
                        }
                    }
                ],
                is_delete: false
            }
        },
        {
            $lookup: {
                from: "messages",
                localField: '_id',
                foreignField: 'chat_id',
                as: 'latest_message',
                pipeline: [
                    {
                        $match: {
                            delivered_to: {
                                $elemMatch: {
                                    $eq: new mongodb_1.ObjectId((_g = req.user) === null || _g === void 0 ? void 0 : _g._id)
                                }
                            }
                        }
                    },
                    {
                        $sort: { createdAt: -1 }
                    },
                ]
            }
        },
        {
            $addFields: {
                latest_message: { $arrayElemAt: ["$latest_message", 0] }
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'latest_message.sender_id',
                foreignField: 'user_id',
                as: 'latest_message.userDetails',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            profile_img: 1,
                            fullname: 1,
                            user_id: 1,
                            verified: 1,
                            _id: 0
                        }
                    }
                ],
            }
        },
        {
            $unwind: { path: '$latest_message.userDetails', preserveNullAndEmptyArrays: true }
        },
    ]);
    if (chats) {
        res.status(200).json({
            status: 'ok',
            message: 'all chats fetched',
            chats
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for fetching all chats of user
 * @route GET /api/chat/get-chat
 * @access private
 */
exports.getPersonalChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k;
    const user_id = req.params.id;
    const chats = yield chatSchema_1.default.aggregate([
        {
            $match: {
                members: {
                    $all: [new mongodb_1.ObjectId(user_id), new mongodb_1.ObjectId((_h = req.user) === null || _h === void 0 ? void 0 : _h._id)]
                },
                is_groupchat: false,
                is_delete: false
            },
        },
        {
            $lookup: {
                from: "messages",
                localField: '_id',
                foreignField: 'chat_id',
                as: 'latest_message',
                pipeline: [
                    {
                        $match: {
                            delivered_to: {
                                $elemMatch: {
                                    $eq: new mongodb_1.ObjectId((_j = req.user) === null || _j === void 0 ? void 0 : _j._id)
                                }
                            }
                        }
                    },
                    {
                        $sort: { createdAt: -1 }
                    },
                ]
            }
        },
        {
            $addFields: {
                latest_message: { $arrayElemAt: ["$latest_message", 0] }
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'latest_message.sender_id',
                foreignField: 'user_id',
                as: 'latest_message.userDetails',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            profile_img: 1,
                            fullname: 1,
                            user_id: 1,
                            verified: 1,
                            _id: 0
                        }
                    }
                ],
            }
        },
        {
            $unwind: { path: '$latest_message.userDetails', preserveNullAndEmptyArrays: true }
        },
    ]);
    if (chats.length) {
        res.status(200).json({
            status: 'ok',
            message: 'all chats fetched',
            chat: chats[0]
        });
        return;
    }
    else {
        const newChat = new chatSchema_1.default({
            members: [(_k = req.user) === null || _k === void 0 ? void 0 : _k._id, user_id]
        });
        const chat = yield newChat.save();
        if (chat) {
            res.status(200).json({
                status: 'ok',
                message: 'all chats fetched',
                chat
            });
        }
        else {
            next(new Error('chat creation failed'));
        }
    }
}));
/**
 * @desc request for updating chat name (group admin)
 * @route PUT /api/chat/chat_name/:id
 * @access private
 */
exports.updateChatName = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = req.params.id;
    if (!chat_id) {
        res.status(400);
        return next(new Error('chat not found'));
    }
    const chat = yield chatSchema_1.default.findByIdAndUpdate(chat_id, { $set: { chat_name: req.body.chat_name } }, { new: true });
    if (chat) {
        res.status(200).json({
            status: 'ok',
            message: 'Chat updated successfully',
            chat
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc request for updating group icon
 * @route PUT /api/chat/iocn/:id
 * @access private
 */
exports.updateGroupIcon = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = req.params.id;
    if (!chat_id) {
        res.status(400);
        return next(new Error('chat not found'));
    }
    const chat = yield chatSchema_1.default.findByIdAndUpdate(chat_id, { $set: { icon: req.body.icon } }, { new: true });
    if (chat) {
        res.status(200).json({
            status: 'ok',
            message: 'Chat updated successfully',
            chat
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc request for adding a new member (group admin)
 * @route PUT /api/chat/members/:id
 * @access private
 */
exports.addMember = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = req.params.id;
    const { user } = req.body;
    if (!chat_id || !user) {
        res.status(400);
        return next(new Error('Internal error'));
    }
    const chat = yield chatSchema_1.default.findByIdAndUpdate(chat_id, { $addToSet: { members: user }, $pull: { removed_members: user } }, { new: true });
    if (chat) {
        res.status(200).json({
            status: 'ok',
            message: 'Chat updated successfully',
            chat
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc request for removing a member (group admin)
 * @route PUT /api/chat/members/remove/:id
 * @access private
 */
exports.removeMember = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = req.params.id;
    const { user } = req.body;
    if (!chat_id || !user) {
        res.status(400);
        return next(new Error('Internal error'));
    }
    const existChat = yield chatSchema_1.default.findById(chat_id);
    if (existChat && existChat.admins.includes(user) && existChat.admins.length === 1 && existChat.members.length > 1) {
        yield chatSchema_1.default.findByIdAndUpdate(chat_id, { $push: { admins: existChat.members[1] } });
    }
    const chat = yield chatSchema_1.default.findByIdAndUpdate(chat_id, { $addToSet: { removed_members: user }, $pull: { members: user, admins: user } }, { new: true });
    if (chat) {
        res.status(200).json({
            status: 'ok',
            message: 'Chat updated successfully',
            chat
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc request for checking whether the user is blocked or not
 * @route GET /api/chat/members/is-blocked/:id
 * @access private
 */
exports.isBlocked = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    const user = req.params.id;
    if (!user) {
        res.status(400);
        return next(new Error('Invalid user'));
    }
    const youBlocked = yield userModel_1.default.findOne({ _id: (_l = req.user) === null || _l === void 0 ? void 0 : _l._id, blocked_users: { $elemMatch: { $eq: user } } });
    const theyBlocked = yield userModel_1.default.findOne({ _id: user, blocked_users: { $elemMatch: { $eq: (_m = req.user) === null || _m === void 0 ? void 0 : _m._id } } });
    if (youBlocked) {
        res.status(200).json({
            status: 'ok',
            message: 'is Blocked fetched',
            blocked: 'You blocked this user'
        });
    }
    else if (theyBlocked) {
        res.status(200).json({
            status: 'ok',
            message: 'is Blocked fetched',
            blocked: 'You were blocked by this user'
        });
    }
    else {
        res.status(200).json({
            status: 'ok',
            message: 'is Blocked fetched'
        });
    }
}));
