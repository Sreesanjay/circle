import mongoose, { Schema } from "mongoose";
import { IChat } from "../Interfaces";


const chatSchema: Schema<IChat> = new Schema({
    chat_name: {
        type: "string"
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    is_groupchat: {
        type: Boolean,
        default: false
    },
    icon: {
        type :'string',
    },
    admins: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    
    removed_members: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],

    is_delete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model<IChat>("Chat", chatSchema);