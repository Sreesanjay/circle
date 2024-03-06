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
exports.dislikeComment = exports.likeComment = exports.deleteComment = exports.getReplyCommemts = exports.getComments = exports.addComment = exports.dislikeDiscussion = exports.likeDiscussion = exports.deleteDiscussion = exports.getRecentDiscussion = exports.getDiscussions = exports.createDiscussion = void 0;
const mongodb_1 = require("mongodb");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import Community from "../models/communitySchema";
const discussionSchema_1 = __importDefault(require("../models/discussionSchema"));
const commentSchema_1 = __importDefault(require("../models/commentSchema"));
// import UserProfile from "../models/userProfile";
const membersSchema_1 = __importDefault(require("../models/membersSchema"));
/**
 * @desc function creating discussion
 * @route POST /api/community/discussions
 * @access private
 */
exports.createDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, community_id, user_id } = req.body;
    if (!content || !community_id || !user_id) {
        res.status(400);
        return next(new Error('Invalid details'));
    }
    const newDiscussion = yield new discussionSchema_1.default(req.body).save();
    if (newDiscussion) {
        const discussion = yield discussionSchema_1.default.aggregate([
            {
                $match: {
                    _id: newDiscussion._id
                }
            },
            {
                $lookup: {
                    from: "userprofiles",
                    localField: 'user_id',
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
                                profile_img: 1,
                                fullname: 1,
                                user_id: 1,
                                verified: 1,
                                email: '$user.email'
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
                }
            }
        ]);
        if (discussion) {
            res.status(200).json({
                status: 'created',
                message: 'new discussion added',
                discussion: discussion[0]
            });
        }
    }
}));
/**
 * @desc function discussions of a community
 * @route GET /api/community/discussions/:id
 * @access private
 */
