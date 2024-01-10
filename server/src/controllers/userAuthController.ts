import {Request, RequestHandler, Response} from "express"
import asyncHandler  from "express-async-handler";
import User from "../models/userModel"


export const signup: RequestHandler  = asyncHandler(async(req : Request, res : Response):Promise<void> => {
    const {email,username,password} = req.body;
    if((!email) || (!username) || (!password)) {
        throw new Error("Invlalid Credentials")
    }
    const exist  =  await User.findOne({$or:[{ email: email},{username : username}]});
    if(exist) {
        
    }

})
