import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Notification from "../models/notificationSchema";
import Post from "../models/postSchema";
import Connection from "../models/connectionSchema";
import UserProfile from "../models/userProfile";
import { ObjectId } from 'mongodb';
import BoostPost from "../models/boostedPostSchema";
import Comment from "../models/commentSchema";
import SavedPost from "../models/savedPost";

/**
 * @desc function for uploading post
 * @route POST /api/posts
 * @access private
 */
export const uploadPost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.body) {
            return next(new Error('Internal Server Error'));
        }
        const newpost = new Post({ ...req.body, user_id: req.user?._id });
        const post = await newpost.save();
        const newPost = await Post.aggregate([
            {
                $match: {
                    _id: post._id
                }
            },
            {
                $lookup: {
                    from: "savedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_saved",
                    pipeline: [
                        {
                            $match: {
                                user_id: req.user?._id
                            }
                        },
                        {
                            $project: {
                                user_id: 0,
                                post_id: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'comments'
                }
            },
            {
                $project: {
                    user_id: 1,
                    is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                    user_details: 1,
                    comment: { $size: "$comments" },
                    type: 1,
                    content: 1,
                    caption: 1,
                    tags: 1,
                    visibility: 1,
                    impressions: 1,
                    profile_visit: 1,
                    createdAt: 1,
                    likes: 1
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: "user_details",
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: "$user_details"
                }
            }

        ])

        if (post) {
            res.status(201).json({
                status: 'created',
                message: 'new post was created',
                post: newPost[0]
            })
        } else {
            next(new Error('Internal Server Error'))
        }
    })

/**
 * @desc function for fetching posts
 * @route GET /api/posts
 * @access private
 */
export const getPosts: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page = (req.query.page && typeof (req.query.page) === "string") ? req.query.page : null
        const pageSize = 3;
        const interest = await UserProfile.findOne({ user_id: req.user?._id })
        const connection = await Connection.findOne({ user_id: req.user?._id });
        const following = connection?.following || [];
        const userId = req.user?._id;
        const query = page ? {
            createdAt: { $lt: new Date(page) }
        } : {}
        const posts = await Post.aggregate([
            {
                $match: {
                    $or:[
                        {user_id: { $in: [...following, userId].filter(Boolean) }},
                        { tags: { $in: interest?.interest || [] } }
                    ],
                    is_archive: false,
                    is_delete: false,

                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $match: query
            },
            {
                $limit: pageSize
            },
            {
                $lookup: {
                    from: "savedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_saved",
                    pipeline: [
                        {
                            $match: {
                                user_id: req.user?._id
                            }
                        },
                        {
                            $project: {
                                user_id: 0,
                                post_id: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "boostedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_boosted",
                    pipeline: [
                        {
                            $match: {
                                endingDate: { $gt: new Date() }
                            }
                        }
                    ]
                }
            },
            { $unwind: { path: "$is_boosted", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'comments'
                }
            },
            {
                $project: {
                    user_id: 1,
                    is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                    comment: { $size: "$comments" },
                    type: 1,
                    clicks: 1,
                    content: 1,
                    caption: 1,
                    tags: 1,
                    visibility: 1,
                    is_boosted: 1,
                    impressions: 1,
                    createdAt: 1,
                    likes: 1
                }
            }, {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: "user_details",
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $lookup: {
                                from: 'verifications',
                                localField: 'user_id',
                                foreignField: 'user_id',
                                as: 'verified',
                                pipeline: [
                                    {
                                        $match: {
                                            endingDate: { $gt: new Date() }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1,
                                verified: { $cond: { if: { $gt: [{ $size: "$verified" }, 0] }, then: true, else: false } },
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: "$user_details"
                }
            }

        ])

        const boosted = await BoostPost.aggregate([
            {
                $match: {
                    endingDate: { $gt: new Date() }
                }
            },
            { $sample: { size: 1 } }
        ])


        const add = await Post.aggregate([
            {
                $match: {
                    _id: boosted[0]?.post_id
                }
            },
            {
                $lookup: {
                    from: "savedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_saved",
                    pipeline: [
                        {
                            $match: {
                                user_id: req.user?._id
                            }
                        },
                        {
                            $project: {
                                user_id: 0,
                                post_id: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "boostedposts",
                    localField: '_id',
                    foreignField: 'post_id',
                    as: "is_boosted",
                    pipeline: [
                        {
                            $match: {
                                endingDate: { $gt: new Date() }
                            }
                        }
                    ]
                }
            },
            { $unwind: { path: "$is_boosted", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'comments'
                }
            },
            {
                $project: {
                    user_id: 1,
                    is_saved: { $cond: { if: { $gt: [{ $size: "$is_saved" }, 0] }, then: true, else: false } },
                    comment: { $size: "$comments" },
                    type: 1,
                    clicks: 1,
                    content: 1,
                    caption: 1,
                    tags: 1,
                    visibility: 1,
                    is_boosted: 1,
                    impressions: 1,
                    createdAt: 1,
                    likes: 1
                }
            },
            {
                $match: {
                    $or: [
                        { user_id: userId },
                        { tags: { $in: interest?.interest || [] } }
                    ],

                }
            }, {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: "user_details",
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        }, {
                            $lookup: {
                                from: 'verifications',
                                localField: 'user_id',
                                foreignField: 'user_id',
                                as: 'verified',
                                pipeline: [
                                    {
                                        $match: {
                                            endingDate: { $gt: new Date() }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1,
                                verified: { $cond: { if: { $gt: [{ $size: "$verified" }, 0] }, then: true, else: false } },
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: "$user_details"
                }
            },



        ])
        if (add[0]) {
            posts.push(add[0])
        }

        if (posts) {
            if (posts.length) {
                const postIds = posts.map(post => post?._id);
                await Post.updateMany({ _id: { $in: postIds } }, { $addToSet: { impressions: req.user?._id } })
            }
            res.status(200).json({
                status: 'ok',
                message: 'Posts fetched successfully',
                posts
            })
        } else {
            next(new Error('Internal server error'))
        }
    })


/**
* @desc function for posting comment
* @route POST /api/posts/comment
* @access private
*/
export const postComment: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { post_id, reply, content } = req.body;
        const post = await Post.findById(post_id);
        if (!post) {
            res.status(400);
            return next({ msg: "Post does not exist." });
        }

        if (reply) {
            const cm = await Comment.findById(reply);
            if (!cm) {
                res.status(400);
                return next({ msg: "Comment does not exist." });
            }
        }

        const newComment = new Comment({
            user_id: req.user?._id,
            content,
            reply,
            post_id
        });
        const comment = await newComment.save();
        const resComment = await Comment.aggregate([
            {
                $match: {
                    _id: comment._id
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_details',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: '$user_details'
                }
            },

        ])
        if (newComment) {
            const commentedUser = await UserProfile.findOne({ user_id: req.user?._id });
            const newMessage = new Notification({
                user_id: post.user_id,
                sender_id: req.user?._id,
                message: `${commentedUser?.username} commented on your post`
            })
            newMessage.save()

            res.status(201).json({
                status: 'created',
                message: 'Comment added',
                newComment: resComment[0]
            })
        } else {
            next("Internal server error")
        }
    })



/**
* @desc function for posting comment
* @route GET /api/posts/comment/:id
* @access private
*/
export const getComments: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            res.status(400)
            return next(new Error('Comment not found'))
        }
        const comments = await Comment.aggregate([
            {
                $match: {
                    post_id: new ObjectId(id),
                    reply: { $exists: false }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_details',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: '$user_details'
                }
            },
        ])
        if (comments) {
            res.status(200).json({
                status: 'ok',
                message: 'comments fetched',
                comments
            })
        } else {
            next(new Error("Internal server error"))
        }
    })





/**
* @desc function for posting comment
* @route GET /api/posts/comment/replys/:id
* @access private
*/
export const getReplys: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            res.status(400)
            return next(new Error('Comment not found'))
        }
        const replys = await Comment.aggregate([
            {
                $match: {
                    reply: new ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_details',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                email: 1
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: '$user_details'
                }
            },
        ])
        if (replys) {
            res.status(200).json({
                status: 'ok',
                message: 'replys fetched',
                replys
            })
        } else {
            next(new Error("Internal server error"))
        }
    })



/**
* @desc function for adding like
* @route GET /api/posts/like/:id
* @access private
*/
export const addLike: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            res.status(400)
            return next(new Error('post not not found'))
        }
        const post = await Post.findOneAndUpdate({ _id: id }, { $push: { likes: req.user?._id } }, { new: true });

        if (post) {
            const user = await UserProfile.findOne({ user_id: req.user?._id });
            const newMessage = new Notification({
                user_id: post.user_id,
                sender_id: req.user?._id,
                message: `${user?.username} liked your post`
            })
            newMessage.save()
            res.status(200).json({
                status: 'ok',
                message: 'replys fetched',
                post,
                user_id: req.user?._id
            })
        } else {
            next(new Error("Internal server error"))
        }
    })


/**
* @desc function for adding like
* @route GET /api/posts/dislike/:id
* @access private
*/
export const disLike: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        if (!id) {
            res.status(400)
            return next(new Error('post not not found'))
        }
        const post = await Post.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user?._id } }, { new: true });
        if (post) {
            res.status(200).json({
                status: 'ok',
                message: 'replys fetched',
                post,
                user_id: req.user?._id
            })
        } else {
            next(new Error("Internal server error"))
        }
    })

