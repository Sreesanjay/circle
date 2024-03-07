import { Breadcrumb, FileInput, Label } from "flowbite-react";
import Badge from "@mui/material/Badge";
import { IoMdAddCircleOutline } from "react-icons/io";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import { ChangeEvent, useEffect, useState } from "react";
import { IInterest } from "../../types";
import useHandleError from "../../util/usehandleError";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import API from "../../api";
import ImageCrop from "../../components/ImageCrop/ImageCrop";
import { toast } from "react-toastify";
import { uploadPost } from "../../services/postService";
import Loader from "../../components/Loader/Loader";
import { postReset } from "../../features/post/postSlice";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
     const dispatch = useAppDispatch();
     const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(
          (state) => state.post
     );
     const navigate = useNavigate();
     const [interest, setInterest] = useState<IInterest[]>([]);
     const handleError = useHandleError();
     const { userProfile } = useAppSelector((state) => state.user);
     const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
     const [caption, setCaption] = useState("");
     const [content, setContent] = useState<Blob | undefined>();
     const [visibility, setVisibility] = useState("public");

     const [inputImg, setInputImg] = useState<string>("");
     const [isCrop, setisCrop] = useState(false);
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/manage-account/interest", {
                         withCredentials: true,
                    });
                    if (response.data) {
                         setInterest(response.data.interest);
                         setInterest(response.data.interest);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    if (err) {
                         handleError(err);
                    }
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userProfile]);

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               if(e.target.files[0].size > (5 * 1024 * 1024)){
                    toast.error('maximum file size is 5MB')
               }
               if (e.target.files[0].type.startsWith("image/")) {
                    setInputImg(URL.createObjectURL(e.target.files[0]));
                    setisCrop(true);
               } else if (e.target.files[0].type.startsWith("video/")) {
                    const file = new Blob([e.target.files[0]], {
                         type: e.target.files[0].type,
                    });
                    setContent(file);
               }
          }
     }

     useEffect(() => {
          setInputImg("");
     }, [content]);

     function handleSubmit() {
          if (content) {
               dispatch(
                    uploadPost({
                         content,
                         visibility,
                         caption,
                         tags: selectedInterest,
                    })
               );
          } else {
               toast("error");
          }
     }

     useEffect(() => {
          if (isSuccess) {
               toast("New post created");
               dispatch(postReset());
               navigate("/");
          }
          if (isError) {
               toast.error(errorMessage);
               dispatch(postReset());
          }
     }, [isSuccess, isError, errorMessage, dispatch, navigate]);

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <>
                         <ImageCrop
                              src={inputImg}
                              aspect={1 / 1}
                              isCrop={isCrop}
                              setisCrop={setisCrop}
                              setImage={setContent}
                         />
                         <div className="flex flex-col">
                              <HomeSidebar />
                              <section className="create-post md:ms-80 p-5">
                                   <Breadcrumb aria-label="Default breadcrumb example">
                                        <Breadcrumb.Item
                                             icon={IoMdAddCircleOutline}
                                        >
                                             Create Post
                                        </Breadcrumb.Item>
                                   </Breadcrumb>
                                   <h1 className="text-2xl font-medium mb-5">
                                        Create new Post
                                   </h1>
                                   <div className="body grid grid-cols-4 ">
                                        <div className="preview-section col-span-4 lg:col-span-2">
                                             <div className="mb-2 block pe-10 text-white">
                                                  <Label
                                                       htmlFor="file-upload"
                                                       value="Upload file"
                                                  />
                                                  <FileInput
                                                       id="file-upload"
                                                       className="h-24 "
                                                       onChange={handleChange}
                                                       accept="image/*|video/*"
                                                  />
                                             </div>
                                             <img
                                                  src={
                                                       content
                                                            ? URL.createObjectURL(
                                                                   content
                                                              )
                                                            : undefined
                                                  }
                                                  alt=""
                                             />
                                        </div>
                                        <div className="form-section col-span-4 lg:col-span-2">
                                             <div className="form">
                                                  <div className="form-control flex flex-col lg:pe-16 mb-4">
                                                       <label htmlFor="">
                                                            Add Caption
                                                       </label>
                                                       <textarea
                                                            className="rounded-md bg-gray-800"
                                                            onChange={(e) =>
                                                                 setCaption(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       />
                                                  </div>

                                                  <div className="form-control flex flex-col lg:pe-16 mb-3">
                                                       <label htmlFor="">
                                                            Visibility
                                                       </label>
                                                       <select
                                                            name=""
                                                            id=""
                                                            className="rounded-md bg-gray-800"
                                                            defaultValue={
                                                                 visibility
                                                            }
                                                            onChange={(e) =>
                                                                 setVisibility(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       >
                                                            <option value="public">
                                                                 Public
                                                            </option>
                                                            {/* <option value=""></option> */}
                                                       </select>
                                                  </div>

                                                  <div className="form-control flex flex-col lg:pe-16">
                                                       <label htmlFor="">
                                                            Tags
                                                       </label>
                                                       <div className="selected-tags flex gap-5 my-5 flex-wrap">
                                                            {selectedInterest.map(
                                                                 (
                                                                      item: string,
                                                                      index
                                                                 ) => {
                                                                      const value =
                                                                           interest.find(
                                                                                (
                                                                                     int
                                                                                ) =>
                                                                                     int._id ===
                                                                                     item
                                                                           );
                                                                      return (
                                                                           <Badge
                                                                                badgeContent={
                                                                                     <button
                                                                                          onClick={() =>
                                                                                               setSelectedInterest(
                                                                                                    (
                                                                                                         current
                                                                                                    ) =>
                                                                                                         current.filter(
                                                                                                              (
                                                                                                                   selectedInterest
                                                                                                              ) =>
                                                                                                                   selectedInterest !==
                                                                                                                   item
                                                                                                         )
                                                                                               )
                                                                                          }
                                                                                     >
                                                                                          -
                                                                                     </button>
                                                                                }
                                                                                color="success"
                                                                                key={
                                                                                     index
                                                                                }
                                                                           >
                                                                                {value &&
                                                                                     value.interest}
                                                                           </Badge>
                                                                      );
                                                                 }
                                                            )}
                                                       </div>
                                                       <select
                                                            name=""
                                                            id=""
                                                            className="rounded-md bg-gray-800"
                                                            onChange={(e) =>
                                                                 setSelectedInterest(
                                                                      (
                                                                           current
                                                                      ) => [
                                                                           ...current,
                                                                           e
                                                                                .target
                                                                                .value,
                                                                      ]
                                                                 )
                                                            }
                                                       >
                                                            <option value=""></option>
                                                            {interest &&
                                                                 interest.map(
                                                                      (
                                                                           item,
                                                                           index
                                                                      ) => {
                                                                           return (
                                                                                <option
                                                                                     value={
                                                                                          item._id
                                                                                     }
                                                                                     key={
                                                                                          index
                                                                                     }
                                                                                >
                                                                                     {
                                                                                          item.interest
                                                                                     }
                                                                                </option>
                                                                           );
                                                                      }
                                                                 )}
                                                       </select>
                                                  </div>

                                                  <div className="form-buttons">
                                                       <button
                                                            className="bg-primary hover:bg-primary-hover px-5 py-1 rounded-md text-white mt-5"
                                                            onClick={
                                                                 handleSubmit
                                                            }
                                                       >
                                                            Upload
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </section>
                         </div>
                    </>
               )}
          </>
     );
}
