import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "../../types";
type IUser = {
    userId: string,
    socketId: string
}
type ISocket = {
    onlineUsers: IUser[] | [],
    currentChat: IChat | null
}
const currentChat = localStorage.getItem("currentChat");
const initialState: ISocket = {
    onlineUsers: [],
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
        }
    }
})

export const { setOnlineUsers, setCurrentChat, resetCurrentChat } = socketSlice.actions;

export default socketSlice.reducer;