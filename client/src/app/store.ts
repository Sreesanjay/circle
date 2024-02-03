import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/AuthSlice"
import userReducer from "../features/user/userSlice"
import interestReducer from "../features/interest/interestSlice"
import storyReducer from "../features/story/storySlice"
import postReducer from "../features/post/postSlice"
export const store = configureStore({
  reducer: {
    auth : authReducer,
    user : userReducer,
    interest : interestReducer,
    story : storyReducer,
    post : postReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

