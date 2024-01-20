import { createSlice } from "@reduxjs/toolkit";
import { signup, googleAuth, signin} from "../../services/authService";

import Cookies from "js-cookie";
// import { toast } from "react-toastify";

export type user = {
     _id: string;
     email: string;
     role: string;
};
interface AuthState {
     user: user | null;
     isLoading: boolean;
     isError: boolean;
     status: number | null;
     errorMessage: string;
     isSuccess: boolean;
}
const user = localStorage.getItem("user");
const initialState: AuthState = {
     user: user ? JSON.parse(user) : null,
     isLoading: false,
     isError: false,
     errorMessage: "",
     isSuccess: false,
     status: null,
};

export const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          reset: (state) => {
               console.log("dispactch reset");
               state.isError = false;
               state.errorMessage = "";
               state.isSuccess = false;
          },
          logout : (state) => {
               state.user = null;
               localStorage.removeItem('user');
          }
     },
     extraReducers: (builder) => {
          builder
               .addCase(signup.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(signup.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    localStorage.setItem(
                         "user",
                         JSON.stringify(action.payload.user)
                    );
                    state.user = action.payload.user;
                    Cookies.set("token", action.payload.token, { expires: 2 });
               })
               .addCase(signup.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    const error = action.payload as {
                         message: string;
                         status: number;
                    };
                    state.errorMessage = error?.message;
                    state.status = error?.status;
               })
               .addCase(googleAuth.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(googleAuth.fulfilled, (state, action) => {
                    state.isLoading = false;
                    if (action.payload.token) {
                         state.isSuccess = true;
                         localStorage.setItem(
                              "user",
                              JSON.stringify(action.payload.user)
                         );
                         state.user = action.payload.user;
                         Cookies.set("token", action.payload.token, {
                              expires: 2,
                         });
                    }
               })
               .addCase(googleAuth.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    const error = action.payload as {
                         message: string;
                         status: number;
                    };
                    state.errorMessage = error?.message;
                    state.status = error?.status;
               })
               .addCase(signin.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(signin.fulfilled, (state, action) => {
                    state.isLoading = false;
                    if (action.payload.token) {
                         state.isSuccess = true;
                         localStorage.setItem(
                              "user",
                              JSON.stringify(action.payload.user)
                         );
                         state.user = action.payload.user;
                         Cookies.set("token", action.payload.token, {
                              expires: 2,
                         });
                    }
               })
               .addCase(signin.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    const error = action.payload as {
                         message: string;
                         status: number;
                    };
                    state.errorMessage = error?.message;
                    state.status = error?.status;
               })

     },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
