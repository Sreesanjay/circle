import express from "express";
import cors from "cors";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import "dotenv/config";
import userRouter from "./routes/userRoute"
import adminRouter from './routes/adminRoute'
const app = express();
const ORIGIN = "https://my-circle.online"
// const ORIGIN = "http://localhost:5173"

const corsConfig = {
    origin: ORIGIN,
    credentials: true,
};
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(corsConfig))

//routes
app.use('/api', userRouter)
app.use('/api/admin', adminRouter)


//error handler
app.use('*', notFound)
app.use(errorHandler)

export default app;