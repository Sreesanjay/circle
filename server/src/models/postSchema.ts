import mongoose, { Schema } from "mongoose";
import { IPost } from "../Interfaces";


const postSchema: Schema<IPost> = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
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
            type: mongoose.Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'interests',
            default: []
        }
    ],
    clicks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    impressions: [
        {
            type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<IPost>("Post", postSchema);