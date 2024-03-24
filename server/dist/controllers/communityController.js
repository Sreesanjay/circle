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
exports.getAnalytics = exports.removeMember = exports.acceptRequest = exports.pendingRequest = exports.getCommunity = exports.getMyCommunities = exports.joinCommunity = exports.getCommunities = exports.removeCommunity = exports.updateIcon = exports.updateCommunity = exports.createCommunity = void 0;
const mongodb_1 = require("mongodb");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const communitySchema_1 = __importDefault(require("../models/communitySchema"));
const membersSchema_1 = __importDefault(require("../models/membersSchema"));
const discussionSchema_1 = __importDefault(require("../models/discussionSchema"));
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
// import Interest from "../models/interestSchema";
// import UserProfile from "../models/userProfile";
/**
 * @desc function creating new community
 * @route POST /api/community
 * @access private
 */
exports.createCommunity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.body) {
        res.status(400);
        return next(new Error('Invalid credentials'));
    }
    const exist = yield communitySchema_1.default.findOne({ community_name: req.body.community_name });
    if (exist) {
        res.status(409);
        return next(new Error('Community name already exist'));
    }
    const newCommunity = new communitySchema_1.default(req.body);
    const community = yield newCommunity.save();
    if (community) {
        const members = yield new membersSchema_1.default({
            community_id: community._id,
            user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            is_admin: true
        }).save();
        res.status(201).json({
            status: 'created',
            message: 'Community created successfully',
            community,
            members
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc function creating new community
 * @route PUT /api/community/:id
 * @access private
 */
exports.updateCommunity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const community_id = req.params.id;
    if (!community_id) {
        res.status(400);
        return next(new Error('Community not found'));
    }
    const community = yield communitySchema_1.default.findOneAndUpdate({ _id: community_id }, { $set: req.body }, { new: true });
    if (community) {
        res.status(201).json({
            status: 'created',
            message: 'Community updated successfully',
            community
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for updating community
 * @route PUT /api/community/:id
 * @access private
 */
exports.updateIcon = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const community_id = req.params.id;
    if (!community_id || !req.body.icon) {
        res.status(400);
        return next(new Error('Invalid credentials'));
    }
    const community = yield communitySchema_1.default.findOneAndUpdate({ _id: community_id }, { $set: { icon: req.body.icon } }, { new: true });
    if (community) {
        res.status(200).json({
            status: 'ok',
            message: 'Community updated successfully',
            community
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for removing community
 * @route PUT /api/community/remove/:id
 * @access private
 */
exports.removeCommunity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const community_id = req.params.id;
    if (!community_id) {
        res.status(400);
        return next(new Error('Invalid community'));
    }
    const community = yield communitySchema_1.default.findOneAndUpdate({ _id: community_id }, { $set: { is_delete: true } }, { new: true });
    if (community) {
        res.status(200).json({
            status: 'ok',
            message: 'Community deleted successfully',
            community
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc function fetching all interest matched community
 * @route GET /api/community
 * @access private
 */
exports.getCommunities = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const interest = await UserProfile.findOne({ user_id: req.user?._id }, { _id: 0, interest: 1 });
    const community = yield communitySchema_1.default.aggregate([
        {
            $match: {
                is_delete: false
            }
        }, {
            $lookup: {
                from: 'members',
                localField: '_id',
                foreignField: 'community_id',
                as: 'members',
                // pipeline: [
                //     {
                //         $match: {
                //             status: { $ne: 'removed' },
                //         }
                //     }
                // ]
            }
        }
    ]);
    if (community) {
        res.status(200).json({
            status: 'ok',
            message: 'Community fetched successfully',
            community
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request for joining community
 * @route POST /api/community/join
 * @access private
 */
exports.joinCommunity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const { community_id } = req.body;
    const community = yield communitySchema_1.default.findById(community_id);
    if (!community) {
        res.status(400);
        return next(new Error("Couldn't find community"));
    }
    const exist = yield membersSchema_1.default.findOne({ community_id: community_id, user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
    if (exist) {
        if (exist.status !== 'removed') {
            res.status(409);
            return next(new Error("You are already a member"));
        }
        else {
            const newMember = yield membersSchema_1.default.findOneAndUpdate({ community_id: community_id, user_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, { $set: { status: 'pending' } }, { new: true });
            if (newMember) {
                res.status(200).json({
                    status: 'ok',
                    message: 'request added',
                    newMember
                });
                return;
            }
        }
    }
    const newMember = yield new membersSchema_1.default({
        community_id,
        user_id: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
        status: community.privacy === 'private' ? 'pending' : 'active'
    }).save();
    if (newMember) {
        res.status(200).json({
            status: 'ok',
            message: 'added new member',
            newMember
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request fetching my communities
 * @route GET /api/community/my-communities
 * @access private
 */
exports.getMyCommunities = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const member = yield membersSchema_1.default.find({ user_id: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id, status: 'active' }, { _id: 0, community_id: 1 });
    const memberIds = member.map(item => item.community_id);
    const community = yield communitySchema_1.default.aggregate([
        {
            $match: {
                _id: { $in: memberIds },
                is_delete: false
            }
        }, {
            $lookup: {
                from: 'members',
                localField: '_id',
                foreignField: 'community_id',
                as: 'members'
            }
        }
    ]);
    if (community) {
        res.status(200).json({
            status: 'ok',
            message: 'fetched your communities',
            community
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request fetching community
 * @route GET /api/community/get-details/:id
 * @access private
 */
exports.getCommunity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return next(new Error('Community not found'));
    }
    const community = yield communitySchema_1.default.aggregate([
        {
            $match: {
                _id: new mongodb_1.ObjectId(id),
                is_delete: false
            }
        }, {
            $lookup: {
                from: 'members',
                localField: '_id',
                foreignField: 'community_id',
                as: 'members',
                pipeline: [
                    {
                        $match: {
                            status: { $ne: 'removed' }
                        }
                    }
                ]
            }
        }
    ]);
    if (community) {
        res.status(200).json({
            status: 'ok',
            message: 'fetched community details',
            community: community[0]
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request fetching my communities
 * @route GET /api/community/pending-request/:id
 * @access private
 */
exports.pendingRequest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return next(new Error('Community not found'));
    }
    const userList = yield membersSchema_1.default.aggregate([
        {
            $match: {
                community_id: new mongodb_1.ObjectId(id),
                status: 'pending'
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
    if (userList) {
        res.status(200).json({
            status: 'ok',
            message: 'pending requests fetched',
            userList
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc request fetching my communities
 * @route GET /api/community/pending-request/:id
 * @access private
 */
exports.acceptRequest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { community_id, user_id } = req.body;
    const member = yield membersSchema_1.default.findOneAndUpdate({ community_id: community_id, user_id: user_id }, { $set: { status: 'active' } }, { new: true });
    if (member) {
        const community = yield communitySchema_1.default.findOne({ _id: community_id });
        if (community) {
            const newMessage = new notificationSchema_1.default({
                user_id: user_id,
                sender_id: (_f = req.user) === null || _f === void 0 ? void 0 : _f._id,
                message: `Accepted your request to join ${community.community_name}`
            });
            newMessage.save();
        }
        res.status(200).json({
            status: 'ok',
            message: 'accept user request',
            member
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @desc rquest for removing a member
 * @route POST /api/community/remove-member
 * @access private
 */
exports.removeMember = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { community_id, user_id } = req.body;
    const exist = yield membersSchema_1.default.findOne({ community_id, user_id });
    if (!exist) {
        res.status(400);
        return next(new Error('Invalid Member'));
    }
    if (exist.is_admin) {
        const secondlastmember = yield membersSchema_1.default.find({ community_id, user_id: { $ne: user_id } }).sort({ createdAt: 1 });
        if (secondlastmember[0]) {
            yield membersSchema_1.default.findOneAndUpdate({ community_id, user_id: secondlastmember[0].user_id }, { $set: { is_admin: true } });
        }
    }
    const member = yield membersSchema_1.default.findOneAndUpdate({ community_id, user_id }, { $set: { status: 'removed', is_admin: false } }, { new: true });
    if (member) {
        res.status(200).json({
            status: 'ok',
            message: 'member removed',
            member
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
/**
 * @desc rquest for fetching analytics
 * @route POST /api/community/analytics
 * @access private
 */
exports.getAnalytics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const exist = yield communitySchema_1.default.findOne({ _id: id });
    if (!exist) {
        res.status(400);
        return next(new Error('Invalid Community'));
    }
    const total_members = yield membersSchema_1.default.countDocuments({ community_id: id, status: 'active' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const discussions_today = yield discussionSchema_1.default.countDocuments({ community_id: id, createdAt: { $gte: today }, is_delete: false });
    const total_discussion = yield discussionSchema_1.default.countDocuments({ community_id: id, is_delete: false });
    if (total_members || discussions_today || total_discussion) {
        res.status(200).json({
            status: 'ok',
            message: 'analytics fetched',
            analytics: {
                total_members,
                discussions_today,
                total_discussion
            }
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
