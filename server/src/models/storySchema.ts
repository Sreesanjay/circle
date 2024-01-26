import mongoose, { Schema } from "mongoose";
import {IStory } from "../Interfaces";


const storySchema: Schema<IStory> = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content:{
        type:"string",
        required: true
    },
    story_type:{
        type:"string",
        enum:["TEXT", "IMAGE"]
    },
    visibility:{
        type:"string",
        enum:["PUBLIC", "CLOSE_FRIENDS", "SUBSCRIBER_ONLY"]
    }
}, { timestamps: true });

export default mongoose.model<IStory>("Story", storySchema);