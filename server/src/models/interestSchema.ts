import mongoose, { Schema } from "mongoose";
import { IInterest } from "../Interfaces/index";


const interestSchema: Schema<IInterest> = new Schema<IInterest>({
    interest : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true
    }
},{timestamps : true});

export default mongoose.model<IInterest>("Interest", interestSchema);