exports.getDiscussions = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('community not found'));
    }
    const page = (req.query.page && typeof (req.query.page) === "string") ? req.query.page : null;
    const pageSize = 3;
    const query = page ? {
        createdAt: { $lt: new Date(page) }
    } : {};
    const discussions = yield discussionSchema_1.default.aggregate([
        {
            $match: {
                community_id: new mongodb_1.ObjectId(id),
                is_delete: false
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $match: query
        },
        {
            $limit: pageSize
        },
        {
            $lookup: {
                from: "comments",
                localField: '_id',
                foreignField: 'post_id',
                as: "comments",
            }
        },
        {
            $lookup: {
                from: "userprofiles",
                localField: 'user_id',
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
                            profile_img: 1,
                            fullname: 1,
                            user_id: 1,
                            verified: 1,
                            email: '$user.email'
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: '$userProfile'
            }
        },
        {
            $project: {
                _id: 1,
                content: 1,
                user_id: 1,
                likes: 1,
                community_id: 1,
                content_type: 1,
                file_type: 1,
                caption: 1,
                is_delete: 1,
                createdAt: 1,
                userProfile: 1,
                comments: { $size: "$comments" },
            }
        }
    ]);
    if (discussions) {
        res.status(200).json({
            status: 'ok',
            message: 'discussion fetched',
            discussions
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc requst for recent discussions of a community
 * @route GET /api/community/discussions/recent
 * @access private
 */
exports.getRecentDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const page = (req.query.page && typeof (req.query.page) === "string") ? req.query.page : null;
    const pageSize = 3;
    const query = page ? {
        createdAt: { $lt: new Date(page) }
    } : {};
    const community = yield membersSchema_1.default.find({ user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, status: 'active' });
    const communityId = community.map((item) => item.community_id);
    const discussions = yield discussionSchema_1.default.aggregate([
        {
            $match: {
                community_id: { $in: communityId },
                is_delete: false
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $match: query
        },
        {
            $limit: pageSize
        },
        {
            $lookup: {
                from: "comments",
                localField: '_id',
                foreignField: 'post_id',
                as: "comments",
            }
        },
        {
            $lookup: {
                from: "userprofiles",
                localField: 'user_id',
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
                            profile_img: 1,
                            fullname: 1,
                            user_id: 1,
                            verified: 1,
                            email: '$user.email'
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: '$userProfile'
            }
        },
        {
            $project: {
                _id: 1,
                content: 1,
                user_id: 1,
                likes: 1,
                community_id: 1,
                content_type: 1,
                file_type: 1,
                caption: 1,
                is_delete: 1,
                createdAt: 1,
                userProfile: 1,
                comments: { $size: "$comments" },
            }
        }
    ]);
    if (discussions) {
        res.status(200).json({
            status: 'ok',
            message: 'discussion fetched',
            discussions
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc function for deleting a discussions
 * @route DELETE /api/community/discussions/:id
 * @access private
 */
exports.deleteDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('discussion not found'));
    }
    const deletedDiscussion = yield discussionSchema_1.default.findOneAndUpdate({ _id: id }, { $set: { is_delete: true } }, { new: true });
    if (deletedDiscussion) {
        res.status(200).json({
            status: 'ok',
            message: 'discussion deleted',
            deletedDiscussion
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc function for like a discussions
 * @route DELETE /api/community/discussions/like/:id
 * @access private
 */
exports.likeDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('discussion not found'));
    }
    const likedDiscussion = yield discussionSchema_1.default.findOneAndUpdate({ _id: id }, { $addToSet: { likes: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id } }, { new: true });
    if (likedDiscussion) {
        res.status(200).json({
            status: 'ok',
            message: 'discussion liked',
            likedDiscussion
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc function for dislike a discussions
 * @route DELETE /api/community/discussions/dislike/:id
 * @access private
 */
exports.dislikeDiscussion = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('discussion not found'));
    }
    const likedDiscussion = yield discussionSchema_1.default.findOneAndUpdate({ _id: id }, { $pull: { likes: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id } }, { new: true });
    if (likedDiscussion) {
        res.status(200).json({
            status: 'ok',
            message: 'discussion disliked',
            likedDiscussion
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for add commment on a discussions
 * @route POST /api/community/discussions/comment
 * @access private
 */
exports.addComment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { discussion_id } = req.body;
    if (!discussion_id) {
        res.status(400);
        return next(new Error("Invalid discussion"));
    }
    const newComment = yield new commentSchema_1.default({
        user_id: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
        post_id: req.body.discussion_id,
        content: req.body.content
    });
    if (req.body.reply) {
        newComment.reply = req.body.reply;
    }
    const comment = yield newComment.save();
    if (comment) {
        const resComment = yield commentSchema_1.default.aggregate([
            {
                $match: {
                    _id: comment._id
                }
            },
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
                                email: '$email.email'
                            }
                        },
                    ]
                }
            }, {
                $unwind: {
                    path: '$user_details'
                }
            },
        ]);
        res.status(200).json({
            status: 'ok',
            message: 'new Comment added',
            comment: resComment[0]
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for fetching comments of a discussion
 * @route GET /api/community/discussions/comment/:id
 * @access private
 */
exports.getComments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error("Invalid discussion"));
    }
    const comments = yield commentSchema_1.default.aggregate([
        {
            $match: {
                post_id: new mongodb_1.ObjectId(id)
            }
        },
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
                            email: '$email.email'
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: '$user_details'
            }
        },
    ]);
    if (comments) {
        res.status(200).json({
            status: 'ok',
            message: 'comments fetched',
            comment: comments
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for fetching replyies of comment
 * @route GET /api/community/discussions/comment/reply/:id
 * @access private
 */
exports.getReplyCommemts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error("Invalid comment"));
    }
    const comments = yield commentSchema_1.default.aggregate([
        {
            $match: {
                reply: new mongodb_1.ObjectId(id)
            }
        },
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
                            email: '$email.email'
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: '$user_details'
            }
        },
    ]);
    if (comments) {
        res.status(200).json({
            status: 'ok',
            message: 'reply comment fetched',
            comment: comments
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for add commment on a discussions
 * @route DELETE /api/community/discussions/comment
 * @access private
 */
exports.deleteComment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error("Invalid comment"));
    }
    const deletedComment = yield commentSchema_1.default.findOneAndDelete({ _id: id });
    if (deletedComment) {
        res.status(200).json({
            status: 'ok',
            message: 'comment deleted',
            deletedComment
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for add like on comment
 * @route PUT /api/community/discussions/comment/like/:id
 * @access private
 */
exports.likeComment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error("Invalid comment"));
    }
    const comment = yield commentSchema_1.default.findOneAndUpdate({ _id: id }, { $addToSet: { likes: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id } }, { new: true });
    if (comment) {
        res.status(200).json({
            status: 'ok',
            message: 'comment liked',
            comment
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for  dislike on comment
 * @route PUT /api/community/discussions/comment/dislike/:id
 * @access private
 */
exports.dislikeComment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error("Invalid comment"));
    }
    const comment = yield commentSchema_1.default.findOneAndUpdate({ _id: id }, { $pull: { likes: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id } }, { new: true });
    if (comment) {
        res.status(200).json({
            status: 'ok',
            message: 'comment disliked',
            comment
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
