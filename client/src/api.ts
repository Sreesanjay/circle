import axios, { AxiosError } from 'axios';
// const baseURL = "http://localhost:5000/api"
const baseURL = "http://my-circle.online/api"
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a response interceptor
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await instance.post('/refresh-token', { refreshToken: JSON.parse(refreshToken) });
                    const { token } = response.data;
                    Cookies.set("token", token, { expires: (1 / 1440) * 15 });
                    return axios(originalRequest);
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('userProfile');
                }
            } catch (error) {
                const err = error as AxiosError<{
                    message?: string;
                    status?: string;
                }>;
                toast.error(err.response?.data.message)
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
