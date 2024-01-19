import { createSlice } from "@reduxjs/toolkit";
import { getAllInterests, newInterest } from "../../services/interestService";
import { toast } from "react-toastify";

interface IInterest {
    image: string;
    interest: string;
    discription: string;
    total_users: number;
    total_communities: number;
    total_posts: number;
}
interface Interest {
    interest: IInterest[] | null;
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}

const initialState: Interest = {
    interest: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null
};

export const interestSlice = createSlice({
    name: "interest",
    initialState,
    reducers: {
        resetInterest: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.status = null,
                state.isLoading = false;
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newInterest.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(newInterest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            toast(action.payload.message)
        })
            .addCase(newInterest.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })
            //get all interests
            .addCase(getAllInterests.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllInterests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.interest = action.payload.interest
            })
            .addCase(getAllInterests.rejected, (state, action) => {
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

export const { resetInterest } = interestSlice.actions;

export default interestSlice.reducer;
