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
exports.getMembers = exports.searchUser = exports.addReport = exports.unblockUser = exports.blockUser = exports.getProfile = exports.removeCloseFriend = exports.addCloseFriend = exports.getFollowingWithoutCloseFriends = exports.getCloseFriends = exports.getFollowers = exports.getFollowing = exports.unFollow = exports.addFriend = exports.getUserList = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const userModel_1 = __importDefault(require("../models/userModel"));
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
const connectionSchema_1 = __importDefault(require("../models/connectionSchema"));
const mongodb_1 = require("mongodb");
const reportSchema_1 = __importDefault(require("../models/reportSchema"));
/**
 * @desc function for fetching friend suggestions
 * @route GET /api/users
 * @access private
 */
exports.getUserList = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const userProfile = yield userProfile_1.default.findOne({ user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const user = yield userModel_1.default.findOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
    if (!userProfile) {
        return next(Error("Internal error"));
    }
    if (userProfile) {
        const connection = yield connectionSchema_1.default.findOne({ user_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id });
        const interests = userProfile.interest;
        let suggestion = yield userProfile_1.default.aggregate([
            { $match: { interest: { $in: interests }, user_id: { $ne: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id, $nin: user === null || user === void 0 ? void 0 : user.blocked_users } } },
            {
                $lookup: {
                    from: "connections",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "connection"
                }
            },
            {
                $match: {
                    user_id: { $nin: connection && (connection === null || connection === void 0 ? void 0 : connection.following) }
                }
            },
            {
                $unwind: {
                    path: '$connection'
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                $match: {
                    "user.is_blocked": false
                }
            },
            {
                $project: {
                    user_id: 1,
                    username: 1,
                    profile_img: 1,
                    verified: 1,
                    email: '$user.email',
                    following: { $size: '$connection.following' }
                }
            },
            { $sample: { size: 10 } },
            {
                $addFields: {
                    "followed": false
                }
            }
        ]);
        suggestion = yield Promise.all(suggestion.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const followers = yield connectionSchema_1.default.countDocuments({
                following: new mongodb_1.ObjectId(user.user_id),
            });
            user.followers = followers;
            return user;
        })));
        let userList = yield userProfile_1.default.aggregate([
            { $match: { user_id: { $ne: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id, $nin: user === null || user === void 0 ? void 0 : user.blocked_users } } },
            {
                $lookup: {
                    from: "connections",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "connection"
                }
            },
            {
                $match: {
                    user_id: { $not: { $in: connection && (connection === null || connection === void 0 ? void 0 : connection.following) } }
                }
            },
            {
                $unwind: {
                    path: '$connection'
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                $match: {
                    "user.is_blocked": false
                }
            },
            {
                $project: {
                    user_id: 1,
                    username: 1,
                    profile_img: 1,
                    verified: 1,
                    email: '$user.email',
                    following: { $size: '$connection.following' }
                }
            },
            { $sample: { size: 20 } },
            {
                $addFields: {
                    "followed": false
                }
            }
        ]);
        userList = yield Promise.all(userList.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const followers = yield connectionSchema_1.default.countDocuments({
                following: new mongodb_1.ObjectId(user.user_id),
            });
            user.followers = followers;
            return user;
        })));
        res.status(200).json({
            status: "ok",
            message: "user list fetched",
            suggestion,
            userList
        });
    }
    else {
        next(new Error('Internal Error'));
    }
}));
/**
 * @desc function for adding friend
 * @route POST /api/users
 * @access private
 */
