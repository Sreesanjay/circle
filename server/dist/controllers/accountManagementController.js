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
exports.getBlockedUsers = exports.deleteMyInterest = exports.addInterest = exports.getMyInterest = exports.getAllInterest = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const interestSchema_1 = __importDefault(require("../models/interestSchema"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const userModel_1 = __importDefault(require("../models/userModel"));
/**
 * @desc function for fetching all interests.
 * @route GET /api/manage-account/interest
 * @access private
 */
exports.getAllInterest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interest = yield interestSchema_1.default.find();
    res.status(200).json({
        status: "ok",
        message: "Interest fetched",
        interest
    });
}));
/**
 * @desc function for fetching user interest.
 * @route GET /api/manage-account/interest
 * @access private
 */
exports.getMyInterest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interest = yield interestSchema_1.default.find({ _id: { $in: req.body.interest } });
    res.status(200).json({
        status: "ok",
        message: "Interest fetched",
        interest
    });
}));
/**
 * @desc function for adding new interest.
 * @route POST /api/manage-account/interest/add-interest
 * @access private
 */
exports.addInterest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { choosedId } = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const newUser = yield userProfile_1.default.findOneAndUpdate({ user_id: userid }, { $push: { interest: { $each: choosedId } } }, { new: true });
    if (newUser) {
        res.status(200).json({
            status: 'ok',
            message: "new interest added"
        });
    }
}));
/**
 * @desc function for deleting an interest.
 * @route POST /api/manage-account/interest/:id
 * @access private
 */
exports.deleteMyInterest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const interestId = req.params.id;
    const userid = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const newUser = yield userProfile_1.default.findOneAndUpdate({ user_id: userid }, { $pull: { interest: interestId } }, { new: true });
    if (newUser) {
        res.status(200).json({
            status: 'ok',
            message: "Interest deleted"
        });
    }
}));
/**
 * @desc function for deleting an interest.
 * @route POST /api/manage-account//blocked-users
 * @access private
 */
exports.getBlockedUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userList = yield userModel_1.default.aggregate([
        {
            $match: { _id: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }
        },
        {
            $lookup: {
                from: "userprofiles", // Assuming the collection name is "users"
                localField: "blocked_users",
                foreignField: "user_id",
                as: "blocked_users_details"
            }
        },
    ]);
    if (userList.length > 0) {
        res.status(200).json({
            status: 'ok',
            message: "Interest deleted",
            userList: userList[0].blocked_users_details
        });
    }
}));
