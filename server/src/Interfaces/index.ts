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

export interface IVerification extends Document {
     user_id: ObjectId;
     startingDate: Date,
     endingDate: Date,
     plan_id: ObjectId,
     document: string;
     document_type: string;
     payment_details: ObjectId
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
     clicks: ObjectId[],
     impressions: ObjectId[];
     likes: ObjectId[];
     comment: ObjectId;
     is_delete: boolean;
     is_archive: boolean;
     type: string;
}

export interface IComment extends Document {
     post_id: ObjectId;
     user_id: ObjectId;
     content: string;
     likes: ObjectId[]
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
     startingDate: Date,
     endingDate: Date,
     plan_id: ObjectId,
     action: string,
     payment_details: ObjectId
}

export interface IPlans {
     amount: number,
     is_active: boolean,
     discription: string,
     type: string,
     duration: number
}

export interface IPayment {
     user_id: ObjectId,
     amount: number,
     payment_method: string,
     payment_id: string,
     order_id: string,
}

export interface ICommunity {
     community_name: string,
     icon: string,
     topic: ObjectId,
     about: string,
     privacy: string,
     is_delete: boolean,
}

export interface IMember {
     community_id: ObjectId,
     user_id: ObjectId,
     is_admin: boolean,
     status: string
}

export interface IDiscussions {
     community_id: ObjectId,
     user_id: ObjectId,
     content: string,
     likes: ObjectId[],
     caption: string,
     content_type: string,
     file_type: string;
     is_delete: boolean;
}
