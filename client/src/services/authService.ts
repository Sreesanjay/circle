import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api"
import {UserData} from "../components/Signup/Signup"

export const signup = createAsyncThunk("auth/signup",async (userData : UserData) => {
    try{
        const response = await API.post('signup', userData)
        return response.data
    }catch(error){
        console.error(error)
    }
})