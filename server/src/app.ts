import express,{Request, Response, NextFunction} from "express";
import "dotenv/config"

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (req:Request, res:Response,next:NextFunction) => {
    console.log("request got")
})

export default app;