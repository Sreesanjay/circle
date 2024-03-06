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
const mongoose_1 = __importStar(require("mongoose"));
const connectionSchema_1 = __importDefault(require("./connectionSchema"));
const ProfileSchema = new mongoose_1.Schema({
    fullname: {
        type: "string",
    },
    username: {
        type: String,
    },
    profile_img: {
        type: String
    },
    gender: {
        type: "string",
    },
    bio: {
        type: "string"
    },
    cover_img: {
        type: "string",
    },
    account_type: {
        type: "string",
        enum: ["DEFAULT", "PROFESSIONAL"],
        default: "DEFAULT"
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    interest: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'interests',
        },
    ],
    wallet: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
ProfileSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield connectionSchema_1.default.findOne({ user_id: this.user_id });
            if (!connection) {
                const connection = new connectionSchema_1.default({
                    user_id: this.user_id,
                });
                yield connection.save();
            }
            next();
        }
        catch (error) {
            next(new Error("Internal server error"));
        }
    });
});
exports.default = mongoose_1.default.model("UserProfile", ProfileSchema);
