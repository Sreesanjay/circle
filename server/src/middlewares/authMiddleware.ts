import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import env from "../util/validateEnv";
import mongoose,{Document} from 'mongoose';
// import {IUser} from "../Interfaces/index.js"
// interface UserRequest extends Request {
//     user: IUser; // Assuming User is your model for users
// }

declare module 'express' {
    interface Request {
      user?: Document; 
    }
  }

export const protect = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
            const userId = new mongoose.Types.ObjectId(
                decoded.id
            );
            const user = await User.findOne({ _id: userId, is_blocked: false })
            if (!user || user.role !== 'USER') {
                res.status(401)
                throw new Error('Unauthorized user')
            } else {
                req.user = user;
            }
              next();
        } catch (error) {
              res.status(401);
              throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export const protectAdmin = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
            const userId = new mongoose.Types.ObjectId(
                decoded.id
            );
            const user = await User.findOne({ _id: userId })
            if (!user || user.role !== 'ADMIN') {
                res.status(401)
                throw new Error('Unauthorized user')
            } else {
                req.user = user;
            }
              next();
        } catch (error) {
              res.status(401);
              throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});