/**
* @desc function for saving post
* @route POST /api/posts/save
* @access private
*/
export const savePost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const post_id = req.body.post_id
        if (!post_id) {
            res.status(400)
            return next(new Error('post not not found'))
        }
        const data = new SavedPost({
            user_id: req.user?._id,
            post_id: post_id
        })
        const saved = await data.save()
        if (saved) {
            res.status(200).json({
                status: 'ok',
                message: 'post saved',
                saved,
            })
        } else {
            next(new Error("Internal server error"))
        }
    })

/**
* @desc function for saving post
* @route PUT /api/posts/unsave
* @access private
*/
export const unsavePost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const post_id = req.params.id
        if (!post_id) {
            res.status(400)
            return next(new Error('post not not found'))
        }
        const unsaved = await SavedPost.findOneAndDelete({ post_id: post_id, user_id: req.user?._id })
        if (unsaved) {
            res.status(200).json({
                status: 'ok',
                message: 'post saved',
                unsaved,
            })
        } else {
            next(new Error("Internal server error"))
        }
    })

/**
* @desc function for deleting post
* @route DELETE /api/posts/:id
* @access private
*/
export const deletePost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const post_id = req.params.id
        if (!post_id) {
            res.status(400)
            return next(new Error('post not not found'))
        }
        const deleted = await Post.findOneAndUpdate({ _id: post_id }, { $set: { is_delete: true } }, { new: true })
        if (deleted) {
            res.status(200).json({
                status: 'ok',
                message: 'post deleted',
                post_id,
            })
        } else {
            next(new Error("Internal server error"))
        }
    })

