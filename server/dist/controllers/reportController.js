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
exports.getReports = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const reportSchema_1 = __importDefault(require("../models/reportSchema"));
const mongodb_1 = require("mongodb");
/**
 * @desc function for getting story viewers
 * @route PUT /api/story/get-viewers-list/:id
 * @access private
 */
exports.getReports = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reports = yield reportSchema_1.default.aggregate([
        {
            $match: {
                reported_id: new mongodb_1.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'userProfile',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
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
                            user_id: 1,
                            username: 1,
                            fullname: 1,
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
    ]);
    if (reports) {
        res.status(200).json({
            status: 'ok',
            message: 'reports fetched',
            reports
        });
    }
    else {
        next(new Error('Internal server error'));
    }
}));
