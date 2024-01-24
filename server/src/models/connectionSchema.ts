import mongoose, { Schema } from "mongoose";
import { IConnections } from "../Interfaces";


const connectionSchema: Schema<IConnections> = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        },
    ],
    close_friend: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        },
    ],
});

export default mongoose.model<IConnections>("Connection", connectionSchema);