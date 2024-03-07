import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import env from "../util/validateEnv";
import { IUser } from '../Interfaces';
import mongoose from 'mongoose';


declare module 'express' {
    interface Request {
        user?: IUser;
    }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, env.JWT_ACCESSTOKEN_SECRET) as JwtPayload;
            const userId = new mongoose.Types.ObjectId(
                decoded.id
            );
            const user = await User.findById({ _id: userId })
            if (!user || user.role !== 'USER') {
                res.status(401)
                next(Error('Unauthorized user'))
            } else if (user.is_blocked) {
                res.status(401)
                next(Error('Account has been blocked'))
            }
            else {
                req.user = user;
            }
            next();
        } catch (error) {
            res.status(401);
            next(new Error('Not authorized, token failed'));
        }
    } else {
        res.status(401);
        res.status(401);
        next(new Error('Not authorized, token failed'));
    }
});

export const protectAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, env.JWT_ACCESSTOKEN_SECRET) as JwtPayload;
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