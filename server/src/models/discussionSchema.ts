import mongoose, { Schema } from "mongoose";
import { IDiscussions } from "../Interfaces";


const discussionSchema: Schema<IDiscussions> = new Schema({
    community_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    caption: { type: 'string' },
    content_type: { type: 'string', enum: ['MEDIA', 'TEXT'] },
    file_type: { type: 'string', enum: ['IMAGE', 'VIDEO'] },
    is_delete: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model<IDiscussions>("Discussion", discussionSchema);