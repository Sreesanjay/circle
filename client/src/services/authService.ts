import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import API from "../api";
import { UserData } from "../components/Signup/Signup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../app/firebase";

export const signup = createAsyncThunk(
     "auth/signup",
     async (userData: UserData, thunkAPI) => {
          try {
               const response = await API.post("/signup", userData);
               return response.data;
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
               }>
               const payload = {
                    message: err.response?.data?.message,
                    status: err.response?.status
               };
               return thunkAPI.rejectWithValue(payload);
          }
     }
);



export const googleAuth = createAsyncThunk(
     "auth/googleAuth",
     async (credential: string, thunkAPI) => {
          try {
               const response = await API.post("/google-auth", { credential });
               return response.data;
          } catch (error) {
               const err = error as AxiosError<{
                    status?: string;
                    message?: string;
               }>;
               const payload = {
                    status: err.response?.status,
                    message: err.response?.data?.message,
               };
               return thunkAPI.rejectWithValue(payload);
          }
     }
);

interface Credentials {
     email: string;
     password: string;
}
export const signin = createAsyncThunk(
     "auth/signin",
     async (credential: Credentials, thunkAPI) => {
          try {
               const response = await API.post("/signin", credential);
               return response.data;
          } catch (error) {
               const err = error as AxiosError<{
                    status?: string;
                    message?: string;
               }>;
               const payload = {
                    status: err.response?.status,
                    message: err.response?.data?.message,
               };
               return thunkAPI.rejectWithValue(payload);
          }
     }
);
//user profile image updation
export const updateProfileImg = createAsyncThunk(
     "auth/updateProfileImg",
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