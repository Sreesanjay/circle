// import { createSlice } from "@reduxjs/toolkit";

// export interface IInterest {
//     _id: string;
//     image: string;
//     interest: string;
// }
// interface Interest {
//     interest: IInterest[] | null;
//     myInterest: IInterest[] | null;
//     isLoading: boolean;
//     isError: boolean;
//     status: number | null;
//     errorMessage: string;
//     isSuccess: boolean;
// }

// const initialState: Interest = {
//     interest: null,
//     myInterest : null,
//     isLoading: false,
//     isError: false,
//     errorMessage: "",
//     isSuccess: false,
//     status: null
// };

// export const preferenceSlice = createSlice({
//     name: "preference",
//     initialState,
//     reducers: {
//         resetInterest: (state) => {
//             state.isSuccess = false;
//             state.isError = false;
//             state.status = null,
//             state.errorMessage = ""
//         }
//     },
//     extraReducers : (builder) =>{
        
//     }

// })