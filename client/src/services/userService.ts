import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import API from "../api";

export const getUserProfile = createAsyncThunk(
    "auth/getUserProfile",
    async (_,thunkAPI) => {
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