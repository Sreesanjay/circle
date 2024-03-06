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
exports.deleteStory = exports.getUserList = exports.dislikeStory = exports.likeStory = exports.viewStory = exports.getStories = exports.getMyStory = exports.addStory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const storySchema_1 = __importDefault(require("../models/storySchema"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const connectionSchema_1 = __importDefault(require("../models/connectionSchema"));
/**
 * @desc function for adding new story
 * @route POST /api/story
 * @access private
 */
exports.addStory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { story_type, content, visibility, background, color } = req.body;
    if (!story_type || !content || !visibility) {
        res.status(400);
        return next(Error("Invalid credentials"));
    }
    const newStory = new storySchema_1.default(Object.assign(Object.assign({ story_type, content, visibility, user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, (background && { background })), (color && { color })));
    const story = yield newStory.save();
    if (story) {
        res.status(201).json({
            status: 'created',
            message: "New Story uploaded",
            story
        });
    }
    else {
        next(Error("Server error"));
    }
}));
/**
 * @desc function for fetching my story
 * @route GET /api/story
 * @access private
 */
exports.getMyStory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    const story = yield storySchema_1.default.find({ user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id, "createdAt": { $gte: twentyFourHoursAgo } });
    if (story) {
        res.status(200).json({
            status: 'OK',
            message: "my stories fetched",
            story
        });
    }
    else {
        next(Error("Server Error"));
    }
}));
/**
 * @desc function for fetching my story
 * @route GET /api/story/all-stories
 * @access private
 */
exports.getStories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const connection = yield connectionSchema_1.default.find({ following: { $in: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id } }, { _id: 0, user_id: 1 });
    const close_friend = yield connectionSchema_1.default.find({ close_friend: { $in: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id } }, { _id: 0, user_id: 1 });
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
    const story = yield storySchema_1.default.aggregate([
        {
            $match: {
                user_id: {
                    $in: connection.map(item => item.user_id)
                },
                createdAt: { $gte: twentyFourHoursAgo }
            }
        },
        {
            $match: {
                $or: [
                    { "visibility": { $ne: "CLOSE_FRIENDS" } }, // Include stories with other visibility types
                    {
                        $and: [
                            { "visibility": "CLOSE_FRIENDS" },
                            { "user_id": { $in: close_friend.map(item => item.user_id) } }
                        ]
                    }
                ]
            }
        },
        {
            $sort: {
                createdAt: 1
            }
        },
        {
            $group: {
                _id: '$user_id',
                stories: {
                    $push: '$$ROOT'
                },
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: '_id',
                foreignField: 'user_id',
                as: 'user_details',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'email',
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
                            path: '$email'
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            profile_img: 1,
                            email: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: '$user_details'
            }
        },
    ]);
    if (story) {
        res.status(200).json({
            status: 'OK',
            message: "stories fetched",
            story
        });
    }
    else {
        next(Error("Server Error"));
    }
}));
/**
 * @desc function for adding view to a story
 * @route PUT /api/story/view-story
 * @access private
 */
exports.viewStory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = req.params.id;
    const exist = yield storySchema_1.default.findById(id);
    if (!exist) {
        res.status(400);
        return next(new Error('Story not found'));
    }
    const story = yield storySchema_1.default.findOneAndUpdate({ _id: id }, { $addToSet: { story_viewers: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id } }, { new: true });
    if (story) {
        res.status(200).json({
            status: 'ok',
            message: 'story viewers updated',
            story
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc function for adding view to a story
 * @route PUT /api/story/like-story/:id
 * @access private
 */
exports.likeStory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const id = req.params.id;
    const exist = yield storySchema_1.default.findById(id);
    if (!exist) {
        res.status(400);
        return next(new Error('Story not found'));
    }
    const story = yield storySchema_1.default.findOneAndUpdate({ _id: id }, { $addToSet: { likes: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id } }, { new: true });
    if (story) {
        res.status(200).json({
            status: 'ok',
            message: 'like added',
            story
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc function for adding view to a story
 * @route PUT /api/story/like-story/:id
 * @access private
 */
exports.dislikeStory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const id = req.params.id;
    const exist = yield storySchema_1.default.findById(id);
    if (!exist) {
        res.status(400);
        return next(new Error('Story not found'));
    }
    const story = yield storySchema_1.default.findOneAndUpdate({ _id: id }, { $pull: { likes: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id } }, { new: true });
    if (story) {
        res.status(200).json({
            status: 'ok',
            message: 'dislike added',
            story
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc function for getting story viewers
 * @route PUT /api/story/get-viewers-list/:id
 * @access private
 */
exports.getUserList = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const exist = yield storySchema_1.default.findById(id);
    if (!exist) {
        res.status(400);
        return next(new Error('Story not found'));
    }
    const userList = yield userProfile_1.default.aggregate([
        {
            $match: { user_id: { $in: exist.story_viewers } },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'email',
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
                path: '$email'
            }
        }
    ]);
    if (userList) {
        res.status(200).json({
            status: 'ok',
            message: 'dislike added',
            userList
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc function for deleting story
 * @route DELETE /api/story/:id
 * @access private
 */
exports.deleteStory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedStory = yield storySchema_1.default.findOneAndDelete({ _id: id }, { new: true });
    if (deletedStory) {
        res.status(200).json({
            status: 'ok',
            message: 'story deleted',
            story_id: id
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
