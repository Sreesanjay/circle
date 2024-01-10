import { createSlice } from '@reduxjs/toolkit'
import {signup} from "../../services/authService"

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

const initialState: AuthState = {
    userData : null,
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
            console.log(action.payload);
        })
    }
})

export default authSlice.reducer