/**
* @desc function for editing post
* @route PUT /api/posts/:id
* @access private
*/
export const editPost: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const post_id = req.params.id;
        const { caption, visibility, tags } = req.body
        if (!post_id) {
            res.status(400)
            return next(new Error('post not not found'))
        }
        const post = await Post.findOneAndUpdate({ _id: post_id }, { $set: { caption, visibility, tags } }, { new: true })
        if (post) {
            res.status(200).json({
                status: 'ok',
                message: 'post deleted',
                post,
            })
        } else {
            next(new Error("Internal server error"))
        }
    })



/**
* @desc function for fetching liked users list
* @route PUT /api/posts/liked-user-list/:id
* @access private
*/
export const likedUserList: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const post_id = req.params.id;
        const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 0;
        const searchKey = req.query.search;
        const post = await Post.findById(post_id)
        const userIds = post?.likes.map(like => like);
        interface UserProfileDocument {
            username: string;
            fullname: string;
            profile_img: string;
            user_id: {
                _id: ObjectId;
                email: string;
            };
        }
        const userProfile: UserProfileDocument[] = await UserProfile.find({ user_id: { $in: userIds } }).populate({
            path: 'user_id',
            select: ['username', 'fullname', 'profile_img', 'email']
        });
        const userDetails = userProfile.map((user) => {
            return {
                username: user.username,
                fullname: user.fullname,
                profile_img: user.profile_img,
                user_id: user.user_id._id,
                email: user.user_id.email
            }
        })


        if (userDetails) {
            let userList = userDetails?.filter((item) => {
                return searchKey === ""
                    ? item
                    : item.username
                        .toLowerCase()
                        .includes(searchKey as string) ||
                    item.fullname
                        ?.toLowerCase()
                        .includes(searchKey as string);
            })
            userList = userList.slice(page, page + 10)
            res.status(200).json({
                status: 'ok',
                message: 'followers details fetched',
                userList
            })
        } else {
            next(new Error("Server error"))
        }
    })


