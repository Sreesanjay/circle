import mongoose, { Schema } from "mongoose";
import { IPayment } from "../Interfaces";


const paymentSchema: Schema<IPayment> = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    amount: {
        type: 'number',
    },
    payment_method: {
        type: 'string'
    },
    transaction_id: {
        type: 'string'
    },
}, { timestamps: true });

export default mongoose.model<IPayment>("Payment", paymentSchema);