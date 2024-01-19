import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { storage } from "../app/firebase";
import API from "../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IInterest } from "../components/Modal/NewInterest";

//upload new interest
export const newInterest = createAsyncThunk(
    "interest/newInterest",
    async (data: IInterest, thunkAPI) => {
        try {
            if (data.image !== undefined) {
                const filename = new Date().getTime() + data.image?.name
                const storageRef = ref(storage, 'interest/' + filename);
                const snapshot = await uploadBytes(storageRef, data.image)
                if (snapshot) {
                    const url = await getDownloadURL(storageRef);

                    const response = await API.post("/admin/interest", {
                        image: url,
                        interest: data.interest,
                        discription: data.discription
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


//get all interests

export const getAllInterests = createAsyncThunk(
    "interest/getAllInterests",
    async (_, thunkAPI) => {
        try {
            const response = await API.get("/admin/interest", {
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

//get all interests

export const deleteInterest = createAsyncThunk(
    "interest/deleteInterest",
    async (id : string, thunkAPI) => {
        console.log("request got")
        try {
            const response = await API.delete(`/admin/interest/${id}`, {
                withCredentials: true,
            });
            response.data.id = id;
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