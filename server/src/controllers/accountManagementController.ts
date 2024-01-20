import { Request, RequestHandler, Response} from "express";
import asyncHandler from "express-async-handler";
import Interest from "../models/interestSchema"
import UserProfile from "../models/userProfile";


/**
 * @desc function for fetching all interests.
 * @route GET /api/manage-account/interest
 * @access private
 */
export const getAllInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const interest = await Interest.find();
        res.status(200).json({
            status: "ok",
            message: "Interest fetched",
            interest
        })
    }
)

/**
 * @desc function for fetching user interest.
 * @route GET /api/manage-account/interest
 * @access private
 */
export const getMyInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        console.log(req.body)
        const interest = await Interest.find({_id:{$in:req.body.interest}});
        res.status(200).json({
            status: "ok",
            message: "Interest fetched",
            interest
        })
    }
)

/**
 * @desc function for adding new interest.
 * @route POST /api/manage-account/interest/add-interest
 * @access private
 */
export const addInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const {choosedId} = req.body
        const userid = req.user?._id;
        const newUser = await UserProfile.findOneAndUpdate({user_id:userid },{$push:{interest:{$each:choosedId}}},{new : true})
        console.log(newUser)
        if(newUser){

            res.status(200).json({
                status:'ok',
                message: "new interest added"
            })
        }
    }
)

/**
 * @desc function for deleting an interest.
 * @route POST /api/manage-account/interest/:id
 * @access private
 */
export const deleteMyInterest: RequestHandler = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        console.log("request gpt")
        const interestId = req.params.id
        const userid = req.user?._id;
        const newUser = await UserProfile.findOneAndUpdate({user_id:userid },{$pull:{interest:interestId}},{new : true})
        if(newUser){
            res.status(200).json({
                status:'ok',
                message: "Interest deleted"
            })
        }
    }
)