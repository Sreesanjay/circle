import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { storage } from "../app/firebase";
import API from "../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IProfileInp } from "../pages/EditProfile/EditProfile";

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


//user profile image updation
export const updateProfileImg = createAsyncThunk(
    "user/updateProfileImg",
    async (file: File, thunkAPI) => {
        try {
            const filename = new Date().getTime() + file.name
            const storageRef = ref(storage, 'profile/' + filename);
            const snapshot = await uploadBytes(storageRef, file)
            if (snapshot) {
                const url = await getDownloadURL(storageRef);
                const response = await API.patch("/profile/update-profile_img", { url }, {
                    withCredentials: true,
                });
                return response.data;
            } else {
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

export const deleteProfile = createAsyncThunk(
    "user/deleteProfile",
    async (_, thunkAPI) => {
        try {
            const response = await API.delete("/profile/delete-profile_img", {
                withCredentials: true,
            });
            return response.data
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
                const response = await API.patch("/profile/update-cover-img", { url }, {
                    withCredentials: true,
                });
                return response.data;
            } else {
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

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (formData :IProfileInp , thunkAPI) => {
        try {
            const userDetails = await API.put("/profile",formData, {
                withCredentials: true,
            });
            return userDetails.data
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status:err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }

    })

