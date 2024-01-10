import mongoose, { Schema } from "mongoose";
import { User } from "../Interfaces/index";
import bcrypt from "bcryptjs";

const userSchema: Schema<User> = new Schema<User>({
     email: {
          type: String,
          required: true,
     },
     password: {
          type: String,
          required: true,
     },
     role: {
          type: String,
          enum: ["ADMIN", "USER"],
          default: "USER",
     },
     wallet: {
          type: Number,
          default: 0,
     },
     user_profile: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserProfile",
     },
});

userSchema.pre("save", async function (next){
     if (!this.isModified("password")) {
          next();
     }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model<User>("User", userSchema);
