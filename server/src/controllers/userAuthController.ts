import { NextFunction, Request, RequestHandler, Response } from "express";
import { jwtDecode } from "jwt-decode";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import env from "../util/validateEnv"
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken, { getAccessToken } from "../util/generateJwt";
import User from "../models/userModel";
import OTP from "../models/otpSchema"
import UserProfile from "../models/userProfile"
import { IUser, IUserProfile } from "../Interfaces";
import generateUsername from "../util/generateUsername";
import generateFourDigitOTP from "../util/generateOtp";
import { sendMail } from "../config/nodeMailer";

interface IJwtPayload {
     email: string;
     given_name: string;
}
export const verifyMail: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          if (!req.body.email) {
               res.status(400)
               return next(Error("Invalid email address"))
          }
          const user = await User.findOne({ email: req.body.email });
          if (user) {

               res.status(200).json({
                    status: 'OK',
                    message: "email exist",
                    exists: true
               })
          } else {
               const otp = await generateFourDigitOTP();
               const salt = await bcrypt.genSalt(10);
               const hashedOtp = await bcrypt.hash(otp.toString(), salt);
               await OTP.updateOne(
                    { email: req.body.email },
                    { $set: { email: req.body.email, otp: hashedOtp } },
                    { upsert: true }
               );
               const mailOptions = {
                    from: "sreesanjay7592sachu@gmail.com",
                    to: req.body.email as string,
                    subject: "Registration to Circle",
                    text: `Your otp for registration is ${otp}`,
               }
               sendMail(mailOptions);

               res.status(201).json({
                    status: "created",
                    message: "OTP send successfully",
               })
          }
     })

export const verifyOtp: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          if (!req.body.otp) {
               res.status(400)
               return next(Error("Invalid otp"))
          }
          const otp = await OTP.findOne({ email: req.body.email });
          if (otp) {
               const match = await bcrypt.compare(req.body.otp, otp.otp);
               if (match) {
                    res.status(200).json({
                         status: "ok",
                         message: "otp matched",
                         matchOtp: true
                    })
               } else {
                    res.status(200).json({
                         status: "ok",
                         message: "Wrong otp",
                         matchOtp: false
                    })
               }
          } else {
               res.status(404);
               next(Error("Email not found"))
          }
     })

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
                    const { accessToken, refreshToken } = await generateToken(newUser.email, newUser._id);
                    res.status(201).json({
                         status: "created",
                         message: "User registered successfully",
                         user: {
                              _id: newUser._id,
                              email: newUser.email,
                              role: newUser.role
                         },
                         token: accessToken,
                         refreshToken
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

          const { email }: IJwtPayload = jwtDecode(credential);
          const existingUser = await User.findOne({ email: email });

          if (existingUser) {
               if (existingUser.password) {
                    return next(Error("Invalid Email"))
               }
               const { accessToken, refreshToken } = await generateToken(
                    existingUser.email,
                    existingUser._id
               );
               res.status(200).json({
                    status: "ok",
                    message: "User loged in successfully",
                    user: {
                         _id: existingUser._id,
                         email: existingUser.email,
                         role: existingUser.role
                    },
                    token: accessToken,
                    refreshToken
               });
          } else {
               const username = await generateUsername();
               const user = new User({
                    email: email,
               });
               if (user) {
                    const newUser: IUser = await user.save();
                    const userProfile = new UserProfile({ username, user_id: newUser._id })
                    const newUserProfile: IUserProfile = await userProfile.save();
                    if (newUserProfile) {

                         const { accessToken, refreshToken } = await generateToken(newUser.email, newUser._id);
                         res.status(201).json({
                              status: "created",
                              message: "User registered successfully",
                              user: {
                                   _id: newUser._id,
                                   email: newUser.email,
                                   role: newUser.role
                              },
                              token: accessToken,
                              refreshToken
                         });
                    }
               }
          }
     }
);

export const signin = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          const { email, password } = req.body;
          if (!email || !password) {
               res.status(400);
               return next(Error("Invlalid Credentials"));
          }
          const user = await User.findOne({ email: email, is_blocked: false })
          if (!user || !user.password) {
               res.status(409);
               return next(Error("Email or password not valid"));
          }
          const match = await bcrypt.compare(password, user.password);
          if (match) {
               const { accessToken, refreshToken } = await generateToken(user.email, user._id);
               res.status(201).json({
                    status: "ok",
                    message: "User loged in successfully",
                    user: {
                         _id: user._id,
                         email: user.email,
                         role: user.role
                    },
                    token: accessToken,
                    refreshToken
               });
          } else {
               res.status(401);
               next(Error("Email or password not valid"));
          }

     }
)

export const resetPassword = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          const { old_password, new_password } = req.body;
          if (!old_password || !new_password) {
               res.status(400);
               return next(Error("Invlalid Credentials"));
          }
          const user = await User.findById(req.user?._id);
          if (user) {
               const match = await bcrypt.compare(old_password, user.password)
               if (!match) {
                    res.status(406)
                    return next(Error("Invalid Old Password"));
               } else {
                    user.password = new_password;
                    await user.save();
                    res.status(200).json({
                         status: "ok",
                         message: "Password reset successfully"
                    })
               }

          } else {
               next(Error("server error"))
          }

     }
)


export const refreshToken = asyncHandler(
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          const { refreshToken } = req.body;
          if (!refreshToken) {
               res.status(401);
               return next(new Error('Invalid refresh token'))
          }
          const decoded = jwt.verify(refreshToken, env.JWT_REFRESHTOKEN_SECRET) as JwtPayload;

          const userId = new ObjectId(
               decoded.id
          );
          const user = await User.findOne({ _id: userId })
          if (user) {
               const token = getAccessToken(user.email, user._id)
               if (token) {
                    res.status(201).json({
                         status: 'created',
                         message: 'Access token created',
                         token
                    })
               }
          } else {
               res.status(401)
               next(new Error('user not found'))
          }

     })
