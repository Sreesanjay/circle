import mongoose, { Schema } from "mongoose";
import { IOtp } from "../Interfaces";


const otpSchema: Schema<IOtp> = new Schema({
    email: {
         type: String,
         required: true,
    },
    otp: {
         type: String,
         required: true,
    },
    createdAt: {
         type: Date,
         default: Date.now,
         expires: 60,
    },
});

export default mongoose.model<IOtp>("OTP", otpSchema);