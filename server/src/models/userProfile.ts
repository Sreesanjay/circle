import mongoose, { Schema } from "mongoose";
import { IUserProfile } from "../Interfaces/index";

const ProfileSchema: Schema<IUserProfile> = new Schema<IUserProfile>({
    fullname: {
        type: "string",
    },
    username : {
        type: String,
   },
   profile_img:{
        type : String
   },
    gender: {
        type: "string",
    },
    bio: {
        type: "string"
    },
    cover_img :{
        type: "string",
    },
    reports: [
        {
            user_id: {
                type : mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            reason : "string"
        }
    ],
    is_premium : {
        type : "boolean",
    },
    account_type : {
        type : "string",
        enum : ["DEFAULT", "BUSINESS", "CREATER"],
        default : "DEFAULT"
    },
    user_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
    },
    interest:[
        {
          type: Schema.Types.ObjectId,
          ref: 'interests',
        },
      ],
    wallet: {
        type: Number,
        default: 0,
   },

}, { timestamps: true });

export default mongoose.model<IUserProfile>("UserProfile", ProfileSchema);