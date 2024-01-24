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
        const { story_type, content, visibility } = req.body;
        if (!story_type || !content || !visibility) {
            res.status(400);
            return next(Error("Invalid credentials"));
        }
        const newStory = new Story({
            story_type, content, visibility,
            user_id:req.user?._id
        });
        const story =await newStory.save();
        if(story){
            res.status(201).json({
                status:'created',
                message:"New Story uploaded",
                story
            })
        }else{
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
        const story = await Story.find({user_id:req.user?._id});
        if(story){
            res.status(200).json({
                status: 'OK',
                message: "my stories fetched",
                story
            })
        }else{
            next(Error("Server Error"))
        }
    }
)
