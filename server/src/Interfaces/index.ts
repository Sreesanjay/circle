import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
     email: string;
     password: string;
     role: string;
     wallet: number;
     blocked_users: ObjectId[];
     is_blocked: boolean;
}
export interface IUserProfile extends Document {
     user_id: ObjectId
     fullname: string;
     username: string;
     profile_img: string;
     gender: string;
     bio: string;
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

export interface IConnections extends Document {
     user_id: ObjectId
     following: ObjectId[],
     close_friend: ObjectId[],
}


export interface IStory extends Document {
     user_id: ObjectId;
     content: string;
     background: string;
     color: string;
     story_type: string;
     visibility: string;
     likes: string[];
     story_viewers: string[];
     is_delete: boolean;
}


export interface IReport extends Document {
     user_id: ObjectId;
     reason: string,
     reported_id: ObjectId;
     reported_type: string;
}


export interface IPost extends Document {
     user_id: ObjectId;
     content: string;
     caption: string;
     visibility: string;
     tags: ObjectId[];
     impressions: number;
     likes: ObjectId[];
     profile_visit: number;
     comment: ObjectId;
     is_delete: boolean;
     is_archive: boolean;
     type: string;
}

export interface IComment extends Document {
     post_id: ObjectId;
     user_id: ObjectId;
     content: string;
     reply: ObjectId;
}

export interface ISavedPost extends Document {
     user_id: ObjectId;
     post_id: ObjectId;
}

export interface IChat extends Document {
     chat_name: string;
     is_groupchat: boolean;
     members: ObjectId[];
     is_delete: boolean;
     admins: ObjectId[];
     icon: string;
     removed_members: ObjectId[];
}
export interface IMessage extends Document {
     chat_id: ObjectId;
     sender_id: ObjectId;
     content: string;
     content_type: string;
     file_type: string;
     delivered_to: ObjectId[]
     read_by: ObjectId[];
     reply_to: ObjectId;
     is_delete: boolean;
}

export interface INotification extends Document {
     user_id: ObjectId,
     message: string,
     sender_id: ObjectId,
     is_read: boolean
}

export interface IBoostedPost {
     post_id: ObjectId,
     clicks: ObjectId[],
     startingDate: Date,
     endingDate: Date,
     action: string,
     payment_details: ObjectId
}

export interface IPayment {
     user_id: ObjectId,
     amount: number,
     payment_method: string,
     transaction_id: string,
}