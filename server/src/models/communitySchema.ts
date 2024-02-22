import mongoose, { Schema } from "mongoose";
import { ICommunity } from "../Interfaces";


const communitySchema: Schema<ICommunity> = new Schema({
    community_name: {
        type: 'string',
        required: true
    },
    icon: {
        type: 'string'
    },
    topic: {
        type: mongoose.Types.ObjectId,
        ref: 'interests'
    },
    about: {
        type: 'string'
    },
    privacy: {
        type: 'string',
        enum: ['private', 'public']
    },
    is_delete: {
        type: Boolean,
        default: false
    },
},{timestamps : true})

export default mongoose.model<ICommunity>("community", communitySchema);