export interface IInterest {
    _id: string;
    interest: string;
    discription: string;
    image: string | File | undefined;

}

export interface IUserList {
    _id: string;
    user_id: string;
    username: string;
    fullname: string;
    followers: number;
    following: number;
    profile_img: string;
    cover_img: string;
    is_blocked: boolean;
    email: string;
    bio: string;
    reports: [];
    followed: boolean
}

export interface IStory {
    user_id: string;
    _id: string;
    content: string;
    story_type: string;
    visibility: string;
    background: string;
    color: string;
    likes:string[];
    story_viewers: string[];
}

export interface IStories{
    stories: IStory[],
    user_details: IuserDetails;
}
export interface userList {
    username: string;
    fullname: string;
    user_id: string;
    verified: boolean;
    profile_img: string;
    email: string;
}

export interface IComment {
    _id: string;
    user_id: string;
    post_id: string;
    user_details: {
        user_id: string;
        username: string;
        profile_img: string;
        email: { email: string }
    }
    reply: string
    content: string;
    createdAt: Date;

}

export interface IuserDetails {
    user_id:string,
    username: string;
    fullname: string;
    profile_img: string;
    email: {
        email: string;
    }
}

export interface IPost {
    _id: string;
    user_id: string;
    is_saved: boolean;
    user_details: IuserDetails;
    type: string;
    content: string;
    caption: string;
    is_delete: boolean,
    tags: string[];
    visibility: string;
    impressions: number;
    profile_visit: number;
    comment: number;
    reports: [];
    createdAt: Date;
    likes: string[];
}