import { AxiosError } from "axios";
import API from "../api";
import { toast } from "react-toastify";

export async function getDashboardAnalytics() {
    try {
        const response = await API.get("/admin/dashboard/analytics");
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
export async function getUserReport(year: number) {
    try {
        const response = await API.get(`/admin/dashboard/user-report/${year}`);
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