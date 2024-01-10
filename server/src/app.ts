import express from "express";
import cors from "cors";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import {errorHandler, notFound} from "./middlewares/errorHandler";
import "dotenv/config";
import userRouter from "./routes/userRoute"

const app = express();
const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors(corsConfig))

//routes
app.use('/api' ,userRouter)


//error handler
app.use('*', notFound)
app.use(errorHandler)

export default app;