import mongoose, { Schema } from "mongoose";
import { IUser } from "../Interfaces/index";
import bcrypt from "bcryptjs";

const userSchema: Schema<IUser> = new Schema<IUser>({
     email: {
          type: String,
          required: true,
     },
     password: {
          type: String
     },
     username : {
          type: String,
     },
     role: {
          type: String,
          enum: ["ADMIN", "USER"],
          default: "USER",
     },
     is_blocked : {
          type : Boolean,
          default: false,
     },
     wallet: {
          type: Number,
          default: 0,
     },
     profile_img:{
          type : String
     }
},{timestamps : true});

userSchema.pre("save", async function (next){
     if (!this.isModified("password")) {
          next();
     }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model<IUser>("User", userSchema);
