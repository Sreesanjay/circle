import { createSlice } from "@reduxjs/toolkit";

const initialState: Interest = {
    story: null,
    myStory: [],
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
    },
})