import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { deleteCover, getUserProfile, updateCoverImg, updateProfileImg, deleteProfile, updateProfile } from "../../services/userService";

export type userProfile = {
    fullname: string;
    gender: string;
    bio: string;
    username: string;
    profile_img: string;
    isVerified: boolean;
    account_type: string;
    cover_img: string;
    interest :string[]
};
interface IUserProfile {
    userProfile: userProfile | null;
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}
const userProfile = localStorage.getItem("userProfile");
const initialState: IUserProfile = {
    userProfile: userProfile ? JSON.parse(userProfile) : null,
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
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(action.payload.userProfile)
                );
                state.userProfile = action.payload.userProfile;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isError = true;
                const error = action.payload as {
                    message: string
                };
                state.errorMessage = error.message;
            })
            //update user profile image
            .addCase(updateProfileImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfileImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(action.payload.userProfile)
                );
                state.userProfile = action.payload.userProfile;
                toast("Profile image  updated")

            })
            .addCase(updateProfileImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
                toast.error(error.message);
            })
            //delete profile image
            .addCase(deleteProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(action.payload.userProfile)
                );
                state.userProfile = action.payload.userProfile;
                toast("Profile image  deleted")

            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string;
                    status: number;
                };
                state.errorMessage = error?.message;
                state.status = error?.status;
                toast.error(error.message);
            })
            .addCase(updateCoverImg.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(updateCoverImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(action.payload.userProfile)
                );
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
            //delete cover image
            .addCase(deleteCover.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCover.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(action.payload.userProfile)
                );
                state.userProfile = action.payload.userProfile
                toast("Cover image  deleted")
            })
            .addCase(deleteCover.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string
                };
                state.errorMessage = error.message;
            })

            //update user profile
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(action.payload.userProfile)
                );
                state.userProfile = action.payload.userProfile
                toast("Profile updated")
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                const error = action.payload as {
                    message: string
                    status: number
                };
                state.status = error.status
                state.errorMessage = error.message;
            })


    }
})

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
