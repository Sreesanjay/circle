import { Document, ObjectId } from "mongoose";

interface Report {
     user_id: string; 
     reason: string;
}

export interface IUser extends Document {
     username: string;
     email: string;
     password: string;
     role: string;
     wallet: number;
     profile_img : string;
     is_blocked : boolean;
}
export interface IUserProfile extends Document {
     user_id : ObjectId
     fullname: string;
     gender: string;
     bio: string;
     reports: Report[];
     is_premium : boolean;
     account_type : string;
     cover_img: string;
}

