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
exports.likedUserList = exports.editPost = exports.deletePost = exports.unsavePost = exports.savePost = exports.disLike = exports.addLike = exports.getReplys = exports.getComments = exports.postComment = exports.getPosts = exports.uploadPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
const postSchema_1 = __importDefault(require("../models/postSchema"));
const connectionSchema_1 = __importDefault(require("../models/connectionSchema"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const mongodb_1 = require("mongodb");
const boostedPostSchema_1 = __importDefault(require("../models/boostedPostSchema"));
const commentSchema_1 = __importDefault(require("../models/commentSchema"));
const savedPost_1 = __importDefault(require("../models/savedPost"));
/**
 * @desc function for uploading post
 * @route POST /api/posts
 * @access private
 */
exports.uploadPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.body) {
        return next(new Error('Internal Server Error'));
    }
    const newpost = new postSchema_1.default(Object.assign(Object.assign({}, req.body), { user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
    const post = yield newpost.save();
    const newPost = yield postSchema_1.default.aggregate([
        {
            $match: {
                _id: post._id
            }
        },
        {
            $lookup: {
                from: "savedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_saved",
                pipeline: [
                    {
                        $match: {
                            user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id
                        }
                    },
                    {
                        $project: {
                            user_id: 0,
                            post_id: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post_id',
                as: 'comments'
            }
        },
        {
            $project: {
                user_id: 1,
                is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                user_details: 1,
                comment: { $size: "$comments" },
                type: 1,
                content: 1,
                caption: 1,
                tags: 1,
                visibility: 1,
                impressions: 1,
                profile_visit: 1,
                createdAt: 1,
                likes: 1
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: "user_details",
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
                            email: 1
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: "$user_details"
            }
        }
    ]);
    if (post) {
        res.status(201).json({
            status: 'created',
            message: 'new post was created',
            post: newPost[0]
        });
    }
    else {
        next(new Error('Internal Server Error'));
    }
}));
/**
 * @desc function for fetching posts
 * @route GET /api/posts
 * @access private
 */
exports.getPosts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g, _h, _j;
    const page = (req.query.page && typeof (req.query.page) === "string") ? req.query.page : null;
    const pageSize = 3;
    const interest = yield userProfile_1.default.findOne({ user_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id });
    const connection = yield connectionSchema_1.default.findOne({ user_id: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id });
    const following = (connection === null || connection === void 0 ? void 0 : connection.following) || [];
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const query = page ? {
        createdAt: { $lt: new Date(page) }
    } : {};
    const posts = yield postSchema_1.default.aggregate([
        {
            $match: {
                $or: [
                    { user_id: { $in: [...following, userId].filter(Boolean) } },
                    { tags: { $in: (interest === null || interest === void 0 ? void 0 : interest.interest) || [] } }
                ],
                is_archive: false,
                is_delete: false,
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
                from: "savedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_saved",
                pipeline: [
                    {
                        $match: {
                            user_id: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id
                        }
                    },
                    {
                        $project: {
                            user_id: 0,
                            post_id: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "boostedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_boosted",
                pipeline: [
                    {
                        $match: {
                            endingDate: { $gt: new Date() }
                        }
                    }
                ]
            }
        },
        { $unwind: { path: "$is_boosted", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post_id',
                as: 'comments'
            }
        },
        {
            $project: {
                user_id: 1,
                is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                comment: { $size: "$comments" },
                type: 1,
                clicks: 1,
                content: 1,
                caption: 1,
                tags: 1,
                visibility: 1,
                is_boosted: 1,
                impressions: 1,
                createdAt: 1,
                likes: 1
            }
        }, {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: "user_details",
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
                        $lookup: {
                            from: 'verifications',
                            localField: 'user_id',
                            foreignField: 'user_id',
                            as: 'verified',
                            pipeline: [
                                {
                                    $match: {
                                        endingDate: { $gt: new Date() }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            profile_img: 1,
                            email: 1,
                            verified: { $cond: { if: { $gt: [{ $size: "$verified" }, 0] }, then: true, else: false } },
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: "$user_details"
            }
        }
    ]);
    const boosted = yield boostedPostSchema_1.default.aggregate([
        {
            $match: {
                endingDate: { $gt: new Date() }
            }
        },
        { $sample: { size: 1 } }
    ]);
    const add = yield postSchema_1.default.aggregate([
        {
            $match: {
                _id: (_g = boosted[0]) === null || _g === void 0 ? void 0 : _g.post_id
            }
        },
        {
            $lookup: {
                from: "savedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_saved",
                pipeline: [
                    {
                        $match: {
                            user_id: (_h = req.user) === null || _h === void 0 ? void 0 : _h._id
                        }
                    },
                    {
                        $project: {
                            user_id: 0,
                            post_id: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "boostedposts",
                localField: '_id',
                foreignField: 'post_id',
                as: "is_boosted",
                pipeline: [
                    {
                        $match: {
                            endingDate: { $gt: new Date() }
                        }
                    }
                ]
            }
        },
        { $unwind: { path: "$is_boosted", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post_id',
                as: 'comments'
            }
        },
        {
            $project: {
                user_id: 1,
                is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                comment: { $size: "$comments" },
                type: 1,
                clicks: 1,
                content: 1,
                caption: 1,
                tags: 1,
                visibility: 1,
                is_boosted: 1,
                impressions: 1,
                createdAt: 1,
                likes: 1
            }
        },
        {
            $match: {
                $or: [
                    { user_id: userId },
                    { tags: { $in: (interest === null || interest === void 0 ? void 0 : interest.interest) || [] } }
                ],
            }
        }, {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: "user_details",
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
                    }, {
                        $lookup: {
                            from: 'verifications',
                            localField: 'user_id',
                            foreignField: 'user_id',
                            as: 'verified',
                            pipeline: [
                                {
                                    $match: {
                                        endingDate: { $gt: new Date() }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            profile_img: 1,
                            email: 1,
                            verified: { $cond: { if: { $gt: [{ $size: "$verified" }, 0] }, then: true, else: false } },
                        }
                    },
                ]
            }
        }, {
            $unwind: {
                path: "$user_details"
            }
        },
    ]);
    if (add[0]) {
        posts.push(add[0]);
    }
    if (posts) {
        if (posts.length) {
            const postIds = posts.map(post => post === null || post === void 0 ? void 0 : post._id);
            yield postSchema_1.default.updateMany({ _id: { $in: postIds } }, { $addToSet: { impressions: (_j = req.user) === null || _j === void 0 ? void 0 : _j._id } });
        }
        res.status(200).json({
            status: 'ok',
            message: 'Posts fetched successfully',
            posts
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
* @desc function for posting comment
* @route POST /api/posts/comment
* @access private
*/
exports.postComment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    const { post_id, reply, content } = req.body;
    const post = yield postSchema_1.default.findById(post_id);
    if (!post) {
        res.status(400);
        return next({ msg: "Post does not exist." });
    }
    if (reply) {
        const cm = yield commentSchema_1.default.findById(reply);
        if (!cm) {
            res.status(400);
            return next({ msg: "Comment does not exist." });
        }
    }
    const newComment = new commentSchema_1.default({
        user_id: (_k = req.user) === null || _k === void 0 ? void 0 : _k._id,
        content,
        reply,
        post_id
    });
    const comment = yield newComment.save();
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
                            email: 1
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
    if (newComment) {
        const commentedUser = yield userProfile_1.default.findOne({ user_id: (_l = req.user) === null || _l === void 0 ? void 0 : _l._id });
        const newMessage = new notificationSchema_1.default({
            user_id: post.user_id,
            sender_id: (_m = req.user) === null || _m === void 0 ? void 0 : _m._id,
            message: `${commentedUser === null || commentedUser === void 0 ? void 0 : commentedUser.username} commented on your post`
        });
        newMessage.save();
        res.status(201).json({
            status: 'created',
            message: 'Comment added',
            newComment: resComment[0]
        });
    }
    else {
        next("Internal server error");
    }
}));
/**
* @desc function for posting comment
* @route GET /api/posts/comment/:id
* @access private
*/
exports.getComments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        return next(new Error('Comment not found'));
    }
    const comments = yield commentSchema_1.default.aggregate([
        {
            $match: {
                post_id: new mongodb_1.ObjectId(id),
                reply: { $exists: false }
            }
        },
        {
            $sort: {
                createdAt: -1
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
                            email: 1
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
            comments
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for posting comment
* @route GET /api/posts/comment/replys/:id
* @access private
*/
exports.getReplys = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        return next(new Error('Comment not found'));
    }
    const replys = yield commentSchema_1.default.aggregate([
        {
            $match: {
                reply: new mongodb_1.ObjectId(id),
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
                            email: 1
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
    if (replys) {
        res.status(200).json({
            status: 'ok',
            message: 'replys fetched',
            replys
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for adding like
* @route GET /api/posts/like/:id
* @access private
*/
exports.addLike = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r;
    const id = req.params.id;
    if (!id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const post = yield postSchema_1.default.findOneAndUpdate({ _id: id }, { $push: { likes: (_o = req.user) === null || _o === void 0 ? void 0 : _o._id } }, { new: true });
    if (post) {
        const user = yield userProfile_1.default.findOne({ user_id: (_p = req.user) === null || _p === void 0 ? void 0 : _p._id });
        const newMessage = new notificationSchema_1.default({
            user_id: post.user_id,
            sender_id: (_q = req.user) === null || _q === void 0 ? void 0 : _q._id,
            message: `${user === null || user === void 0 ? void 0 : user.username} liked your post`
        });
        newMessage.save();
        res.status(200).json({
            status: 'ok',
            message: 'replys fetched',
            post,
            user_id: (_r = req.user) === null || _r === void 0 ? void 0 : _r._id
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for adding like
* @route GET /api/posts/dislike/:id
* @access private
*/
exports.disLike = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t;
    const id = req.params.id;
    if (!id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const post = yield postSchema_1.default.findOneAndUpdate({ _id: id }, { $pull: { likes: (_s = req.user) === null || _s === void 0 ? void 0 : _s._id } }, { new: true });
    if (post) {
        res.status(200).json({
            status: 'ok',
            message: 'replys fetched',
            post,
            user_id: (_t = req.user) === null || _t === void 0 ? void 0 : _t._id
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for saving post
* @route POST /api/posts/save
* @access private
*/
exports.savePost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _u;
    const post_id = req.body.post_id;
    if (!post_id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const data = new savedPost_1.default({
        user_id: (_u = req.user) === null || _u === void 0 ? void 0 : _u._id,
        post_id: post_id
    });
    const saved = yield data.save();
    if (saved) {
        res.status(200).json({
            status: 'ok',
            message: 'post saved',
            saved,
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for saving post
* @route PUT /api/posts/unsave
* @access private
*/
exports.unsavePost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _v;
    const post_id = req.params.id;
    if (!post_id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const unsaved = yield savedPost_1.default.findOneAndDelete({ post_id: post_id, user_id: (_v = req.user) === null || _v === void 0 ? void 0 : _v._id });
    if (unsaved) {
        res.status(200).json({
            status: 'ok',
            message: 'post saved',
            unsaved,
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for deleting post
* @route DELETE /api/posts/:id
* @access private
*/
exports.deletePost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.id;
    if (!post_id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const deleted = yield postSchema_1.default.findOneAndUpdate({ _id: post_id }, { $set: { is_delete: true } }, { new: true });
    if (deleted) {
        res.status(200).json({
            status: 'ok',
            message: 'post deleted',
            post_id,
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for editing post
* @route PUT /api/posts/:id
* @access private
*/
exports.editPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.id;
    const { caption, visibility, tags } = req.body;
    if (!post_id) {
        res.status(400);
        return next(new Error('post not not found'));
    }
    const post = yield postSchema_1.default.findOneAndUpdate({ _id: post_id }, { $set: { caption, visibility, tags } }, { new: true });
    if (post) {
        res.status(200).json({
            status: 'ok',
            message: 'post deleted',
            post,
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
* @desc function for fetching liked users list
* @route PUT /api/posts/liked-user-list/:id
* @access private
*/
exports.likedUserList = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post_id = req.params.id;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 0;
    const searchKey = req.query.search;
    const post = yield postSchema_1.default.findById(post_id);
    const userIds = post === null || post === void 0 ? void 0 : post.likes.map(like => like);
    const userProfile = yield userProfile_1.default.find({ user_id: { $in: userIds } }).populate({
        path: 'user_id',
        select: ['username', 'fullname', 'profile_img', 'email']
    });
    const userDetails = userProfile.map((user) => {
        return {
            username: user.username,
            fullname: user.fullname,
            profile_img: user.profile_img,
            user_id: user.user_id._id,
            email: user.user_id.email
        };
    });
    if (userDetails) {
        let userList = userDetails === null || userDetails === void 0 ? void 0 : userDetails.filter((item) => {
            var _a;
            return searchKey === ""
                ? item
                : item.username
                    .toLowerCase()
                    .includes(searchKey) ||
                    ((_a = item.fullname) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchKey));
        });
        userList = userList.slice(page, page + 10);
        res.status(200).json({
            status: 'ok',
            message: 'followers details fetched',
            userList
        });
    }
    else {
        next(new Error("Server error"));
    }
}));
