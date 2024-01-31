import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Post from "../models/postSchema";
import Connection from "../models/connectionSchema";
import UserProfile from "../models/userProfile";
import { ObjectId } from 'mongodb';
import Comment from "../models/commentSchema";
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
        if (post) {
            res.status(201).json({
                status: 'created',
                message: 'new post was created'
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
        // const page: number = parseInt(req.query.page as string, 10) || 1;
        // const pageSize = 2;
        const interest = await UserProfile.findOne({ user_id: req.user?._id })
        const connection = await Connection.findOne({ user_id: req.user?._id });
        const following = connection?.following || [];
        const userId = req.user?._id;
        const posts = await Post.aggregate([
            {
                $match: {
                    user_id: { $in: [...following, userId].filter(Boolean) },
                    is_archive: false,
                    is_delete: false
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
        if (posts) {
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


