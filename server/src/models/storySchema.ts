import mongoose, { Schema } from "mongoose";
import { IStory } from "../Interfaces";


const storySchema: Schema<IStory> = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: "string",
        required: true
    },
    background: {
        type: "string",
    },
    color: {
        type: "string",
    },
    is_delete: {
        type: "boolean",
        default: false
    },
    story_type: {
        type: "string",
        enum: ["TEXT", "MEDIA"]
    },
    visibility: {
        type: "string",
        enum: ["PUBLIC", "CLOSE_FRIENDS", "SUBSCRIBER_ONLY"]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    story_viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
}, { timestamps: true });

export default mongoose.model<IStory>("Story", storySchema);