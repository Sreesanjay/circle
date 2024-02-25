import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { storage } from "../app/firebase";
import API from "../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";


type ICreatePost = {
    content: Blob;
    caption: string;
    visibility: string;
    tags: string[]
}

//upload new post
export const getPosts = createAsyncThunk(
    "post/getPosts",
    async (page: Date | null, thunkAPI) => {
        try {
            const response = await API.get(`/posts?page=${page ? page : ''}`, {
                withCredentials: true,
            });
            return response.data;

        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//upload new post
export const uploadPost = createAsyncThunk(
    "post/uploadPost",
    async (data: ICreatePost, thunkAPI) => {
        try {
            if (data.content !== undefined) {
                const content = new File([data.content], "post", {
                    type: data.content.type,
                });
                const filename = new Date().getTime() + (content as File).name;
                const storageRef = ref(storage, 'posts/' + filename);
                const snapshot = await uploadBytes(storageRef, (content))
                if (snapshot) {
                    const url = await getDownloadURL(storageRef);
                    const response = await API.post("/posts", {
                        content: url,
                        caption: data.caption,
                        visibility: data.visibility,
                        tags: data.tags,
                        type: data.content.type,
                    }, {
                        withCredentials: true,
                    });
                    return response.data;
                } else {
                    throw new Error("Internal error")
                }
            }
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//like post
export const likePost = createAsyncThunk(
    "post/likePost",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.put(`/posts/like/${id}`, {},
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })
//dislike post
export const dislikePost = createAsyncThunk(
    "post/dislikePost",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.put(`/posts/dislike/${id}`, {},
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })


//save post
export const savePost = createAsyncThunk(
    "post/savePost",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.post("/posts/save", { post_id: id },
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//unsave post
export const unsavePost = createAsyncThunk(
    "post/unsavePost",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.delete(`/posts/unsave/${id}`,
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//delete post
export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (id: string, thunkAPI) => {
        try {
            const response = await API.delete(`/posts/${id}`,
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })


//delete post
export const editPost = createAsyncThunk(
    "post/editPost",
    async ({ data, id }: { data: ICreatePost, id: string }, thunkAPI) => {
        try {
            const response = await API.put(`/posts/${id}`,
                {
                    caption: data.caption,
                    visibility: data.visibility,
                    tags: data.tags,

                },
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

//get my post
export const getMyPost = createAsyncThunk(
    "post/getMyPost",
    async (_, thunkAPI) => {
        try {
            const response = await API.get("/profile/posts", {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>
            const payload = {
                message: err.response?.data?.message,
                status: err.response?.status
            };
            return thunkAPI.rejectWithValue(payload);
        }
    })

export async function getPlans() {
    try {
        const response = await API.get('/posts/plans?planType=POST_BOOSTER');
        return response.data
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}

type payment = {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
export async function paymentSuccess(post_id: string, plan_id: string, amount: number, action: string, payment: payment) {
    try {
        const response = await API.post('/posts/boost', { post_id, plan_id, amount, action, payment });
        return response.data
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}
export async function getInsights(post_id: string) {
    try {
        const response = await API.get(
            `/posts/analytics?post_id=${post_id}`)
        return response.data
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}
export async function addClick(post_id: string) {
    try {
        const response = await API.post(
            "/posts/add-click", { post_id })
        return response.data
    } catch (error) {
        const err = error as AxiosError<{
            message?: string;
            status?: string;
        }>
        if (err.response) {
            toast.error(err.response?.data.message)
        } else {
            toast.error(err.message)
        }
    }
}
