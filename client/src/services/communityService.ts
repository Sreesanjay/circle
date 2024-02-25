import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
// import { storage } from "../app/firebase";
import API from "../api";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../app/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type UploadCommunity = {
    community_name: string,
    topic: string | null,
    privacy: string,
    about: string,
    icon?: string,
}


//upload new interest
export const newCommunity = createAsyncThunk(
    "community/newInterest",
    async (body: UploadCommunity, thunkAPI) => {
        try {
            const response = await API.post('/community', body);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//update interest
export const editCommunity = createAsyncThunk(
    "community/editCommunity",
    async ({ formData, id }: { formData: UploadCommunity, id: string }, thunkAPI) => {
        try {
            const response = await API.put(`/community/${id}`, formData);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//get my community
export const getMyCommunity = createAsyncThunk(
    "community/getMyCommunity",
    async (_, thunkAPI) => {
        try {
            const response = await API.get('/community/my-communities');
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//get community
export const getCommunity = async (id: string) => {
    try {
        const response = await API.get(`/community/get-details/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
//uplaod icon
export const updateIcon = async (icon: File) => {
    try {
        const filename = new Date().getTime() + (icon).name;
        const storageRef = ref(storage, 'icon/' + filename);
        const snapshot = await uploadBytes(storageRef, (icon))
        if (snapshot) {
            const url = await getDownloadURL(storageRef);
            return url;
        }
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}

//get all community
export const getAllCommunity = createAsyncThunk(
    "community/getAllCommunity",
    async (_, thunkAPI) => {
        try {
            const response = await API.get('/community');
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//join community
export const joinCommunity = createAsyncThunk(
    "community/joinCommunity",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.post('/community/join', { community_id: id });
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//join community
export const acceptJoinRequest = createAsyncThunk(
    "community/acceptJoinRequest",
    async ({ id, user_id }: { id: string, user_id: string }, thunkAPI) => {
        try {
            const response = await API.post('/community/accept-request', { community_id: id, user_id: user_id });
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//create discussion

type IPostDiscussion = {
    community_id: string,
    user_id: string,
    content: string | File,
    content_type: string,
    file_type?: string,
    caption?: string
}
export const createDiscussion = async (payload: IPostDiscussion) => {
    try {

        if (payload.content_type === 'MEDIA') {
            const filename = new Date().getTime() + (payload.content as File).name;
            const storageRef = ref(storage, 'discussion/' + filename);
            const snapshot = await uploadBytes(storageRef, (payload.content as File))
            if (snapshot) {
                const url = await getDownloadURL(storageRef);
                if (url) {
                    payload.content = url;
                }
            }
        }
        const response = await API.post('/community/discussions', payload);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const getDiscussions = async (id: string, pagination: Date | null) => {
    try {
        const response = await API.get(`/community/discussions/${id}?page=${pagination ? pagination : ''}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}


export const getAnalytics = async (id: string) => {
    try {
        const response = await API.get(`/community/analytics/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}


export const likeDiscussion = async (id: string) => {
    try {
        const response = await API.put(`/community/discussions/like/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const dislikeDiscussion = async (id: string) => {
    try {
        const response = await API.put(`/community/discussions/dislike/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const getComments = async (id: string) => {
    try {
        const response = await API.get(`/community/discussions/comment/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const likeComment = async (id: string) => {
    try {
        const response = await API.put(`/community/discussions/comment/like/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const dislikeComment = async (id: string) => {
    try {
        const response = await API.put(`/community/discussions/comment/dislike/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
type commentPayload = {
    user_id: string;
    discussion_id: string;
    content: string;
    reply?: string
}
export const addComment = async (payload: commentPayload) => {
    try {
        const response = await API.post("/community/discussions/comment", payload);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const deleteDiscussion = async (id: string) => {
    try {
        const response = await API.delete(`/community/discussions/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const getMemberes = async (members: string[]) => {
    try {
        const response = await API.post("/community/get-members", { members });
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}
export const removeMember = async (payload: { community_id?: string, user_id?: string }) => {
    try {
        const response = await API.post("/community/remove-member", payload);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}

//get recent discussions 

export const getRecentDiscussions = async (pagination: Date | null) => {
    try {
        const response = await API.get(`/community/discussions/recent?page=${pagination ? pagination : ''}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        toast.error(err.response?.data.message)
    }
}