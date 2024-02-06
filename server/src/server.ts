import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import * as Server from "socket.io"

const PORT = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
     console.log("mongodb connected");
     const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));
     const io = new Server.Server(server, {
          pingTimeout: 60000,
          cors: {
               origin: 'http://localhost:3000',
          },
     });
     io.on('connection', (socket) => {
          console.log('A user connected');
        
          // Handle real-time events here
          // Example: socket.on('chat message', (message) => { ... });
        
          socket.on('disconnect', () => {
            console.log('A user disconnected');
          });
        });
})