exports.addFriend = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    const { id } = req.body;
    const connection = yield connectionSchema_1.default.findOneAndUpdate({ user_id: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id }, { $addToSet: { following: new mongodb_1.ObjectId(id) } }, { upsert: true, new: true });
    if (connection) {
        const followedUser = yield userProfile_1.default.findOne({ user_id: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id });
        const newMessage = new notificationSchema_1.default({
            user_id: id,
            sender_id: (_h = req.user) === null || _h === void 0 ? void 0 : _h._id,
            message: `${followedUser === null || followedUser === void 0 ? void 0 : followedUser.username} started following you`
        });
        newMessage.save();
        res.status(200).json({
            status: "ok",
            message: "follow request added"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for unfollow friend
 * @route POST /api/users/unfollow
 * @access private
 */
exports.unFollow = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const { id } = req.body;
    const connection = yield connectionSchema_1.default.findOneAndUpdate({ user_id: (_j = req.user) === null || _j === void 0 ? void 0 : _j._id }, { $pull: { following: new mongodb_1.ObjectId(id), close_friend: new mongodb_1.ObjectId(id) } }, { new: true });
    if (connection) {
        res.status(200).json({
            status: "ok",
            message: "user unfollowed"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for fetching following details
 * @route POST /api/users/following
 * @access private
 */
exports.getFollowing = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const searchKey = req.query.search;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 0;
    const connection = yield connectionSchema_1.default.findOne({ user_id: (_k = req.user) === null || _k === void 0 ? void 0 : _k._id }, { _id: 0, user_id: 0, close_friend: 0 });
    const following = connection === null || connection === void 0 ? void 0 : connection.following;
    const userList = yield userProfile_1.default.find({ user_id: { $in: following } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 }).populate({ path: 'user_id', select: "email" });
    let modifiedUserList = userList.map(({ username, verified, user_id, profile_img, fullname }) => ({
        username,
        verified,
        user_id: user_id._id,
        email: user_id.email,
        profile_img,
        fullname,
    }));
    if (modifiedUserList) {
        modifiedUserList = modifiedUserList.filter((item) => {
            var _a;
            return searchKey === ""
                ? item
                : item.username
                    .toLowerCase()
                    .includes(searchKey) ||
                    ((_a = item.fullname) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchKey));
        });
        modifiedUserList = modifiedUserList.slice(page, page + 10);
        res.status(200).json({
            status: 'ok',
            message: 'following details fetched',
            userList: modifiedUserList
        });
    }
    else {
        next(new Error("Server error"));
    }
}));
/**
 * @desc function for fetching following details
 * @route POST /api/users/following
 * @access private
 */
exports.getFollowers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    const searchKey = req.query.search;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 0;
    const connection = yield connectionSchema_1.default.aggregate([
        {
            $match: {
                following: new mongodb_1.ObjectId((_l = req.user) === null || _l === void 0 ? void 0 : _l._id)
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'userProfile'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: {
                path: '$user'
            }
        },
        {
            $unwind: {
                path: '$userProfile'
            }
        },
        {
            $project: {
                _id: 0,
                user_id: "$userProfile.user_id", username: "$userProfile.username", verified: "$userProfile.verified", profile_img: "$userProfile.profile_img", fullname: "$userProfile.fullname", email: "$user.email"
            },
        },
    ]);
    if (connection) {
        let userList = connection === null || connection === void 0 ? void 0 : connection.filter((item) => {
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
/**
 * @desc for fetching close friends
 * @route GET /api/users/close-friends
 * @access private
 */
exports.getCloseFriends = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    const connection = yield connectionSchema_1.default.findOne({ user_id: (_m = req.user) === null || _m === void 0 ? void 0 : _m._id }, { _id: 0, user_id: 0, following: 0 });
    const closeFriends = connection === null || connection === void 0 ? void 0 : connection.close_friend;
    const userList = yield userProfile_1.default.find({ user_id: { $in: closeFriends } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 }).populate({ path: 'user_id', select: "email" });
    const modifiedUserList = userList.map(({ username, verified, user_id, profile_img, fullname }) => ({
        username,
        verified,
        user_id: user_id._id,
        email: user_id.email,
        profile_img,
        fullname,
    }));
    if (modifiedUserList) {
        res.status(200).json({
            status: "ok",
            message: "close friends fetched",
            userList: modifiedUserList
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for fetching following details without close friends
 * @route GET /api/users/get-following
 * @access private
 */
exports.getFollowingWithoutCloseFriends = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    const connection = yield connectionSchema_1.default.aggregate([
        {
            $match: {
                user_id: (_o = req.user) === null || _o === void 0 ? void 0 : _o._id
            }
        },
        {
            $project: {
                followingNotInCloseFriends: {
                    $setDifference: ['$following', '$close_friend'],
                },
            },
        }
    ]);
    const closeFriends = (_p = connection[0]) === null || _p === void 0 ? void 0 : _p.followingNotInCloseFriends;
    const userList = yield userProfile_1.default.find({ user_id: { $in: closeFriends } }, { user_id: 1, username: 1, verified: 1, profile_img: 1, fullname: 1 }).populate({ path: 'user_id', select: "email" });
    const modifiedUserList = userList.map(({ username, verified, user_id, profile_img, fullname }) => ({
        username,
        verified,
        user_id: user_id._id,
        email: user_id.email,
        profile_img,
        fullname,
    }));
    if (modifiedUserList) {
        res.status(200).json({
            status: 'ok',
            message: 'following details fetched',
            userList: modifiedUserList
        });
    }
    else {
        next(new Error("Server error"));
    }
}));
/**
 * @desc function adding new close friend
 * @route POST /api/users/add-closefriend
 * @access private
 */
exports.addCloseFriend = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _q;
    const { id } = req.body;
    const connection = yield connectionSchema_1.default.findOneAndUpdate({ user_id: (_q = req.user) === null || _q === void 0 ? void 0 : _q._id }, { $addToSet: { close_friend: new mongodb_1.ObjectId(id) } }, { upsert: true, new: true });
    if (connection) {
        res.status(200).json({
            status: "ok",
            message: "Add to close friends"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function removing close friend
 * @route DELETE /api/users/close-friend
 * @access private
 */
exports.removeCloseFriend = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _r;
    const { id } = req.params;
    const connection = yield connectionSchema_1.default.findOneAndUpdate({ user_id: (_r = req.user) === null || _r === void 0 ? void 0 : _r._id }, { $pull: { close_friend: new mongodb_1.ObjectId(id) } }, { new: true });
    if (connection) {
        res.status(200).json({
            status: "ok",
            message: "account removed from close friends"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function removing close friend
 * @route GET /api/users/get-user-profile/:id
 * @access private
 */
exports.getProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t;
    const { id } = req.params;
    const userProfile = yield userProfile_1.default.aggregate([
        {
            $match: { user_id: new mongodb_1.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
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
    ]);
    const followers = yield connectionSchema_1.default.countDocuments({
        following: new mongodb_1.ObjectId(id),
    });
    const isFollowing = yield connectionSchema_1.default.findOne({ user_id: (_s = req.user) === null || _s === void 0 ? void 0 : _s._id, following: { $in: id } });
    const isBlocked = yield userModel_1.default.findOne({ _id: (_t = req.user) === null || _t === void 0 ? void 0 : _t._id, blocked_users: { $in: id } });
    const following = yield connectionSchema_1.default.findOne({
        user_id: id
    });
    if (userProfile && followers !== null && following) {
        res.status(200).json({
            status: 'ok',
            message: 'user profile fetched',
            userProfile: userProfile[0],
            following: following.following.length,
            followers,
            isFollowing: isFollowing ? true : false,
            isBlocked: isBlocked ? true : false
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for blocking user
 * @route GET /api/users/block-user/:id
 * @access private
 */
exports.blockUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _u, _v;
    const { id } = req.params;
    yield connectionSchema_1.default.findOneAndUpdate({ user_id: (_u = req.user) === null || _u === void 0 ? void 0 : _u._id }, { $pull: { following: new mongodb_1.ObjectId(id), close_friend: new mongodb_1.ObjectId(id) } });
    const user = yield userModel_1.default.findOneAndUpdate({ _id: (_v = req.user) === null || _v === void 0 ? void 0 : _v._id }, { $push: { blocked_users: new mongodb_1.ObjectId(id) } }, { new: true });
    if (user) {
        res.status(200).json({
            status: 'ok',
            message: "user blocked"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for unblocking user
 * @route GET /api/users/unblock-user/:id
 * @access private
 */
exports.unblockUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _w;
    const { id } = req.params;
    const user = yield userModel_1.default.findOneAndUpdate({ _id: (_w = req.user) === null || _w === void 0 ? void 0 : _w._id }, { $pull: { blocked_users: new mongodb_1.ObjectId(id) } }, { new: true });
    if (user) {
        res.status(200).json({
            status: 'ok',
            message: "user unblocked"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for handling report
 * @route POST /api/users/report
 * @access private
 */
exports.addReport = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _x, _y;
    const { id, reason, reported_type } = req.body;
    if (!id || !reason || !reported_type) {
        return next(new Error("Credentials missing"));
    }
    const report = yield reportSchema_1.default.findOneAndUpdate({ user_id: (_x = req.user) === null || _x === void 0 ? void 0 : _x._id, reported_id: new mongodb_1.ObjectId(id) }, { $set: { user_id: (_y = req.user) === null || _y === void 0 ? void 0 : _y._id, reported_id: new Object(id), reason, reported_type } }, { upsert: true, new: true });
    if (report) {
        res.status(200).json({
            status: 'ok',
            message: "report added"
        });
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for handling report
 * @route POST /api/users/userl
 * @access private
 */
exports.searchUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const pattern = /^[a-zA-Z0-9_@]+$/;
    if (!pattern.test(search)) {
        res.status(200).json({
            status: 'ok',
            message: "user details fetched",
            userData: []
        });
    }
    else {
        const userData = yield userProfile_1.default.aggregate([
            {
                $match: {
                    $or: [
                        { username: { $regex: new RegExp(search, 'i') } },
                        { fullname: { $regex: new RegExp(search, 'i') } }
                    ],
                }
            },
            {
                $project: {
                    user_id: 1,
                    username: 1,
                    fullname: 1,
                    profile_img: 1
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
                $sort: {
                    verified: -1
                }
            },
            {
                $limit: 50
            }
        ]);
        if (userData) {
            res.status(200).json({
                status: 'ok',
                message: "user details fetched",
                userData
            });
        }
        else {
            next(new Error());
        }
    }
}));
/**
 * @desc request for fetching members profile details
 * @route POST /api/users/get-members
 * @access private
 */
exports.getMembers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.members.length < 1) {
        res.status(400);
        return next(new Error('Members not found'));
    }
    const members = yield userProfile_1.default.aggregate([
        {
            $match: {
                user_id: { $in: req.body.members.map((memberId) => new mongodb_1.ObjectId(memberId)) }
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: { path: '$user' }
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
    ]);
    if (members) {
        res.status(200).json({
            status: 'ok',
            message: 'members details fetched',
            members
        });
    }
}));
