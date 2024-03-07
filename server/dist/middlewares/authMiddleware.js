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
exports.protectAdmin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, validateEnv_1.default.JWT_ACCESSTOKEN_SECRET);
            const userId = new mongoose_1.default.Types.ObjectId(decoded.id);
            const user = yield userModel_1.default.findById({ _id: userId });
            if (!user || user.role !== 'USER') {
                res.status(401);
                next(Error('Unauthorized user'));
            }
            else if (user.is_blocked) {
                res.status(401);
                next(Error('Account has been blocked'));
            }
            else {
                req.user = user;
            }
            next();
        }
        catch (error) {
            res.status(401);
            next(new Error('Not authorized, token failed'));
        }
    }
    else {
        res.status(401);
        res.status(401);
        next(new Error('Not authorized, token failed'));
    }
}));
exports.protectAdmin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, validateEnv_1.default.JWT_ACCESSTOKEN_SECRET);
            const userId = new mongoose_1.default.Types.ObjectId(decoded.id);
            const user = yield userModel_1.default.findOne({ _id: userId });
            if (!user || user.role !== 'ADMIN') {
                res.status(401);
                throw new Error('Unauthorized user');
            }
            else {
                req.user = user;
            }
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}));
