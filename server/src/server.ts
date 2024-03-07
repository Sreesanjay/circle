import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import socketio from "./socket"
const PORT = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
     console.log("mongodb connected");
     const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const io = socketio.getIo(server);

})

