import { createAsyncThunk } from "@reduxjs/toolkit";
// import { storage } from "../app/firebase";
import API from "../api";
import { AxiosError } from "axios";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
type IAddStory = {
    story_type: string;
    content: string;
    visibility: string;
    background : string;
    color : string;
}

export const addStory = createAsyncThunk(
    "story/addStory",
    async (data: IAddStory, thunkAPI) => {
        try {
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
    async (id:string, thunkAPI) => {
        try {
            const response = await API.get(`/story/like-story/${id}`, {
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