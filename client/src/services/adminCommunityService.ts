import { AxiosError } from "axios";
import API from "../api";
import { toast } from "react-toastify";

export async function getAnalytics() {
    try {
        const response = await API.get('/admin/community-management/analytics')
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
export async function getAllCommunity(page: number, sort: string) {
    try {
        const response = await API.get(`/admin/community-management?page=${page}&&sort=${sort}`)
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
export async function removeCommunity(community_id: string) {
    try {
        const response = await API.put(`/admin/community-management/remove/${community_id}`)
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
export async function undoRemoveCommunity(community_id: string) {
    try {
        const response = await API.put(`/admin/community-management/undo-remove/${community_id}`)
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