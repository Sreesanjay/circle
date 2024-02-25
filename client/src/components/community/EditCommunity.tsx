import { Modal } from "flowbite-react";
import Loader from "../Loader/Loader";
import {
     ChangeEvent,
     Dispatch,
     SetStateAction,
     useEffect,
     useState,
} from "react";
import { ICommunity, IInterest } from "../../types";
import API from "../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editCommunity, updateIcon } from "../../services/communityService";
import { resetCommunity } from "../../features/community/communitySlice";
import { useNavigate } from "react-router-dom";
import ImageCrop from "../ImageCrop/ImageCrop";

export default function EditCommunity({
     showModal,
     setShowModal,
     community,
     setCommunity,
}: {
     showModal: boolean;
     setShowModal: Dispatch<SetStateAction<boolean>>;
     community: ICommunity | null;
     setCommunity: Dispatch<SetStateAction<ICommunity | null>>;
}) {
     const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(
          (state) => state.community
     );

     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const [interests, setInterests] = useState<IInterest[] | []>([]);
     const [isCrop, setIsCrop] = useState(false);
     const [formData, setFormData] = useState({
          community_name: "",
          topic: "",
          privacy: "public",
          about: "",
     });
     const [icon, setIcon] = useState<Blob | undefined>();
     const [inputImg, setInputImg] = useState<string>("");
     const [iconUrl, setIconUrl] = useState<string>("");

     useEffect(() => {
          if (icon) {
               (async () => {
                    const file = new File([icon], "icon", {
                         type: icon.type,
                    });
                    const response = await updateIcon(file);
                    setIconUrl(response as string);
               })();
          }
     }, [icon]);

     useEffect(() => {
          if (community) {
               setFormData({
                    community_name: community?.community_name,
                    topic: community?.topic,
                    privacy: community?.privacy,
                    about: community?.about,
               });
          }
     }, [community]);

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

     function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               setInputImg(URL.createObjectURL(e.target.files[0]));
               setIsCrop(true);
          }
     }

     async function handleSubmit() {
          if (formData.community_name && formData.topic && community) {
               const response = await dispatch(
                    editCommunity({
                         formData: { ...formData, icon: iconUrl },
                         id: community._id,
                    })
               );
               if (response.payload.community) {
                    setCommunity({
                         ...community,
                         community_name:
                              response.payload.community.community_name,
                         topic: response.payload.community.topic,
                         about: response.payload.community.about,
                         privacy: response.payload.community.privacy,
                         icon: response.payload.community.icon,
                    });
                    setShowModal(false);
               }
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
                              setShowModal(false);
                         }}
                         popup
                    >
                         <Modal.Header>
                              <div className="p-4">New Community</div>
                         </Modal.Header>
                         <Modal.Body>
                              <div className="icon flex flex-col">
                                   <label htmlFor="" className="font-medium">
                                        Choose icon
                                   </label>
                                   <input
                                        type="file"
                                        className="rounded-md"
                                        onChange={handleFileChange}
                                   />
                              </div>
                              <div className="input-group flex flex-col mt-4">
                                   <label htmlFor="" className="font-medium">
                                        Community Name
                                   </label>
                                   <input
                                        type="text"
                                        name="community_name"
                                        id=""
                                        value={formData.community_name}
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
                                             value={formData.topic}
                                        >
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
                                             value={formData.privacy}
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
                                        value={formData.about}
                                        onChange={handleChange}
                                   ></textarea>
                              </div>

                              <div className="btn py-5">
                                   <button
                                        className="btn px-5 py-1 bg-red-700 hover:bg-red-500 rounded-md text-white"
                                        onClick={() => {
                                             if (community) {
                                                  setFormData({
                                                       community_name:
                                                            community?.community_name,
                                                       topic: community.topic,
                                                       privacy: community.privacy,
                                                       about: community.about,
                                                  });
                                             }
                                        }}
                                   >
                                        Clear
                                   </button>
                                   <button
                                        className="btn px-5 py-1 bg-primary hover:bg-primary-hover ms-3 rounded-md text-white"
                                        onClick={handleSubmit}
                                   >
                                        Update
                                   </button>
                              </div>
                         </Modal.Body>
                    </Modal>
               )}
               <ImageCrop
                    src={inputImg}
                    aspect={1 / 1}
                    isCrop={isCrop}
                    setisCrop={setIsCrop}
                    setImage={setIcon}
               />
          </>
     );
}
