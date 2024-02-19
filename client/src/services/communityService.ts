import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
// import { storage } from "../app/firebase";
import API from "../api";
import { toast } from "react-toastify";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type UploadCommunity = {
    community_name: string,
    topic: string | null,
    privacy: string,
    about: string,
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
        console.log(id)
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
    content: string,
    content_type: string,
    file_type?: string,
    caption?: string
}
export const createDiscussion = async (payload: IPostDiscussion) => {
    try {
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
export const getDiscussions = async (id: string) => {
    try {
        const response = await API.get(`/community/discussions/${id}`);
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