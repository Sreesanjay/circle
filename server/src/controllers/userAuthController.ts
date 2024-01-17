import { NextFunction, Request, RequestHandler, Response } from "express";
import { jwtDecode } from "jwt-decode";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateJwt";
import User from "../models/userModel";
import UserProfile from "../models/userProfile"
import { IUser, IUserProfile } from "../Interfaces";
import generateUsername from "../util/generateUsername";

interface JwtPayload {
     email: string;
     given_name: string;
}

/**
 * @desc User registration and authentication
 * @route POST /api/signup
 * @access public
 */

export const signup: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

          const user = new User({ email, password });
          if (user) {
               const newUser: IUser = await user.save();
               const userProfile = new UserProfile({ username, user_id: newUser._id })
               const newUserProfile: IUserProfile = await userProfile.save();
               if (newUserProfile) {
                    const token = generateToken(newUser.email, newUser._id);
                    res.status(201).json({
                         status: "created",
                         message: "User registered successfully",
                         user: {
                              _id: newUser._id,
                              email: newUser.email,
                              role: newUser.role
                         },
                         token,
                    });
               }
          }
     }
);

/**
 * @desc User registration and authentication using google
 * @route POST /api/google-auth
 * @access public
 */
export const googleAuth: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          const { credential } = req.body;

          if (!credential) {
               res.status(400);
               return next(Error("Invalid credentials"));
          }

          const { email }: JwtPayload = jwtDecode(credential);
          const existingUser = await User.findOne({ email: email });

          if (existingUser) {
               if (existingUser.password) {
                    return next(Error("Invalid Email"))
               }
               const token = generateToken(
                    existingUser.email,
                    existingUser._id
               );
               res.status(201).json({
                    status: "created",
                    message: "User loged in successfully",
                    user: {
                         _id: existingUser._id,
                         username: existingUser.username,
                         email: existingUser.email,
                         role: existingUser.role,
                         profile_img: existingUser.profile_img
                    },
                    token,
               });
          } else {
               const username = await generateUsername();
               const user = new User({
                    email: email,
                    username: username,
               });
               if (user) {
                    const newUser: IUser = await user.save();
                    const token = generateToken(newUser.email, newUser._id);
                    res.status(201).json({
                         status: "created",
                         message: "User registered successfully",
                         user: {
                              _id: newUser._id,
                              username: newUser.username,
                              email: newUser.email,
                              role: newUser.role,
                              profile_img: user.profile_img
                         },
                         token,
                    });
               }
          }
     }
);

export const signin = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          const { email, password } = req.body;
          console.log(req.body);
          if (!email || !password) {
               res.status(400);
               return next(Error("Invlalid Credentials"));
          }
          const user = await User.findOne({ email: email })
          if (!user || !user.password) {
               res.status(409);
               return next(Error("Email or password not valid"));
          }
          const match = await bcrypt.compare(password, user.password);
          if (match) {
               const token = generateToken(user.email, user._id);
               res.status(201).json({
                    status: "created",
                    message: "User registered successfully",
                    user: {
                         _id: user._id,
                         username: user.username,
                         email: user.email,
                         role: user.role,
                         profile_img: user.profile_img
                    },
                    token,
               });
          } else {
               res.status(401);
               next(Error("Email or password not valid"));
          }

     }
)
