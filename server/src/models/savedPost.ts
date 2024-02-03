import mongoose, { Schema } from "mongoose";
import { ISavedPost } from "../Interfaces";


const savedPost: Schema<ISavedPost> = new Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

export default mongoose.model<ISavedPost>("SavedPost", savedPost);