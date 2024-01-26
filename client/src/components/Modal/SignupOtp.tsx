import { Alert, Label, Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { HiInformationCircle } from "react-icons/hi";
import API from "../../api";
import "./SignupOtp.css";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
export default function SignupOtp({
     openModal,
     setOpenModal,
     setIsSubmit,
     email,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     setIsSubmit: Dispatch<SetStateAction<boolean>>;
     email: string;
}) {
     const [error, setError] = useState("");
     const box1 = useRef<HTMLInputElement>(null);
     const box2 = useRef<HTMLInputElement>(null);
     const box3 = useRef<HTMLInputElement>(null);
     const box4 = useRef<HTMLInputElement>(null);

     async function verifyOtp() {
          if (box1.current && box2.current && box3.current && box4.current) {
               const b1 = box1.current.value;
               const b2 = box2.current.value;
               const b3 = box3.current.value;
               const b4 = box4.current.value;
               if (b1 && b2 && b3 && b4) {
                    const otp = b1 + b2 + b3 + b4;
                    try {
                         const response = await API.post("/verify-otp", {
                              otp: otp,
                              email: email,
                         });
                         if (response.data.matchOtp) {
                              setIsSubmit(true);
                              setOpenModal(false);
                         } else {
                              setError(response.data.message);
                         }
                    } catch (error) {
                         const err = error as AxiosError<{
                              message?: string;
                         }>;
                         toast.error(err.response?.data.message);
                    }
               }
          }
     }

     return (
          <Modal
               show={openModal}
               size="md"
               onClose={() => setOpenModal(false)}
               popup
          >
               <Modal.Header />
               <Modal.Body>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                         Enter the OTP
                    </h3>
                    {error && (
                         <Alert color="failure" icon={HiInformationCircle}>
                              <span className="font-medium">Alert!</span>
                              {error}
                         </Alert>
                    )}
                    <div className="otp-box">
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="email"
                                   value="Please input the OTP that has been sent to you."
                              />
                         </div>
                         <div className="inputs flex justify-around py-5">
                         <input
                              type="number"
                              size={1}
                              className="w-12 h-12 rounded-lg"
                              ref={box1}
                              autoFocus
                              onChange={(e) => {
                                   if (
                                        e.target.value &&
                                        e.target.value.length > 1
                                   ) {
                                        if (box1.current) {
                                             box1.current.value =
                                                  e.target.value[1];
                                        }
                                   }
                                   box2.current?.focus();
                              }}
                         />
                         <input
                              type="number"
                              size={1}
                              className="w-12 h-12 rounded-lg"
                              ref={box2}
                              onChange={(e) => {
                                   if (
                                        e.target.value &&
                                        e.target.value.length > 1
                                   ) {
                                        if (box2.current) {
                                             box2.current.value =
                                                  e.target.value[1];
                                        }
                                   }
                                   box3.current?.focus();
                              }}
                         />
                         <input
                              type="number"
                              size={1}
                              className="w-12 h-12 rounded-lg"
                              ref={box3}
                              onChange={(e) => {
                                   if (
                                        e.target.value &&
                                        e.target.value.length > 1
                                   ) {
                                        if (box3.current) {
                                             box3.current.value =
                                                  e.target.value[1];
                                        }
                                   }
                                   box4.current?.focus();
                              }}
                         />
                         <input
                              type="number"
                              size={1}
                              maxLength={1}
                              className="w-12 h-12 rounded-lg"
                              ref={box4}
                              onChange={(e) => {
                                   if (
                                        e.target.value &&
                                        e.target.value.length > 1
                                   ) {
                                        if (box4.current) {
                                             box4.current.value =
                                                  e.target.value[1];
                                        }
                                   }
                                   verifyOtp();
                              }}
                         />
                         </div>
                    </div>
               </Modal.Body>
          </Modal>
     );
}
