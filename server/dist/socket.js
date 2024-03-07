"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeUsers = exports.socketIo = void 0;
const socket_io_1 = require("socket.io");
const ORIGIN = "https://my-circle.online";
// const ORIGIN = "http://localhost:5000"
let activeUsers = [];
exports.activeUsers = activeUsers;
let socketIo;
exports.default = {
    getIo: (server) => {
        const io = new socket_io_1.Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: ORIGIN,
                credentials: true,
            },
        });
        io.on('connection', (socket) => {
            exports.socketIo = socketIo = socket;
            socket.on("setup", (newUserId) => {
                const user = activeUsers.find((item) => item.userId === newUserId);
                if (!user || user.socketId !== socket.id) {
                    const newUser = { userId: newUserId, socketId: socket.id };
                    activeUsers.push(newUser);
                }
                io.emit("connected", activeUsers);
            });
            socket.on('new-chat', (newChat) => {
                newChat.members.forEach((member) => {
                    const reciever = activeUsers.find((item) => item.userId === member);
                    if (reciever) {
                        socket.to(reciever.socketId).emit('join-newchat', newChat);
                    }
                });
            });
            socket.on('exit-chat', (chat) => {
                socket.to(chat._id).emit('remove-chat', chat);
            });
            //block user
            socket.on('block-user', (user) => {
                const reciever = activeUsers.find(item => item.userId === user);
                if (reciever) {
                    socket.to(reciever.socketId).emit('block-chat', user);
                }
            });
            //unblock user
            socket.on('unblock-user', (user) => {
                const reciever = activeUsers.find(item => item.userId === user);
                if (reciever) {
                    socket.to(reciever.socketId).emit('unblock-chat', user);
                }
            });
            socket.on('join-room', (room) => {
                socket.join(room);
            });
            socket.on('typing', (details) => {
                socket.to(details.room).emit('start-typing', details);
            });
            socket.on('typed', (details) => {
                socket.to(details.room).emit('stop-typing', details);
            });
            socket.on('read-message', (message) => {
                socket.to(message.chat_id).emit('read', message);
            });
            // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
            socket.on('send-message', (newMessage) => {
                newMessage === null || newMessage === void 0 ? void 0 : newMessage.members.forEach((user) => {
                    const reciever = activeUsers.find((item) => item.userId === user);
                    if (reciever && reciever.userId !== newMessage.sender_id) {
                        socket.to(reciever.socketId).emit('recieve-message', newMessage);
                    }
                });
            });
            socket.on('deleteMessage', ({ chat_id, message_id }) => {
                socket.to(chat_id).emit('delete-message', { chat_id, message_id });
            });
            socket.on('disconnect', () => {
                exports.activeUsers = activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
                io.emit("connected", activeUsers);
            });
        });
        return io;
    }
};
