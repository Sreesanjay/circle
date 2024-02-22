import { AxiosError } from "axios";
import API from "../api";
import { toast } from "react-toastify";

export async function getDashboardAnalytics(year: number) {
    try {
        const response = await API.get(`/admin/dashboard/analytics/${year}`);
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