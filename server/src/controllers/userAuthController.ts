import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateJwt";
import User from "../models/userModel";
import { IUser } from "../Interfaces";

/**
 * @desc User registration and authentication 
 * @route POST /api/signup
 * @access public
 */

export const signup: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log(req.body)
          const { email, username, password } = req.body;
          if (!email || !username || !password) {
               res.status(400);
               return next(Error("Invlalid Credentials"));
          }
          const emailExist = await User.findOne({ email: email });
          if (emailExist) {
               res.status(409);
               return next(Error("Email Already exists"));
          }
          const userNameExist = await User.findOne({ username: username });
          if (userNameExist) {
               res.status(409);
               return next(Error("Username Already exists"));
          }

          const user = new User({ email, username, password });
          if (user) {
               const newUser: IUser = await user.save();
               console.log(newUser)
               const token = generateToken(newUser._id);
               res.status(201).json({
                    status: "created",
                    message: "User registered successfully",
                    user : {
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        role : newUser.role
                    },
                    token 
               });
          }
     }
);
