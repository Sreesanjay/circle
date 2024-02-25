import mongoose, { Schema } from "mongoose";
import { IReport } from "../Interfaces";


const reportSchema: Schema<IReport> = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reported_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    reported_type: {
        type: String,
        enum: ['account', 'post', 'group', 'community', 'discussion']
    },
    reason: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model<IReport>("Report", reportSchema);