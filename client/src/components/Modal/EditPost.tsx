import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postReset } from "../../features/post/postSlice";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IInterest, IPost } from "../../types";
import useHandleError from "../../util/usehandleError";
import API from "../../api";
import { Badge } from "@mui/material";
import { editPost } from "../../services/postService";
import Loader from "../Loader/Loader";

export default function EditPost({
     openModal,
     setOpenModal,
     post,
}: {
     openModal: boolean;
     post: IPost;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
     const dispatch = useAppDispatch();
     const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(
          (state) => state.post
     );
     const [interest, setInterest] = useState<IInterest[]>([]);
     const handleError = useHandleError();
     const { userProfile } = useAppSelector((state) => state.user);
     const [selectedInterest, setSelectedInterest] = useState<string[]>(
          post.tags
     );
     const [caption, setCaption] = useState(post.caption);
     const [visibility, setVisibility] = useState(post.visibility);

     useEffect(() => {
          (async () => {
               if (openModal) {
                    try {
                         const response = await API.get(
                              "/manage-account/interest",
                              {
                                   withCredentials: true,
                              }
                         );
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
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userProfile]);

     function handleSubmit() {
          dispatch(
               editPost({
                    data: {
                         content: new Blob(),
                         visibility,
                         caption,
                         tags: selectedInterest,
                    },
                    id: post._id,
               })
          );
     }

     useEffect(() => {
          dispatch(postReset());
          if (isSuccess) {
               setOpenModal(false);
          }
          if (isError) {
               toast.error(errorMessage);
          }
     }, [
          isSuccess,
          isError,
          errorMessage,
          dispatch,
          setOpenModal,
          setVisibility,
          setSelectedInterest,
          setCaption,
          post,
     ]);
     return (
          <div>
               {isLoading ? (
                    <Loader />
               ) : (
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                         <Modal.Header>Terms of Service</Modal.Header>
                         <Modal.Body>
                              <div className="form">
                                   <div className="form-control flex flex-col lg:pe-16 mb-4">
                                        <label htmlFor="">Add Caption</label>
                                        <textarea
                                             className="rounded-md"
                                             onChange={(e) =>
                                                  setCaption(e.target.value)
                                             }
                                             value={caption}
                                        />
                                   </div>

                                   <div className="form-control flex flex-col lg:pe-16 mb-3">
                                        <label htmlFor="">Visibility</label>
                                        <select
                                             name=""
                                             id=""
                                             className="rounded-md"
                                             defaultValue={visibility}
                                             onChange={(e) =>
                                                  setVisibility(e.target.value)
                                             }
                                        >
                                             <option value="public">
                                                  Public
                                             </option>
                                             {/* <option value=""></option> */}
                                        </select>
                                   </div>

                                   <div className="form-control flex flex-col lg:pe-16">
                                        <label htmlFor="">Tags</label>
                                        <div className="selected-tags flex gap-5 my-5 flex-wrap">
                                             {selectedInterest.map(
                                                  (item: string, index) => {
                                                       const value =
                                                            interest.find(
                                                                 (int) =>
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
                                                                 key={index}
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
                                             className="rounded-md "
                                             onChange={(e) =>
                                                  setSelectedInterest(
                                                       (current) => [
                                                            ...current,
                                                            e.target.value,
                                                       ]
                                                  )
                                             }
                                        >
                                             <option value=""></option>
                                             {interest &&
                                                  interest.map(
                                                       (item, index) => {
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
                                             className="bg-red-600 hover:bg-red-800 px-5 py-1 rounded-md text-white mt-5 mr-5"
                                             onClick={() => {
                                                  setVisibility(
                                                       post.visibility
                                                  );
                                                  setSelectedInterest(
                                                       post.tags
                                                  );
                                                  setCaption(post.caption);
                                             }}
                                        >
                                             Reset
                                        </button>
                                        <button
                                             className="bg-primary hover:bg-primary-hover px-5 py-1 rounded-md text-white mt-5"
                                             onClick={handleSubmit}
                                        >
                                             Upload
                                        </button>
                                   </div>
                              </div>
                         </Modal.Body>
                    </Modal>
               )}
          </div>
     );
}
