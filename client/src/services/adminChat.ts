import { AxiosError } from "axios";
import API from "../api";
import { toast } from "react-toastify";

export async function getAnalytics() {
    try {
        const response = await API.get('/admin/chat-management/analytics')
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}
export async function getAllGroups(page: number, sort: string) {
    try {
        const response = await API.get(`/admin/chat-management?page=${page}&&sort=${sort}`)
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}
export async function removeChat(chat_id: string) {
    try {
        const response = await API.delete(`/admin/chat-management/remove/${chat_id}`)
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}
export async function undoRemoveChat(chat_id: string) {
    try {
        const response = await API.put(`/admin/chat-management/undo-remove/${chat_id}`)
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}