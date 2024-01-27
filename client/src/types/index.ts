export interface IInterest{
    _id?: string;
    interest: string;
    discription: string;
    image: string | File | undefined;

}

export interface IUserList{
    user_id: string;
    username: string;
    followers: number;
    following: number;
    profile_img: string;
    cover_img : string;
    email: string;
    followed:boolean
}

export interface IStory{
    user_id: string;
    _id: string;
    content : string;
    views : string;
    viewer_type: string;
    story_type :string;
    visibility: string;
    story_viewers :[{
        _id: string;
        user_id: string;
        viewed_on:Date;
        is_liked:boolean;
        comment:string
    }]
}
export interface userList{
    username: string;
    fullname: string;
    user_id: string;
    verified: boolean;
    profile_img: string;
    email: string;
}
