import { createSlice } from '@reduxjs/toolkit'
import {signup} from "../../services/authService"
import Cookies from "js-cookie"

type userData ={
    _id : string,
    email : string,
    username : string,
    profile_img : string,
    role : string,
}
interface AuthState{
    userData : userData | null,
    isLoading : boolean,
    isError : boolean,
    errorMessage : string
    isSuccess : boolean
}
const userData = localStorage.getItem("userData");
const initialState: AuthState = {
    userData : userData ? JSON.parse(userData) : null,
    isLoading : false,
    isError : false,
    errorMessage : '',
    isSuccess : false

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
    },
    extraReducers : (builder) =>{
        builder
        .addCase(signup.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(signup.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            localStorage.setItem('userData', JSON.stringify(action.payload.user));
            state.userData = action.payload.user;
            Cookies.set("token", action.payload.token, { expires: 2 });
        })
        .addCase(signup.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload as string;
        })
    }
})

export default authSlice.reducer