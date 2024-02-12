import mongoose, { Schema } from "mongoose";
import { IMessage } from "../Interfaces";


const messageSchema: Schema<IMessage> = new Schema({
    chat_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat'
    },
    sender_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    content_type: {
        type: 'string',
        enum: ['TEXT', 'MEDIA', 'LOCATION'],
        default: 'TEXT'
    },
    file_type: {
        type: 'string',
    },
    delivered_to: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            default: []
        }
    ],
    read_by: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            default: []
        }
    ],
    reply_to: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    is_delete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model<IMessage>("Message", messageSchema);