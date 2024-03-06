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
exports.deleteInterest = exports.getAllInterest = exports.updateInterest = exports.newInterest = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const interestSchema_1 = __importDefault(require("../models/interestSchema"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
/**
 * @desc function for creating new interest.
 * @route POST /api/admin/interest
 * @access private
 */
exports.newInterest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield interestSchema_1.default.find({ interest: req.body.interest });
    if (exist.length > 0) {
        res.status(409);
        return next(Error('Interest already created!'));
    }
    const interest = new interestSchema_1.default(req.body);
    if (interest) {
        const newInterest = yield interest.save();
        res.status(201).json({
            status: "created",
            message: "New interest created",
            interest: newInterest
        });
    }
}));
/**
 * @desc function for updating interest.
 * @route PUT /api/admin/interest
 * @access private
 */
exports.updateInterest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const interest = yield interestSchema_1.default.findOne({ _id: req.params.id });
    if (interest) {
        interest.interest = req.body.interest;
        interest.discription = req.body.discription;
        interest.image = req.body.image !== '' ? req.body.image : interest.image;
        const newInterest = yield interest.save();
        if (newInterest) {
            res.status(200).json({
                status: "ok ",
                message: "interest updated",
                interest: newInterest
            });
        }
    }
    else {
        next(new Error());
    }
}));
/**
 * @desc function for fetching all interests.
 * @route GET /api/admin/interest
 * @access private
 */
exports.getAllInterest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const interest = yield interestSchema_1.default.aggregate([
        {
            $lookup: {
                from: 'userprofiles',
                localField: '_id',
                foreignField: 'interest',
                as: 'users',
            },
        },
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'tags',
                as: 'posts',
            },
        },
        {
            $lookup: {
                from: 'communities',
                localField: '_id',
                foreignField: 'topic',
                as: 'community',
            },
        },
        {
            $addFields: {
                total_users: { $size: "$users" },
                total_community: { $size: "$community" },
                total_posts: { $size: "$posts" }
            }
        },
        {
            $project: {
                _id: 1,
                image: 1,
                interest: 1,
                discription: 1,
                total_users: 1,
                total_community: 1,
                total_posts: 1
            },
        },
    ]);
    res.status(200).json({
        status: "ok",
        message: "Interest fetched",
        interest
    });
}));
/**
 * @desc function for deleting interest.
 * @route DELETE /api/admin/interest
 * @access private
 */
exports.deleteInterest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(401);
        return next(Error('Invalid credentials'));
    }
    const deleted = yield interestSchema_1.default.findByIdAndDelete(id);
    yield userProfile_1.default.updateMany({ $pull: { interest: { _id: id } } });
    if (!deleted)
        return next(Error());
    res.status(200).json({
        status: "ok",
        message: "Interest deleted",
    });
}));
