import { createAsyncThunk } from "@reduxjs/toolkit";
// import { storage } from "../app/firebase";
import API from "../api";
import { AxiosError } from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../app/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
type IAddStory = {
    story_type: string;
    content: string | Blob;
    visibility: string;
    background: string;
    color: string;
}

export const addStory = createAsyncThunk(
    "story/addStory",
    async (data: IAddStory, thunkAPI) => {
        try {
            if (data.story_type === 'MEDIA') {
                const content = new File([data.content], "story", {
                    type: (data.content as Blob).type,
                });
                const filename = new Date().getTime() + (content as File).name;
                const storageRef = ref(storage, 'story/' + filename);
                const snapshot = await uploadBytes(storageRef, (content))
                if (snapshot) {
                    data.content = await getDownloadURL(storageRef);
                }
            }

            const response = await API.post("/story", data, {
                withCredentials: true,
            });
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

export const getMyStory = createAsyncThunk(
    "story/getMyStory",
    async (_, thunkAPI) => {
        try {
            const response = await API.get("/story", {
                withCredentials: true,
            });
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

export const getStories = createAsyncThunk(
    "story/getStories",
    async (_, thunkAPI) => {
        try {
            const response = await API.get("/story/all-stories", {
                withCredentials: true,
            });
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

export const likeStory = createAsyncThunk(
    "story/likeStory",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.put(`/story/like-story/${id}`, {}, {
                withCredentials: true,
            });
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
export const dislikeStory = createAsyncThunk(
    "story/dislikeStory",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.put(`/story/dislike-story/${id}`, {}, {
                withCredentials: true,
            });
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

export const viewStory = createAsyncThunk(
    "story/viewStory",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.put(`/story/view-story/${id}`, {}, {
                withCredentials: true,
            });
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

export const deleteStory = createAsyncThunk(
    "story/deleteStory",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.delete(`/story/${id}`, {
                withCredentials: true,
            });
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