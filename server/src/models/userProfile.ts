import mongoose, { Schema } from "mongoose";
import { IUserProfile } from "../Interfaces/index";
import Connection from "./connectionSchema";

const ProfileSchema: Schema<IUserProfile> = new Schema<IUserProfile>({
    fullname: {
        type: "string",
    },
    username: {
        type: String,
    },
    profile_img: {
        type: String
    },
    gender: {
        type: "string",
    },
    bio: {
        type: "string"
    },
    cover_img: {
        type: "string",
    },
    account_type: {
        type: "string",
        enum: ["DEFAULT", "PROFESSIONAL"],
        default: "DEFAULT"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    interest: [
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
ProfileSchema.pre<IUserProfile>("save", async function (next) {
    try {
        const connection = await Connection.findOne({user_id:this.user_id})
        if (!connection) {
            const connection = new Connection({
                user_id: this.user_id, 
            });
            await connection.save();
        }

        next(); 
    } catch (error) {
        next(new Error("Internal server error"))
    }
});

export default mongoose.model<IUserProfile>("UserProfile", ProfileSchema);