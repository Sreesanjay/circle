import { Document, ObjectId } from "mongoose";

interface Report {
     user_id: string;
     reason: string;
}

export interface IUser extends Document {
     email: string;
     password: string;
     role: string;
     wallet: number;
     is_blocked: boolean;
}
export interface IUserProfile extends Document {
     user_id: ObjectId
     fullname: string;
     username: string;
     profile_img: string;
     gender: string;
     bio: string;
     reports: Report[];
     account_type: string;
     cover_img: string;
     wallet: number;
     interest: ObjectId[];
     verified: boolean;
     user_typs: string;
}

export interface IInterest extends Document {
     interest: string,
     image: string,
     discription: string
}
export interface IOtp extends Document {
     email: string;
     otp: string;
     createdAt: Date
}

export interface IMailOptions {
     from: string;
     to: string;
     text: string;
}

export interface IConnections extends Document{
     user_id:ObjectId
     following:ObjectId[],
     close_friend:ObjectId[],
}


export interface IStory extends Document{
     user_id:ObjectId;
     content:string;
     story_type:string;
     visibility:string;
}