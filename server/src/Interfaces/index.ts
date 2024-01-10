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
     user_profile : ObjectId
}
export interface UserProfile extends Document {
     fullname: string;
     gender: string;
     bio: string;
     profile_img: string;
     is_blocked: boolean;
     reports: Report[];
     is_premium : boolean;
     account_type : string;
}

