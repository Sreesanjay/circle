import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types";
import { getPosts, uploadPost } from "../../services/postService";

interface IInitialState {
    posts: IPost[] | null;
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}
const initialState: IInitialState = {
    posts: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        postReset:(state)=>{
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = "";
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadPost.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(uploadPost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload.posts;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })
    }
})

export const {postReset } = postSlice.actions;

export default postSlice.reducer;
