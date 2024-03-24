"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.refreshToken = exports.resetPassword = exports.signin = exports.googleAuth = exports.signup = exports.verifyOtp = exports.verifyMail = void 0;
const jwt_decode_1 = require("jwt-decode");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateJwt_1 = __importStar(require("../util/generateJwt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const otpSchema_1 = __importDefault(require("../models/otpSchema"));
const userProfile_1 = __importDefault(require("../models/userProfile"));
const generateUsername_1 = __importDefault(require("../util/generateUsername"));
const generateOtp_1 = __importDefault(require("../util/generateOtp"));
const nodeMailer_1 = require("../config/nodeMailer");
exports.verifyMail = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        res.status(400);
        return next(Error("Invalid email address"));
    }
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (user) {
        res.status(200).json({
            status: 'OK',
            message: "email exist",
            exists: true
        });
    }
    else {
        const otp = yield (0, generateOtp_1.default)();
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedOtp = yield bcryptjs_1.default.hash(otp.toString(), salt);
        yield otpSchema_1.default.updateOne({ email: req.body.email }, { $set: { email: req.body.email, otp: hashedOtp } }, { upsert: true });
        const mailOptions = {
            from: "sreesanjay7592sachu@gmail.com",
            to: req.body.email,
            subject: "Registration to Circle",
            text: `Your otp for registration is ${otp}`,
        };
        (0, nodeMailer_1.sendMail)(mailOptions);
        res.status(201).json({
            status: "created",
            message: "OTP send successfully",
        });
    }
}));
exports.verifyOtp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.otp) {
        res.status(400);
        return next(Error("Invalid otp"));
    }
    const otp = yield otpSchema_1.default.findOne({ email: req.body.email });
    if (otp) {
        const match = yield bcryptjs_1.default.compare(req.body.otp, otp.otp);
        if (match) {
            res.status(200).json({
                status: "ok",
                message: "otp matched",
                matchOtp: true
            });
        }
        else {
            res.status(200).json({
                status: "ok",
                message: "Wrong otp",
                matchOtp: false
            });
        }
    }
    else {
        res.status(404);
        next(Error("Email not found"));
    }
}));
/**
 * @desc User registration and authentication
 * @route POST /api/signup
 * @access public
 */
exports.signup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400);
        return next(Error("Invlalid Credentials"));
    }
    const emailExist = yield userModel_1.default.findOne({ email: email });
    if (emailExist) {
        res.status(409);
        return next(Error("Email Already exists"));
    }
    const userNameExist = yield userModel_1.default.findOne({ username: username });
    if (userNameExist) {
        res.status(409);
        return next(Error("Username Already exists"));
    }
    const user = new userModel_1.default({ email, password });
    if (user) {
        const newUser = yield user.save();
        const userProfile = new userProfile_1.default({ username, user_id: newUser._id });
        const newUserProfile = yield userProfile.save();
        if (newUserProfile) {
            const { accessToken, refreshToken } = yield (0, generateJwt_1.default)(newUser.email, newUser._id);
            res.status(201).json({
                status: "created",
                message: "User registered successfully",
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    role: newUser.role
                },
                token: accessToken,
                refreshToken
            });
        }
    }
}));
/**
 * @desc User registration and authentication using google
 * @route POST /api/google-auth
 * @access public
 */
exports.googleAuth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential } = req.body;
    if (!credential) {
        res.status(400);
        return next(Error("Invalid credentials"));
    }
    const { email } = (0, jwt_decode_1.jwtDecode)(credential);
    const existingUser = yield userModel_1.default.findOne({ email: email });
    if (existingUser) {
        if (existingUser.password) {
            return next(Error("Invalid Email"));
        }
        const { accessToken, refreshToken } = yield (0, generateJwt_1.default)(existingUser.email, existingUser._id);
        res.status(200).json({
            status: "ok",
            message: "User loged in successfully",
            user: {
                _id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            },
            token: accessToken,
            refreshToken
        });
    }
    else {
        const username = yield (0, generateUsername_1.default)();
        const user = new userModel_1.default({
            email: email,
        });
        if (user) {
            const newUser = yield user.save();
            const userProfile = new userProfile_1.default({ username, user_id: newUser._id });
            const newUserProfile = yield userProfile.save();
            if (newUserProfile) {
                const { accessToken, refreshToken } = yield (0, generateJwt_1.default)(newUser.email, newUser._id);
                res.status(201).json({
                    status: "created",
                    message: "User registered successfully",
                    user: {
                        _id: newUser._id,
                        email: newUser.email,
                        role: newUser.role
                    },
                    token: accessToken,
                    refreshToken
                });
            }
        }
    }
}));
exports.signin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        return next(Error("Invlalid Credentials"));
    }
    const user = yield userModel_1.default.findOne({ email: email, is_blocked: false });
    if (!user || !user.password) {
        res.status(409);
        return next(Error("Email or password not valid"));
    }
    const match = yield bcryptjs_1.default.compare(password, user.password);
    if (match) {
        const { accessToken, refreshToken } = yield (0, generateJwt_1.default)(user.email, user._id);
        res.status(201).json({
            status: "ok",
            message: "User loged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            },
            token: accessToken,
            refreshToken
        });
    }
    else {
        res.status(401);
        next(Error("Email or password not valid"));
    }
}));
exports.resetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { old_password, new_password } = req.body;
    if (!old_password || !new_password) {
        res.status(400);
        return next(Error("Invlalid Credentials"));
    }
    const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        const match = yield bcryptjs_1.default.compare(old_password, user.password);
        if (!match) {
            res.status(406);
            return next(Error("Invalid Old Password"));
        }
        else {
            user.password = new_password;
            yield user.save();
            res.status(200).json({
                status: "ok",
                message: "Password reset successfully"
            });
        }
    }
    else {
        next(Error("server error"));
    }
}));
exports.refreshToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401);
        return next(new Error('Invalid refresh token'));
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, validateEnv_1.default.JWT_REFRESHTOKEN_SECRET);
    const userId = new mongodb_1.ObjectId(decoded.id);
    const user = yield userModel_1.default.findOne({ _id: userId });
    if (user) {
        const token = (0, generateJwt_1.getAccessToken)(user.email, user._id);
        if (token) {
            res.status(201).json({
                status: 'created',
                message: 'Access token created',
                token
            });
        }
    }
    else {
        res.status(401);
        next(new Error('user not found'));
    }
}));
