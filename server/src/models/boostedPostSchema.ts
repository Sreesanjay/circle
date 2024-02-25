import mongoose, { Schema } from "mongoose";
import { IBoostedPost } from "../Interfaces";

const postSchema: Schema<IBoostedPost> = new Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    plan_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    action: {
        type: 'string',
        enum: ['PROFILE_VISIT', 'WEBSITE', "MESSAGE"]
    },
    payment_details: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
    }

}, { timestamps: true });

export default mongoose.model<IBoostedPost>("BoostedPost", postSchema);