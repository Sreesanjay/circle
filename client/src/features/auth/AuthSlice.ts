import { createSlice } from '@reduxjs/toolkit'
import {signup, googleAuth} from "../../services/authService"
import Cookies from "js-cookie"

type user ={
    _id : string,
    email : string,
    username : string,
    profile_img : string,
    role : string,
}
interface AuthState{
    user : user | null;
    isLoading : boolean;
    isError : boolean;
    errorMessage : string;
    isSuccess : boolean;
}
const user = localStorage.getItem("user");
const initialState: AuthState = {
    user : user ? JSON.parse(user) : null,
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
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.user = action.payload.user;
            Cookies.set("token", action.payload.token, { expires: 2 });
        })
        .addCase(signup.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            const error =action.payload as {message: string};
            state.errorMessage = error?.message;
        })
        .addCase(googleAuth.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(googleAuth.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.user = action.payload.user;
            Cookies.set("token", action.payload.token, { expires: 2 });
        })
        .addCase(googleAuth.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            const error =action.payload as {message: string};
            state.errorMessage = error?.message;
        })
    }
})

export default authSlice.reducer