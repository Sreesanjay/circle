import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/AuthSlice"
import userReducer from "../features/user/UserSlice"
export const store = configureStore({
  reducer: {
    auth : authReducer,
    user : userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

