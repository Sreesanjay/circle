import { toast } from "react-toastify";
import API from "../api"
import { AxiosError } from "axios";

export async function createChat(id: string) {
    try {
        const response = await API.post('/chat', { user_id: id }, { withCredentials: true })
        if (response.data) {
            return response.data.chat;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.message)
    }
}

//fetch all chats
export async function getAllChats() {
    try {
        const response = await API.get('/chat', { withCredentials: true })
        if (response.data) {
            return response.data.chats;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.message)
    }
}

// send message
type sendMessage = {
    sender_id: string;
    content: string;
    chat_id: string;
}
export async function sendMessage(message: sendMessage) {
    try {
        const response = await API.post('/message',  message , { withCredentials: true })
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.message)
    }
}
export async function getMessages(chat_id: string) {
    try {
        const response = await API.get(`/message/${chat_id}`, { withCredentials: true })
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Internal Error')
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>;
        toast.error(err.message)
    }
}