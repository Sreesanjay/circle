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

          socket.on("setup", (newUserId) => {
               const user = activeUsers.find((item) => item.userId === newUserId);
               if (!user || user.socketId !== socket.id) {
                    const newUser = { userId: newUserId, socketId: socket.id };
                    activeUsers.push(newUser);
               }
               io.emit("connected", activeUsers);
          });

          socket.on('join-room', (room) => {
               console.log("joined room=>", room)
               socket.join(room);
          });

          socket.on('typing', (details) => {
               socket.to(details.room).emit('start-typing', details)
          })
          socket.on('typed', (details) => {
               socket.to(details.room).emit('stop-typing', details)
          })
          socket.on('read-message', (message) => {
               socket.to(message.chat_id).emit('read', message)
          })
          // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

          socket.on('send-message', (newMessage) => {
               newMessage?.members.forEach((user: string) => {
                    const reciever = activeUsers.find((item) => item.userId === user);
                    if (reciever && reciever.userId !== newMessage.sender_id) {
                         socket.to(reciever.socketId).emit('recieve-message', newMessage)
                    }
               });

               // socket.to(newMessage?.members).emit('recieve-message', newMessage)
          })


          socket.on('disconnect', () => {
               activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
               io.emit("connected", activeUsers);
          });
     });
})
