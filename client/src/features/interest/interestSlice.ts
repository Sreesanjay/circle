import { createSlice } from "@reduxjs/toolkit";

interface IInterest{
    image : string;
    interest : string;
    discription : string;
    total_users : number;
    total_communities : number;
    total_posts : number;
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
    reducers :{

    }
})