import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { storage } from "../app/firebase";
import API from "../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (_, thunkAPI) => {
        try {
            const userDetails = await API.get("/profile", {
                withCredentials: true,
            });
            return userDetails.data
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
            };
            return thunkAPI.rejectWithValue(payload);
        }

    })

export const updateCoverImg = createAsyncThunk(
    "user/updateCoverImg",
    async (file: File, thunkAPI) => {
        try {
            const filename = new Date().getTime() + file.name
            const storageRef = ref(storage, 'cover/' + filename);
            const snapshot = await uploadBytes(storageRef, file)
            if (snapshot) {
                const url = await getDownloadURL(storageRef);
                const response = await API.patch("/profile/update-cover-img", {url}, {
                    withCredentials: true,
                });
                return response.data;
            }else{
                throw new Error("Internal error")
            }
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
            };
            return thunkAPI.rejectWithValue(payload);
        }

    })

    export const deleteCover = createAsyncThunk(
        "user/deleteCover",
        async (_, thunkAPI) => {
            try {
                const userDetails = await API.delete("/profile/delete-cover-img", {
                    withCredentials: true,
                });
                return userDetails.data
            } catch (error) {
                const err = error as AxiosError<{
                    message?: string;
                }>
                const payload = {
                    message: err.response?.data?.message,
                };
                return thunkAPI.rejectWithValue(payload);
            }
    
        })

    