import { Request, RequestHandler, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Story from "../models/storySchema";

/**
 * @desc function for adding new story
 * @route POST /api/story
 * @access private
 */
export const addStory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log(req.body)
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
        const story = await Story.find({ user_id: req.user?._id });
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
        const story = await Story.aggregate([
            {
                $match: { user_id: { $ne: req.user?._id } }
            },
            {
                $sort:{
                    createdAt:1
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
                                pipeline:[
                                    {
                                        $project:{
                                            _id:0,
                                            email:1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $unwind:{
                                path:'$email'
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                fullname: 1,
                                profile_img: 1,
                                email:1
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
        // console.log(story[0]);
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

