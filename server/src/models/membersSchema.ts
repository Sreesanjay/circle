import mongoose, { Schema } from "mongoose";
import { IMember } from "../Interfaces";


const membersSchema: Schema<IMember> = new Schema({
    community_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Community'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    status: {
        type: 'string',
        enum: ['pending', 'active', 'removed'],
        default: 'active'
    }
}, { timestamps: true });

export default mongoose.model<IMember>("Member", membersSchema);