import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { ChangeEvent, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify"; 

import validate from "../../util/formValidate";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { signin } from "../../services/authService";
import { reset } from "../../features/auth/AuthSlice";
import Loader from "../Loader/Loader";
import "./Singin.css";

export default function Singin() {
     const dispatch = useAppDispatch();
     const navigate  = useNavigate()
     const { user, isError, isSuccess, errorMessage, status, isLoading } =
          useAppSelector((state) => state.auth);
     const [credentials, setCredentials] = useState({
          email: "",
          password: "",
     });
     const [formError, setFormError] = useState({
          email: "",
          password: "",
     });
     const [isSubmit, setIsSubmit] = useState(false);
     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setCredentials({ ...credentials, [name]: value });
     };
     const handleSubmit = () => {
          setFormError({
               ...formError,
               email: validate("email", credentials.email),
               password: validate("password", credentials.password),
          });
          setIsSubmit(true);
     };

     useEffect(() => {
          if (isSubmit) {
               (() => {
                    if (!formError.email && !formError.password) {
                         dispatch(signin(credentials));
                    }
               })();
               setIsSubmit(false)
          }
     }, [isSubmit, credentials, dispatch, formError]);

     useEffect(() => {
          if (isError && status !== 409) {
               toast(errorMessage);
               dispatch(reset());
          }
          if (isSuccess) {
               dispatch(reset());
               if (user?.role === "USER") {
                    navigate("/");
               }
               else if(user?.role === "ADMIN"){
                    navigate("/admin");
               }
          }
          
     }, [
          isSuccess,
          user?.role,
          navigate,
          status,
          dispatch,
          isError,
          errorMessage,
     ]);

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="login h-screen w-screen flex">
                         <div className="left-area w-screen md:w-1/2 flex justify-center items-center">
                              <div className="login-container px-4 py-10 bg-white md:mx-0 shadow rounded-3xl sm:p-10 h-min">
                                   <div className="max-w-md mx-auto">
                                        <div className="flex items-center space-x-5 justify-center text-2xl mb-3">
                                             Sign in
                                        </div>
                                        {isError && status === 409 ? (
                                             <Stack
                                                  sx={{ width: "100%" }}
                                                  spacing={2}
                                             >
                                                  <Alert
                                                       variant="filled"
                                                       severity="error"
                                                  >
                                                       {errorMessage}
                                                  </Alert>
                                             </Stack>
                                        ) : null}
                                        <div className="mt-5 text-black">
                                             <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                                  E-mail
                                             </label>
                                             {formError.email ? (
                                                  <small className="text-red-600">
                                                       {formError.email}
                                                  </small>
                                             ) : null}
                                             <input
                                                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                                  type="text"
                                                  id="login"
                                                  name="email"
                                                  value={credentials.email}
                                                  onChange={handleChange}
                                             />

                                             <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                                  Password
                                             </label>
                                             {formError.password ? (
                                                  <small className="text-red-600">
                                                       {formError.password}
                                                  </small>
                                             ) : null}
                                             <input
                                                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                                  type="password"
                                                  id="password"
                                                  name="password"
                                                  value={credentials.password}
                                                  onChange={handleChange}
                                             />
                                        </div>
                                        <div className="text-right mb-4">
                                             <a
                                                  className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
                                                  href="#"
                                             >
                                                  Forgot Password?
                                             </a>
                                        </div>
                                        <div className="mt-5">
                                             <button
                                                  className="py-2 px-4 bg-primary hover:bg-primary-hover focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                                  type="button"
                                                  onClick={handleSubmit}
                                             >
                                                  Sign in
                                             </button>
                                        </div>
                                        <div className="flex justify-center w-full items-center">
                                             <div className="mt-5">
                                                  <GoogleAuth />
                                             </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                             <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                             <Link
                                                  to="/signup"
                                                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                                             >
                                                  OR sign Up
                                             </Link>
                                             <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="right-area w-1/2 relative hidden md:flex">
                              <div className="rectagle-box bg-primary absolute right-0"></div>
                              <img
                                   src="https://lh3.google.com/u/0/d/1pckLUg1ueqWXAX1TqzK2dRPd7ejEZbCB"
                                   alt=""
                                   className="signin-image absolute top-24 left-20"
                              />
                         </div>
                    </section>
               )}
          </>
     );
}
