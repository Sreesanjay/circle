import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Story from "../models/storySchema";
import UserProfile from "../models/userProfile";
import Connection from "../models/connectionSchema";

/**
 * @desc function for adding new story
 * @route POST /api/story
 * @access private
 */
export const addStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { story_type, content, visibility, background, color } = req.body;
        if (!story_type || !content || !visibility) {
            res.status(400);
            return next(Error("Invalid credentials"));
        }
        const newStory = new Story({
            story_type, content, visibility,
            user_id: req.user?._id,
            ...(background && { background }),
            ...(color && { color }),
        });
        const story = await newStory.save();
        if (story) {
            res.status(201).json({
                status: 'created',
                message: "New Story uploaded",
                story
            })
        } else {
            next(Error("Server error"))
        }
    }
)

/**
 * @desc function for fetching my story
 * @route GET /api/story
 * @access private
 */
export const getMyStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        const story = await Story.find({ user_id: req.user?._id, "createdAt": { $gte: twentyFourHoursAgo } });
        if (story) {
            res.status(200).json({
                status: 'OK',
                message: "my stories fetched",
                story
            })
        } else {
            next(Error("Server Error"))
        }
    })

/**
 * @desc function for fetching my story
 * @route GET /api/story/all-stories
 * @access private
 */
export const getStories: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const connection = await Connection.find({ following: { $in: req.user?._id } }, { _id: 0, user_id: 1 })
        const close_friend = await Connection.find({ close_friend: { $in: req.user?._id } }, { _id: 0, user_id: 1 })
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
        const story = await Story.aggregate([
            {
                $match: {
                    user_id: {
                        $in: connection.map(item => item.user_id)
                    },
                    createdAt: { $gte: twentyFourHoursAgo }
                }
            },
            {
                $match: {
                    $or: [
                        { "visibility": { $ne: "CLOSE_FRIENDS" } },  // Include stories with other visibility types
                        {
                            $and: [
                                { "visibility": "CLOSE_FRIENDS" },
                                { "user_id": { $in: close_friend.map(item => item.user_id) } }
                            ]
                        }
                    ]
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $group: {
                    _id: '$user_id',
                    stories: {
                        $push: '$$ROOT'
                    },
                }
            },
            {
                $lookup: {
                    from: 'userprofiles',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'user_details',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'email',
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
                                path: '$email'
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                fullname: 1,
                                profile_img: 1,
                                email: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$user_details'
                }
            },
        ])
        if (story) {
            res.status(200).json({
                status: 'OK',
                message: "stories fetched",
                story
            })
        } else {
            next(Error("Server Error"))
        }
    })



/**
 * @desc function for adding view to a story
 * @route PUT /api/story/view-story
 * @access private
 */
export const viewStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const exist = await Story.findById(id);
        if (!exist) {
            res.status(400);
            return next(new Error('Story not found'))
        }
        const story = await Story.findOneAndUpdate({ _id: id }, { $addToSet: { story_viewers: req.user?._id } }, { new: true });
        if (story) {
            res.status(200).json({
                status: 'ok',
                message: 'story viewers updated',
                story
            })
        } else {
            next(new Error("Internal server error"))
        }
    })



/**
 * @desc function for adding view to a story
 * @route PUT /api/story/like-story/:id
 * @access private
 */
export const likeStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const exist = await Story.findById(id);
        if (!exist) {
            res.status(400);
            return next(new Error('Story not found'))
        }
        const story = await Story.findOneAndUpdate({ _id: id }, { $addToSet: { likes: req.user?._id } }, { new: true });
        if (story) {
            res.status(200).json({
                status: 'ok',
                message: 'like added',
                story
            })
        } else {
            next(new Error("Internal server error"))
        }
    })

/**
 * @desc function for adding view to a story
 * @route PUT /api/story/like-story/:id
 * @access private
 */
export const dislikeStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const exist = await Story.findById(id);
        if (!exist) {
            res.status(400);
            return next(new Error('Story not found'))
        }
        const story = await Story.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user?._id } }, { new: true });
        if (story) {
            res.status(200).json({
                status: 'ok',
                message: 'dislike added',
                story
            })
        } else {
            next(new Error("Internal server error"))
        }
    })


/**
 * @desc function for getting story viewers
 * @route PUT /api/story/get-viewers-list/:id
 * @access private
 */
export const getUserList: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const exist = await Story.findById(id);
        if (!exist) {
            res.status(400);
            return next(new Error('Story not found'))
        }
        const userList = await UserProfile.aggregate([
            {
                $match: { user_id: { $in: exist.story_viewers } },

            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'email',
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
                    path: '$email'
                }
            }

        ])
        if (userList) {
            res.status(200).json({
                status: 'ok',
                message: 'dislike added',
                userList
            })
        } else {
            next(new Error("Internal server error"))
        }
    })


/**
 * @desc function for deleting story
 * @route DELETE /api/story/:id
 * @access private
 */
export const deleteStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;
        const deletedStory = await Story.findOneAndDelete({ _id: id }, { new: true });
        if (deletedStory) {
            res.status(200).json({
                status: 'ok',
                message: 'story deleted',
                story_id: id
            })
        } else {
            next(new Error("Internal server error"))
        }
    })