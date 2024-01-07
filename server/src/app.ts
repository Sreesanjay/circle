import express,{Request, Response, NextFunction} from "express";
import cors from "cors";
import morgan from "morgan"
import {errorHandler, notFound} from "./middlewares/errorHandler";
import "dotenv/config"

const app = express();
const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(morgan('dev'));
app.use(cors(corsConfig))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (req:Request, res:Response,next:NextFunction) => {
    console.log("request got")
    // throw new Error('internal server error')
})

//error handler
app.use('*', notFound)
app.use(errorHandler)

export default app;