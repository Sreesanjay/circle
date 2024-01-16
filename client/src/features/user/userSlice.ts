import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getUserProfile, updateCoverImg } from "../../services/userService";

export type userProfile = {
    fullname: string;
    gender: string;
    bio: string;
    profile_img: string;
    is_premium: boolean;
    account_type: string;
    cover_img: string;
};
interface IUserProfile {
    userProfile: userProfile | null;
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}
const initialState: IUserProfile = {
    userProfile: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(action.payload);
                state.userProfile = action.payload.userProfile;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isError = true;
                const error = action.payload as {
                    message: string
                };
                state.errorMessage = error.message;
            })
            .addCase(updateCoverImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCoverImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userProfile = action.payload.userProfile
                toast("Cover image  updated")
            })
            .addCase(updateCoverImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string
                };
                state.errorMessage = error.message;
            })
    }
})

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
