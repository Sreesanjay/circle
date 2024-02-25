import mongoose, { Schema } from "mongoose";
import { IPlans } from "../Interfaces";


const planSchema: Schema<IPlans> = new Schema({
    amount: {
        type: 'number',
        require: true
    },
    discription: {
        type: 'string',
        require: true
    },
    type: {
        type: 'string',
        enum: ['POST_BOOSTER', 'VERIFICATION']
    },
    duration: {
        type: 'number', //in days
        default: 1
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model<IPlans>("Plan", planSchema);