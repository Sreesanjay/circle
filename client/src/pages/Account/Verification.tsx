import { Alert } from "flowbite-react";
import { useAppSelector } from "../../app/hooks";
import { HiInformationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase";
import "./Verification.css";
import { IPlan } from "../../types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import API from "../../api";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Verification() {
     const { userProfile } = useAppSelector((state) => state.user);
     const navigate = useNavigate();
     const { user } = useAppSelector((state) => state.auth);
     const [idCard, setIdCard] = useState<File>();
     const [docImage, setDocImage] = useState<string>();
     const [idType, setIdType] = useState<string>();
     const [plans, setPlans] = useState<IPlan[] | null>(null);
     const [selectedPlan, setSelectedPlan] = useState<IPlan>();
     const [error, setError] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     useEffect(() => {
          (async () => {
               if (idCard) {
                    const filename = new Date().getTime() + idCard.name;
                    const storageRef = ref(storage, "docs/" + filename);
                    const snapshot = await uploadBytes(storageRef, idCard);
                    if (snapshot) {
                         const url = await getDownloadURL(storageRef);
                         setDocImage(url);
                    }
               }
          })();
     }, [idCard]);

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         "/posts/plans?planType=VERIFICATION"
                    );
                    setPlans(response.data.plan);
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    if (err.response) {
                         toast.error(err.response?.data.message);
                    } else {
                         toast.error(err.message);
                    }
               }
          })();
     }, []);

     async function handleSuccess(response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
     }) {
          if (
               response.razorpay_order_id &&
               response.razorpay_payment_id &&
               response.razorpay_signature
          ) {
               setIsLoading(true);

               try {
                    const res = await API.post("/profile/add-verification", {
                         plan_id: selectedPlan?._id,
                         amount: selectedPlan?.amount,
                         document: docImage,
                         document_type: idType,
                         payment: response,
                    });
                    if (res.data) {
                         setIsLoading(false);
                         toast.success("Your verification added successfully");
                         navigate("/profile");
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    if (err.response) {
                         toast.error(err.response?.data.message);
                    } else {
                         toast.error(err.message);
                    }
               }
          }
     }

     async function handleSubmit() {
          if (!docImage) {
               setError("Add id card image");
          } else if (!idType) {
               setError("Add id card type");
          } else if (!selectedPlan) {
               setError("Select a plan");
          } else {
               setError("");
               try {
                    const response = await API.post("/profile/createPayment", {
                         plan_id: selectedPlan?._id,
                    });
                    if (response.data.order) {
                         const options = {
                              key: "rzp_test_qYNtji31kEDmBr",
                              amount: response.data.order.amount,
                              currency: "INR",
                              name: "Payment razorpay",
                              description: "Test Transaction",
                              image: "https://example.com/your_logo",
                              order_id: response.data.order.id,

                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              handler: function (response: any) {
                                   handleSuccess(response);
                              },
                              prefill: {
                                   name: userProfile?.username,
                                   email: user?.email,
                              },
                              theme: {
                                   color: "#3399cc",
                              },
                         };

                         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                         // @ts-ignore
                         const rzp1 = new window.Razorpay(options);

                         rzp1.open();
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    if (err.response) {
                         toast.error(err.response?.data.message);
                    } else {
                         toast.error(err.message);
                    }
               }
          }
     }

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="verification p-5 w-full flex">
                         <div className="card sm:w-1/2 rounded-md p-5 left-section">
                              <h1 className="text-2xl mb-5">
                                   Account Verification
                              </h1>

                              {!userProfile?.profile_img && (
                                   <Alert
                                        color="failure"
                                        icon={HiInformationCircle}
                                   >
                                        <span className="font-medium">
                                             Info alert!
                                        </span>{" "}
                                        Update Your profile image before
                                        continuing
                                   </Alert>
                              )}
                              {error && (
                                   <Alert
                                        color="failure"
                                        icon={HiInformationCircle}
                                   >
                                        <span className="font-medium">
                                             Info alert!
                                        </span>{" "}
                                        {error}
                                   </Alert>
                              )}
                              <div className="file flex flex-col mt-5">
                                   <label htmlFor="">
                                        Add a government approved ID Card Image
                                   </label>
                                   <input
                                        type="file"
                                        className="bg-gray-600 w-min border mt-5"
                                        onChange={(e) => {
                                             if (e.target.files) {
                                                  setIdCard(e.target.files[0]);
                                             }
                                        }}
                                   />

                                   <label htmlFor="" className="mt-8 mb-5 ">
                                        Select Document type
                                   </label>
                                   <select
                                        name=""
                                        id=""
                                        className="bg-gray-800 rounded-md"
                                        onChange={(e) => {
                                             setIdType(e.target.value);
                                        }}
                                   >
                                        <option value="">choose a dodument type</option>
                                        <option value="Adhar_card">
                                             Adhar Card
                                        </option>
                                        <option value="Voter_id">
                                             Voter Id
                                        </option>
                                        <option value="Driving_licence">
                                             Driving licence
                                        </option>
                                   </select>
                                   <h1 className="mt-5">Select a plan</h1>
                                   {plans?.map((plan, index) => {
                                        return (
                                             <div
                                                  className={`w-48 h-48 mt-5 bg-gray-900 rounded-md flex flex-col items-center p-3 shadow-lg ${
                                                       selectedPlan?._id ===
                                                            plan._id && "border"
                                                  }`}
                                                  key={index}
                                                  onClick={() =>
                                                       setSelectedPlan(plan)
                                                  }
                                             >
                                                  <h1 className="text-4xl">
                                                       ₹{plan.amount}{" "}
                                                  </h1>
                                                  <p>
                                                       For{" "}
                                                       {Math.floor(
                                                            plan.duration / 30
                                                       )}{" "}
                                                       Month
                                                  </p>
                                                  <small className="text-center mt-5">
                                                       {plan.discription}
                                                  </small>
                                             </div>
                                        );
                                   })}
                                   <div className="btn-group">
                                        <button className="px-5 py-1 w-min bg-red-700 hover:bg-red-800 rounded-md mt-5">
                                             Cancel
                                        </button>
                                        <button
                                             className="px-5 w-min  ms-5 py-1 bg-primary hover:bg-primary-hover rounded-md mt-10"
                                             onClick={handleSubmit}
                                        >
                                             Submit
                                        </button>
                                   </div>
                              </div>
                         </div>
                         {/* <div className="right-section">
                    <h1>Summary</h1>
                    <button
                         className="px-3 py-1 bg-primary hover:bg-primary-hover rounded-md mt-10"
                         onClick={handleSubmit}
                    >
                         Submit
                    </button>
                    <button className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded-md mt-5">
                         Cancel
                    </button>
               </div> */}
                    </section>
               )}
          </>
     );
}
