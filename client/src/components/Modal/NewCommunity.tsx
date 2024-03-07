import { Modal } from "flowbite-react";
import Loader from "../Loader/Loader";
import {
     ChangeEvent,
     Dispatch,
     SetStateAction,
     useEffect,
     useState,
} from "react";
import { IInterest } from "../../types";
import API from "../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { newCommunity } from "../../services/communityService";
import { resetCommunity } from "../../features/community/communitySlice";
import { useNavigate } from "react-router-dom";

export default function NewCommunity({
     showModal,
     setShowModal,
}: {
     showModal: boolean;
     setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
     const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(
          (state) => state.community
     );

     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const [error, setError] = useState("");
     const [interests, setInterests] = useState<IInterest[] | []>([]);
     const [formData, setFormData] = useState({
          community_name: "",
          topic: null,
          privacy: "public",
          about: "",
     });

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/manage-account/interest");
                    if (response.data) {
                         setInterests(response.data.interest);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.response?.data.message);
               }
          })();
     }, []);

     function handleChange(
          e:
               | ChangeEvent<HTMLInputElement>
               | ChangeEvent<HTMLTextAreaElement>
               | ChangeEvent<HTMLSelectElement>
     ) {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     }

     useEffect(() => {
          if (isError) {
               toast.error(errorMessage);
          }
          if (isSuccess) {
               setShowModal(false);
          }
          if (isError || isSuccess) {
               dispatch(resetCommunity());
          }
     }, [isError, isSuccess, dispatch, errorMessage, navigate, setShowModal]);

     function handleSubmit() {
          if (formData.community_name && formData.topic) {
               setError("");
               dispatch(newCommunity(formData));
          } else if (!formData.community_name) {
               setError("Please select a name");
          } else if (!formData.topic) {
               setError("Please select a topic");
          }
     }
     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <Modal
                         show={showModal}
                         size="2xl"
                         onClose={() => {
                              setError("");
                              setShowModal(false);
                         }}
                         popup
                    >
                         <Modal.Header>
                              <div className="p-4">New Community</div>
                         </Modal.Header>
                         <Modal.Body>
                              {error && (
                                   <small className="text-sm text-red-600">
                                        {error}
                                   </small>
                              )}
                              <div className="input-group flex flex-col">
                                   <label htmlFor="" className="font-medium">
                                        Community Name
                                   </label>
                                   <input
                                        type="text"
                                        name="community_name"
                                        id=""
                                        className="rounded-md"
                                        onChange={handleChange}
                                   />
                              </div>
                              <div className="flex gap-3 w-full justify-between">
                                   <div className="input-group flex flex-col mt-5 w-full">
                                        <label
                                             htmlFor=""
                                             className="font-medium"
                                        >
                                             Choose a Topic
                                        </label>
                                        <select
                                             name="topic"
                                             id=""
                                             className="rounded-md"
                                             onChange={handleChange}
                                        >
                                             <option value=""></option>
                                             {interests.map((item, index) => {
                                                  return (
                                                       <option
                                                            value={item._id}
                                                            key={index}
                                                       >
                                                            {item.interest}
                                                       </option>
                                                  );
                                             })}
                                        </select>
                                   </div>
                                   <div className="input-group flex flex-col mt-5 mb-5 w-full">
                                        <label
                                             htmlFor=""
                                             className="font-medium"
                                        >
                                             Privacy
                                        </label>
                                        <select
                                             name="privacy"
                                             id=""
                                             className="rounded-md"
                                             onChange={handleChange}
                                        >
                                             <option value="public">
                                                  Public
                                             </option>
                                             <option value="private">
                                                  Private
                                             </option>
                                        </select>
                                   </div>
                              </div>
                              <div className="input-group flex flex-col mt-5">
                                   <label htmlFor="" className="font-medium">
                                        About
                                   </label>
                                   <textarea
                                        name="about"
                                        id=""
                                        className="rounded-md"
                                   />
                              </div>

                              <div className="btn py-5">
                                   <button
                                        className="btn px-5 py-1 bg-red-700 hover:bg-red-500 rounded-md text-white"
                                        onClick={() => {
                                             setFormData({
                                                  community_name: "",
                                                  topic: null,
                                                  privacy: "public",
                                                  about: "",
                                             });
                                        }}
                                   >
                                        Clear
                                   </button>
                                   <button
                                        className="btn px-5 py-1 bg-primary hover:bg-primary-hover ms-3 rounded-md text-white"
                                        onClick={handleSubmit}
                                   >
                                        Create
                                   </button>
                              </div>
                         </Modal.Body>
                    </Modal>
               )}
          </>
     );
}
