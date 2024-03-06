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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const postSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ""
    },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    visibility: {
        type: String
    },
    type: {
        type: String
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'interests',
            default: []
        }
    ],
    clicks: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    impressions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    is_delete: {
        type: Boolean,
        default: false
    },
    is_archive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Post", postSchema);
