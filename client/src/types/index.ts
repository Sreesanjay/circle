export interface IInterest {
    _id?: string;
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
    likes: string[];
    story_viewers: string[];
}

export interface IStories {
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
    user_id: string,
    username: string;
    fullname: string;
    verified?: boolean;
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
    impressions: string[];
    comment: number;
    clicks?: string[];
    is_boosted?: IBoosted;
    reports: [];
    createdAt: Date;
    likes: string[];
}

export interface IBoosted {
    _id: string;
    post_id: string;
    plan_id: string;
    startingDate: Date;
    endingDate: Date;
    action: string;
}

export interface IChat {
    _id: string;
    chat_name: string;
    members: string[];
    admins: string[];
    is_groupchat: boolean;
    is_delete: boolean;
    latest_message: IMessage;
    createdAt: Date;
    icon: string;
    reports?: [];
    removed_members: string[];
}
export interface IMessage {
    _id: string;
    chat_id: string;
    sender_id: string;
    content: string;
    read_by: string[];
    reply_to: string;
    is_delete: boolean;
    createdAt: Date;
    userDetails: userList;
    content_type: string;
    file_type?: string;
}

export interface SendMessage {
    _id: string;
    chat_id: string;
    sender_id: string;
    content: string;
    read_by: string[];
    reply_to: string;
    content_type: string;
    file_type?: string;
    is_delete: boolean;
    createdAt: Date;
    members: string[];
    userDetails: userList
}

export interface INotification {
    _id: string;
    user_id: string;
    message: string;
    createdAt: Date;
    is_read: boolean;
    userProfile: userList
}

export interface ICommunity {
    _id: string;
    community_name: string;
    topic: string;
    about: string;
    icon: string;
    privacy: string;
    createdAt: Date;
    is_delete?: boolean;
    reports?: []
    members: {
        community_id: string;
        user_id: string;
        is_admin: boolean;
        status: string;
        createdAt: Date
    }[]
}

export interface IDiscussion {
    _id: string;
    content: string;
    user_id: string;
    likes: string[];
    comments: number,
    content_type: string;
    file_type: string;
    caption: string;
    community_id: string;
    is_delete: boolean;
    reports?: [];
    createdAt: Date;
    userProfile: userList
}

export interface IDiscussionComment {
    _id: string;
    user_id: string;
    post_id: string;
    user_details: {
        user_id: string;
        username: string;
        profile_img: string;
        email: string
    }
    reply: string;
    likes: string[];
    content: string;
    createdAt: Date;

}

export interface IPlan {
    _id: string,
    amount: number,
    discription: string,
    type: string,
    duration: number,
    is_active: boolean
}