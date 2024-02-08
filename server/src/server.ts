import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import { Server } from "socket.io"

const PORT = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
     console.log("mongodb connected");
     const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));
     const io = new Server(server, {
          pingTimeout: 60000,
          cors: {
               origin: 'http://localhost:5173',
               credentials: true,
          },
     });

     interface User {
          userId: string;
          socketId: string;
     }

     let activeUsers: User[] = [];

     io.on('connection', (socket) => {
          socket.on("new-user-add", (newUserId) => {
               socket.join(newUserId);
               if (!activeUsers.some((user) => user.userId === newUserId)) {
                    activeUsers.push({ userId: newUserId, socketId: socket.id });
               }
               io.emit("get-users", activeUsers);
          });

          socket.on('getActiveUsers', () => {
               io.emit("get-users", activeUsers);
          })

          socket.on('join-room', (room) => {
               socket.join(room);
          });

          socket.on('typing', (details) => {
               console.log(details, "typing-------")
               socket.in(details.room).emit('start-typing', details)
          })
          // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

          socket.on('send-message', (newMessage) => {
               newMessage?.members.forEach((user: string) => {
                    const reciever = activeUsers.find((item) => item.userId === user);
                    if (!reciever && reciever === newMessage.sender_id) return;

                    delete newMessage.members
                    if (reciever) {
                         socket.to(reciever.socketId).emit('recieve-message', newMessage)
                    }
               });
          })


          socket.on('disconnect', () => {
               activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

               io.emit("get-users", activeUsers);
          });
     });
})
