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
const userProfile_1 = __importDefault(require("./userProfile"));
const socket_1 = require("../socket");
const notificationSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'user',
    },
    message: {
        type: 'string',
        required: true,
    },
    sender_id: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'user',
    },
    is_read: {
        type: Boolean,
        default: false
    }
});
notificationSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reciever = socket_1.activeUsers.find((item) => item.userId === doc.user_id.toString());
            if (reciever) {
                const user = yield userProfile_1.default.aggregate([
                    {
                        $match: {
                            user_id: doc.sender_id
                        }
                    },
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
                            _id: 0,
                            username: 1,
                            fullname: 1,
                            profile_img: 1,
                            email: '$user.email'
                        }
                    }
                ]);
                socket_1.socketIo.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit('recieve-notification', {
                    _id: doc._id,
                    user_id: doc.user_id,
                    message: doc.message,
                    createdAt: new Date(),
                    is_read: doc.is_read,
                    userProfile: user[0]
                });
            }
        }
        catch (err) {
            console.error(err);
        }
    });
});
exports.default = mongoose_1.default.model("Notification", notificationSchema);
