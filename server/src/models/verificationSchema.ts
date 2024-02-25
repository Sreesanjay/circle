import mongoose, { Schema } from "mongoose";
import { IVerification } from "../Interfaces";


const verificationSchema: Schema<IVerification> = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    startingDate: {
        type: Date
    },
    endingDate: {
        type: Date
    },
    plan_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Plan'
    },
    document: {
        type: 'string',
        required: true
    },
    document_type: {
        type: 'string',
        enum: ['Adhar_card', 'Voter_id', 'Driving_licence']
    },
    payment_details: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment'
    }
});

export default mongoose.model<IVerification>("Verification", verificationSchema);