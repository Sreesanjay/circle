import mongoose, { Schema } from "mongoose";
import { IComment } from "../Interfaces";


const commentSchema: Schema<IComment> = new Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    reply: {
        type: mongoose.Types.ObjectId
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

export default mongoose.model<IComment>("Comment", commentSchema);