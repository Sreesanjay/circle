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
     is_blocked : boolean;
}
export interface IUserProfile extends Document {
     user_id : ObjectId
     fullname: string;
     username: string;
     profile_img : string;
     gender: string;
     bio: string;
     reports: Report[];
     is_premium : boolean;
     account_type : string;
     cover_img: string;
     wallet: number;
     interest : ObjectId[]
}

export interface IInterest extends Document {
     interest : string,
     image : string,
     discription : string
}

