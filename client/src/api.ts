import axios from 'axios';
const baseURL = "https://my-circle.online/api"
// const baseURL = "http://localhost:5000/api"

import Cookies from "js-cookie";

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
                const rToken = localStorage.getItem('refreshToken');
                if (rToken) {
                    const refToken = JSON.parse(rToken)
                    const { refreshToken, expiresAt } = refToken;
                    if (expiresAt && new Date().getTime() < expiresAt) {
                        const response = await instance.post('/refresh-token', { refreshToken: refreshToken });
                        const { token } = response.data;
                        Cookies.set("token", token, { expires: (1 / 1440) * 15 });
                        return axios(originalRequest);
                    } else {
                        localStorage.removeItem("refreshToken");
                    }

                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('userProfile');
                }
            } catch (err) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
