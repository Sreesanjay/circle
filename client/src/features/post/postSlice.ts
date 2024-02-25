import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types";
import { deletePost, dislikePost, editPost, getMyPost, getPosts, likePost, savePost, unsavePost, uploadPost } from "../../services/postService";

interface IInitialState {
    posts: IPost[] | [];
    myPosts: IPost[] | [],
    isLoading: boolean;
    pagination: Date | null;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}
const initialState: IInitialState = {
    posts: [],
    myPosts: [],
    pagination: null,
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
        postReset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = "";
            state.status = null;
        },
        setPostEmpty: (state) => {
            state.posts = []
        },
        setPagination: (state, action) => {
            state.pagination = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadPost.fulfilled, (state, action) => {
                state.posts = [action.payload.post, ...state.posts]
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
                if (state.pagination && state.pagination != action.payload.posts[action.payload.posts.length - 1]?.createdAt) {
                    state.posts = [...state.posts, ...action.payload.posts];
                } else if (state.posts.length == 0) {
                    state.posts = action.payload.posts
                }
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

            .addCase(likePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newPosts = state.posts?.map((post) => {
                    if (post._id === action.payload.post._id) {
                        post.likes.push(action.payload.user_id)
                    }
                    return post;
                })
                if (newPosts) {
                    state.posts = newPosts
                }
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })
            .addCase(dislikePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(dislikePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const newPosts = state.posts?.map((post) => {
                    if (post._id === action.payload.post._id) {
                        post.likes = post.likes.filter((item) => item !== action.payload.user_id)
                    }
                    return post;
                })
                if (newPosts) {
                    state.posts = newPosts
                }
            })
            .addCase(dislikePost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })

            //save
            .addCase(savePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const posts = state.posts?.map((item) => {
                    if (item._id === action.payload.saved.post_id) {
                        item.is_saved = true
                    }
                    return item;
                })
                if (posts) {
                    state.posts = posts
                }
            })
            .addCase(savePost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })

            //unsave
            .addCase(unsavePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(unsavePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const posts = state.posts?.map((item) => {
                    if (item._id === action.payload.unsaved.post_id) {
                        item.is_saved = false;
                    }
                    return item;
                })
                if (posts) {
                    state.posts = posts
                }
            })
            .addCase(unsavePost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })


            //delete
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const myPosts = state.myPosts?.filter((item) => item._id !== action.payload.post_id)
                if (myPosts) {
                    state.myPosts = myPosts
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })


            //edit
            .addCase(editPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const myPosts = state.myPosts.map((post) => {
                    if (post._id === action.payload.post._id) {
                        post.caption = action.payload.post.caption;
                        post.visibility = action.payload.post.visibility;
                        post.tags = action.payload.post.tags
                    }
                    return post;
                })
                if (myPosts) {
                    state.myPosts = myPosts;
                }
            })
            .addCase(editPost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })


            //get myPost
            .addCase(getMyPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.myPosts = action.payload.posts
            })
            .addCase(getMyPost.rejected, (state, action) => {
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

export const { postReset, setPostEmpty, setPagination } = postSlice.actions;

export default postSlice.reducer;
