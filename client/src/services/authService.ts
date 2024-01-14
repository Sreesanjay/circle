import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../api";
import { UserData } from "../components/Signup/Signup";
import { AxiosError } from "axios";

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
                    status :err.response?.status
               };
               return thunkAPI.rejectWithValue(payload);
          }
     }
);



export const googleAuth = createAsyncThunk(
     "auth/googleAuth",
     async (credential: string, thunkAPI) => {
          try {
               const response = await API.post("/google-auth", {credential});
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

interface Credentials{
     email : string;
     password : string;
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
