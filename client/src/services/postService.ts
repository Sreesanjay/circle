import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { storage } from "../app/firebase";
import API from "../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


type ICreatePost = {
    content: Blob;
    caption: string;
    visibility: string;
    tags: string[]
}

//upload new post
export const getPosts= createAsyncThunk(
    "post/uploadPost",
    async (_, thunkAPI) => {
        try {
            const response = await API.get("/posts", {
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

//upload new post
export const uploadPost  = createAsyncThunk(
    "post/getPosts",
    async (data: ICreatePost, thunkAPI) => {
        try {
            if (data.content !== undefined) {
                const content = new File([data.content], "post", {
                    type: data.content.type,
                });
                const filename = new Date().getTime() + (content as File).name;
                console.log(filename);
                const storageRef = ref(storage, 'posts/' + filename);
                const snapshot = await uploadBytes(storageRef, (content))
                if (snapshot) {
                    const url = await getDownloadURL(storageRef);
                    const response = await API.post("/posts", {
                        content: url,
                        caption: data.caption,
                        visibility: data.visibility,
                        tags: data.tags,
                        type: data.content.type,
                    }, {
                        withCredentials: true,
                    });
                    return response.data;
                } else {
                    throw new Error("Internal error")
                }
            }
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