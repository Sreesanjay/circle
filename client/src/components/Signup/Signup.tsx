import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import validate from "../../util/formValidate";
// import GoogleIcon from "../../assets/GoogleIcon";
import "./Signup.css";
import { signup } from "../../services/authService";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

export type UserData = {
     email: string;
     password: string;
     username: string;
};

const Signup = () => {
     const [userData, setUserData] = useState<UserData>({
          email: "",
          password: "",
          username: "",
     });

     const [formError, setFormError] = useState<UserData>({
          email: "",
          password: "",
          username: "",
     });

     const [isSubmit, setIsSubmit] = useState(false);
     const navigate = useNavigate()
     const dispatch = useAppDispatch();
     const { user, isError, isSuccess, errorMessage } = useAppSelector(
          (state) => state.auth
     );

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          const { name, value } = e.target;
          setUserData({ ...userData, [name]: value });
     }

     function handleSubmit() {
          setFormError({
               ...formError,
               email: validate("email", userData.email),
               username: validate("username", userData.username),
               password: validate("password", userData.password),
          });
          setIsSubmit(true);
     }

     useEffect(() => {
          if (isSubmit) {
               (async () => {
                    if (
                         !formError.email &&
                         !formError.username &&
                         !formError.password
                    ) {
                         dispatch(signup(userData));
                    }
               })();
          }
     }, [isSubmit, formError, dispatch, userData]);
     useEffect(()=>{
          if(isSuccess){
               if(user?.role === 'USER'){
                    navigate('/')
               }
          }
     },[isSuccess, user?.role, navigate])

     return (
          <section className="signup w-screen h-screen flex justify-center md:justify-between px-3 ">
               <div className="left-area  hidden md:flex w-1/2 relative pl-8 md:ps-15">
                    <div className="rectangle-box absolute"></div>
                    <img
                         src="https://drive.google.com/uc?id=1ee8WvmzqA1SFPI8N9VkCZ_hZkENV0bjX"
                         alt=""
                         className="signup-img absolute sm:bottom-20 md:bottom-10 md:right-15"
                    />
               </div>

               <div className="right-area md:w-1/2 flex justify-center items-center">
                    <div className="relative px-4 py-10 bg-white md:mx-0 shadow rounded-3xl sm:p-10 h-min">
                         <div className="max-w-md mx-auto">
                              <div className="flex items-center space-x-5 justify-center text-2xl mb-5">
                                   Signup
                              </div>
                              {isError ? (
                                   <Stack sx={{ width: "100%" }} spacing={2}>
                                        <Alert
                                             variant="filled"
                                             severity="error"
                                        >
                                             {errorMessage}
                                        </Alert>
                                   </Stack>
                              ) : null}
                              <div className="mt-5">
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
                                        onChange={handleChange}
                                        name="email"
                                        value={userData.email}
                                   />

                                   <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                        User Name
                                   </label>
                                   {formError.username ? (
                                        <small className="text-red-600 flex">
                                             {formError.username}
                                        </small>
                                   ) : null}
                                   <input
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                        type="text"
                                        id="username"
                                        onChange={handleChange}
                                        name="username"
                                        value={userData.username}
                                   />

                                   <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                        Password
                                   </label>
                                   {formError.password ? (
                                        <small className="text-red-600 flex">
                                             {formError.password}
                                        </small>
                                   ) : null}
                                   <input
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                        type="password"
                                        id="password"
                                        onChange={handleChange}
                                        name="password"
                                        value={userData.password}
                                   />
                              </div>

                              <div className="mt-5">
                                   <button
                                        className="py-2 px-4 bg-primary hover:bg-primary-hover focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                        type="submit"
                                        onClick={() => handleSubmit()}
                                   >
                                        Sign up
                                   </button>
                              </div>

                              <div className="flex justify-center w-full items-center">
                                   <div>
                                        {/* <button className="flex items-center justify-between px-10 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg my-5"> */}
                                        <GoogleAuth/>
                                        {/* </button>  */}
                                   </div>
                              </div>

                              <div className="flex items-center justify-between mt-4">
                                   <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                   <Link
                                        to="/login"
                                        className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                                   >
                                        OR sign In
                                   </Link>
                                   <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Signup;
