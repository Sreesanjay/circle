import mongoose, { Schema } from "mongoose";
import { INotification } from "../Interfaces";


const notificationSchema: Schema<INotification> = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    message: {
        type: 'string',
        required: true,
    },
    sender_id:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    is_read: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model<INotification>("Notification", notificationSchema);