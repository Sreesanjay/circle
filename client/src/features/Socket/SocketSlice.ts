import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "../../types";
type IUser = {
    userId: string,
    socketId: string
}
type ISocket = {
    onlineUsers: IUser[] | [],
    currentChat: IChat | null,
    chats: IChat[] | [],
}
const currentChat = localStorage.getItem("currentChat");
const initialState: ISocket = {
    onlineUsers: [],
    chats: [],
    currentChat: currentChat ? JSON.parse(currentChat) : null,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        setCurrentChat: (state, action) => {
            localStorage.setItem(
                "currentChat",
                JSON.stringify(action.payload)
            );
            state.currentChat = action.payload
        },
        resetCurrentChat: (state) => {
            state.currentChat = null;
            localStorage.removeItem('currentChat');
        },
        setChats(state, action) {
            state.chats = action.payload
        },
        addChat: (state, action) => {
            const exist = state.chats.find((item) => item._id === action.payload._id)
            if (!exist) {
                state.chats = [action.payload, ...state.chats]
            } else if (state.currentChat?._id === action.payload._id) {
                state.currentChat = action.payload
            }
        },
        addLatestMessage: (state, action) => {
            state.chats = state.chats.map((item) => {
                if (item._id === action.payload?.chat_id) {
                    item = {
                        ...item,
                        latest_message: action.payload,
                    };
                }
                return item;
            });
        },
        updateChatName: (state, action) => {
            state.chats = state.chats.map((item) => {
                if (item._id === action.payload?._id) {
                    item = {
                        ...item,
                        chat_name: action.payload.chat_name,
                    };
                }
                return item;
            });
            if (state.currentChat) {
                state.currentChat.chat_name = action.payload.chat_name;
                localStorage.setItem(
                    "currentChat",
                    JSON.stringify(state.currentChat)
                );
            }
        },
        updateGroupIcon: (state, action) => {
            state.chats = state.chats.map((item) => {
                if (item._id === action.payload?._id) {
                    item = {
                        ...item,
                        icon: action.payload.icon,
                    };
                }
                return item;
            });
            if (state.currentChat) {
                state.currentChat.icon = action.payload.icon;
                localStorage.setItem(
                    "currentChat",
                    JSON.stringify(state.currentChat)
                );
            }
        },
        //updating members field
        updateMembers: (state, action) => {
            state.chats = state.chats.map((item) => {
                if (item._id === action.payload?._id) {
                    item = {
                        ...item,
                        members: action.payload.members,
                        removed_members: action.payload.removed_members,
                        admins: action.payload.admins
                    };
                }
                return item;
            });
            if (state.currentChat && state.currentChat?._id === action.payload?._id) {
                state.currentChat.members = action.payload.members;
                state.currentChat.removed_members = action.payload.removed_members;
                state.currentChat.admins = action.payload.admins;
                localStorage.setItem(
                    "currentChat",
                    JSON.stringify(state.currentChat)
                );
            }
        }
    }
})

export const { setOnlineUsers, setCurrentChat, resetCurrentChat, setChats, addChat, addLatestMessage, updateChatName, updateGroupIcon, updateMembers } = socketSlice.actions;

export default socketSlice.reducer;