import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

interface User {
    userId: string;
    socketId: string
}

let activeUsers: User[] = [];
let socketIo: Socket;

export default {
    getIo: (server: HttpServer) => {
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: "https://my-circle.online",
                credentials: true,
            },
        })
        console.log("io =>",io)
        io.on('connection', (socket: Socket) => {
            console.log("connection request got")
            socketIo = socket;
            socket.on("setup", (newUserId) => {
                console.log("setup got")
                const user = activeUsers.find((item) => item.userId === newUserId);
                if (!user || user.socketId !== socket.id) {
                    const newUser = { userId: newUserId, socketId: socket.id };
                    activeUsers.push(newUser);
                }
                console.log("user connected", activeUsers);
                io.emit("connected", activeUsers);
            });

            socket.on('new-chat', (newChat) => {
                newChat.members.forEach((member: string) => {
                    const reciever = activeUsers.find((item) => item.userId === member);
                    if (reciever) {
                        socket.to(reciever.socketId).emit('join-newchat', newChat)
                    }
                })
            });
            socket.on('exit-chat', (chat) => {
                socket.to(chat._id).emit('remove-chat', chat)
            });

            //block user
            socket.on('block-user', (user) => {
                const reciever = activeUsers.find(item => item.userId === user)
                if (reciever) {
                    socket.to(reciever.socketId).emit('block-chat', user)
                }
            });
            //unblock user
            socket.on('unblock-user', (user) => {
                const reciever = activeUsers.find(item => item.userId === user)
                if (reciever) {
                    socket.to(reciever.socketId).emit('unblock-chat', user)
                }
            });
            socket.on('join-room', (room) => {
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
            })

            socket.on('deleteMessage', ({ chat_id, message_id }: { chat_id: string, message_id: string }) => {
                socket.to(chat_id).emit('delete-message', { chat_id, message_id })

            });


            socket.on('disconnect', () => {
                activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
                console.log("user dis connected", activeUsers);
                io.emit("connected", activeUsers);
            });
        })
        return io;
    }
}


export { socketIo, activeUsers }