import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/AuthSlice";
import { toast } from "react-toastify";
const useHandleError = () => {
    const [error, setError] = useState<AxiosError | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleError = (error: AxiosError) => {

        setError(error);
    };

    useEffect(() => {
        if (error) {
            const err = error as AxiosError<{
                message?: string;
                status?: string;
            }>;
            if (err.response?.status === 401 && err.response.data.message === 'Account has been blocked') {
                dispatch(logout())
                navigate('/login');
            } else {
                toast(err.response?.data.message)
            }
            setError(null);
        }
    }, [error, navigate, dispatch]);

    return handleError;
};

export default useHandleError;
