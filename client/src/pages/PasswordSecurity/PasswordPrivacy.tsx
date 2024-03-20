import { Alert, Breadcrumb } from "flowbite-react";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import { MdOutlineSecurity } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import validate from "../../util/formValidate";
import "./PasswordPrivacy.css";
import { passwordReset } from "../../services/authService";
import { useEffect, useState } from "react";
import { reset } from "../../features/auth/AuthSlice";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

export default function PasswordPrivacy() {
     const [old_password, setOldPassword] = useState("");
     const [new_password, setNewPassword] = useState("");
     const [confirm_password, setConfirmPassword] = useState("");
     const [isSubmit, setIsSubmit] = useState(false);
     const [formError, setFormError] = useState({
          old_password: "",
          new_password: "",
          confirm_password: "",
     });

     const dispatch = useAppDispatch();
     const { isLoading, isSuccess, isError, errorMessage, status } =
          useAppSelector((state) => state.auth);
     function resetPassword() {
          setFormError({
               ...formError,
               old_password: validate("password", old_password),
               new_password: validate("password", new_password),
               confirm_password: validate("password", confirm_password),
          });
          if (new_password === old_password) {
               setFormError({
                    ...formError,
                    new_password:
                         "Old password and new password cannot be same",
               });
          }
          setIsSubmit(true);
     }

     useEffect(() => {
          if (isSubmit) {
               if (
                    !formError.old_password &&
                    !formError.new_password &&
                    !formError.confirm_password
               ) {
                    dispatch(passwordReset({ old_password, new_password }));
                    setIsSubmit(false);
               }
          }
     }, [isSubmit, formError, new_password, dispatch, old_password]);

     useEffect(() => {
          if (isSuccess) {
               dispatch(reset());
          }
          if (isError && status !== 406) {
               dispatch(reset());
               toast.error(errorMessage);
          }
     }, [dispatch, isError, isSuccess, errorMessage, status]);

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="password-security flex flex-col">
                         <ManageAccSidebar />
                         <div className="preference p-5 m-0 sm:ms-64 pt-5">
                              <Breadcrumb aria-label="Default breadcrumb example">
                                   <Breadcrumb.Item
                                        href="#"
                                        icon={MdOutlineSecurity}
                                   >
                                        Password And Security
                                   </Breadcrumb.Item>
                              </Breadcrumb>
                              <section className="reset-password">
                                   <h1 className="reset-password my-5 font-medium">
                                        Reset Password
                                   </h1>

                                   <form action="" className="sm:w-1/2">
                                        {isError && status === 406 ? (
                                             <Alert
                                                  color="failure"
                                                  icon={HiInformationCircle}
                                             >
                                                  <span className="font-medium">
                                                       Alert!
                                                  </span>{" "}
                                                  {errorMessage}
                                             </Alert>
                                        ) : null}
                                        <div className="form-group flex flex-col mb-5">
                                             <label htmlFor="" className="mb-3">
                                                  Old password
                                             </label>
                                             <input
                                                  type="password"
                                                  name="old_password"
                                                  autoComplete="off"
                                                  onChange={(e) =>
                                                       setOldPassword(
                                                            e.target.value
                                                       )
                                                  }
                                                  placeholder="Enter your old password"
                                                  className="rounded-lg"
                                             />
                                        </div>
                                        <div className="form-group flex flex-col mb-5">
                                             <label htmlFor="" className="mb-3">
                                                  New password
                                             </label>
                                             {formError.new_password && (
                                                  <span className="text-red-600 text-sm">
                                                       {formError.new_password}
                                                  </span>
                                             )}
                                             <input
                                                  type="password"
                                                  name="new_password"
                                                  onChange={(e) =>
                                                       setNewPassword(
                                                            e.target.value
                                                       )
                                                  }
                                                  placeholder="Enter your old password"
                                                  className="rounded-lg"
                                             />
                                        </div>
                                        <div className="form-group flex flex-col mb-5">
                                             <label htmlFor="" className="mb-3">
                                                  Confirm password
                                             </label>
                                             {formError.confirm_password && (
                                                  <span className="text-red-600 text-sm">
                                                       {
                                                            formError.confirm_password
                                                       }
                                                  </span>
                                             )}
                                             <input
                                                  type="password"
                                                  name="confirm_password"
                                                  onChange={(e) =>
                                                       setConfirmPassword(
                                                            e.target.value
                                                       )
                                                  }
                                                  placeholder="Enter your old password"
                                                  className="rounded-lg"
                                             />
                                        </div>
                                        <div className="btn-container flex">
                                             <button
                                                  className="bg-red-600 p-2 px-4 rounded-lg"
                                                  type="reset"
                                             >
                                                  Reset
                                             </button>
                                             <button
                                                  className="bg-primary p-2 px-4 rounded-lg ms-3"
                                                  type="button"
                                                  onClick={resetPassword}
                                             >
                                                  Submit
                                             </button>
                                        </div>
                                   </form>
                              </section>
                         </div>
                    </section>
               )}
          </>
     );
}
