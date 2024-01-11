import { Link } from "react-router-dom";
import "./Singin.css";
import GoogleIcon from "../../assets/GoogleIcon";

export default function Singin() {
     return (
          <section className="login h-screen w-screen flex">
               <div className="left-area w-screen md:w-1/2 flex justify-center items-center">
                    <div className="login-container px-4 py-10 bg-white md:mx-0 shadow rounded-3xl sm:p-10 h-min">
                         <div className="max-w-md mx-auto">
                              <div className="flex items-center space-x-5 justify-center text-2xl">
                                   Sign in
                              </div>
                              <div className="mt-5">
                                   <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                        E-mail
                                   </label>
                                   <input
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                        type="text"
                                        id="login"
                                   />
                              
                                   <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                        Password
                                   </label>
                                   <input
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                        type="password"
                                        id="password"
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
                                        type="submit"
                                   >
                                        Sign in
                                   </button>
                              </div>
                              <div className="flex justify-center w-full items-center">
                                   <div>
                                        <button className="flex items-center justify-between py-2 px-10 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg my-5">
                                             <GoogleIcon />
                                             <span className="ml-2 text-nowrap">
                                                  Continue with Google
                                             </span>
                                        </button>
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
                         src="https://drive.google.com/uc?id=1pckLUg1ueqWXAX1TqzK2dRPd7ejEZbCB"
                         alt=""
                         className="signin-image absolute top-24 left-20"
                    />
               </div>
          </section>
     );
}
