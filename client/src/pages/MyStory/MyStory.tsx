import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { IoMdArrowDropup } from "react-icons/io";
import { deleteStory, getMyStory } from "../../services/storyService";
import { IoMdArrowDropdown } from "react-icons/io";
import API from "../../api";
import "./MyStory.css";
import ProfileIcon from "../../assets/ProfileIcon";
import { resetStory } from "../../features/story/storySlice";
import { Carousel } from "flowbite-react";
import {
     AddIcon,
     CloseXIcon,
     DeleteBin,
     DislikeIcon,
     ProfileIconWithText,
} from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IuserDetails } from "../../types";

export default function MyStory() {
     const navigate = useNavigate();
     const { myStory, isSuccess } = useAppSelector((state) => state.story);
     const { userProfile } = useAppSelector((state) => state.user);
     const dispatch = useAppDispatch();
     const [viewers, setViewers] = useState<IuserDetails[] | []>([]);
     //for setting the view viewers list
     const [openViewers, setOpenViewers] = useState(false);
     const [current, setCurrent] = useState(0); //for checkign whether slide changed or not
     useEffect(() => {
          dispatch(getMyStory());
     }, [dispatch]);
     useEffect(() => {
          if (isSuccess) {
               dispatch(resetStory());
          }
     }, [isSuccess, dispatch]);

     function deleteHandle(id: string) {
          dispatch(deleteStory(id));
     }

     async function getStoryViewers(id: string) {
          try {
               const response = await API.get(`/story/get-viewers-list/${id}`, {
                    withCredentials: true,
               });
               if (response.data) {
                    setViewers(response.data.userList);
                    setOpenViewers(true);
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast(err.message);
          }
     }

     return (
          <section className="sm:p-5 flex bg-gray-800 justify-center w-screen">
               <div className="story-card rounded-md relative w-screen sm:w-1/4 sm:min-w-96">
                    <div className="header p-3 flex gap-3 absolute z-20">
                         <ProfileIcon size="small" />
                         <h1>{userProfile?.username}</h1>
                         <div
                              className="absolute left-5 top-5"
                              onClick={() => navigate("/add-story")}
                         >
                              <AddIcon size={30} />
                         </div>
                    </div>
                    <Carousel
                         indicators={false}
                         slideInterval={10000}
                         onSlideChange={(index) => {
                              if (index !== current) {
                                   setOpenViewers(false);
                                   setCurrent(index);
                              }
                         }}
                    >
                         {myStory?.map((item) => {
                              return (
                                   <div
                                        className={`story ${
                                             item.background
                                        } h-full flex items-center justify-center rounded-md flex-wrap ${
                                             item.visibility === "CLOSE_FRIENDS"
                                                  ? "border"
                                                  : ""
                                        }`}
                                   >
                                        {item.story_type === "TEXT" ? (
                                             <h1
                                                  className={`text-${item.color} text-2xl`}
                                             >
                                                  {item.content}
                                             </h1>
                                        ) : (
                                             <img
                                                  src={item.content}
                                                  alt=""
                                                  className=""
                                             />
                                        )}
                                        <div className="footer absolute min-h-5 w-full bottom-0 px-5 py-1">
                                             <div className="flex">
                                                  {openViewers ? (
                                                       <button
                                                            className="flex items-center"
                                                            onClick={() =>
                                                                 setOpenViewers(
                                                                      false
                                                                 )
                                                            }
                                                       >
                                                            {
                                                                 item
                                                                      .story_viewers
                                                                      .length
                                                            }
                                                            Views
                                                            <IoMdArrowDropdown className="text-2xl" />
                                                       </button>
                                                  ) : (
                                                       <button
                                                            className="flex items-center"
                                                            onClick={() =>
                                                                 getStoryViewers(
                                                                      item._id
                                                                 )
                                                            }
                                                       >
                                                            {
                                                                 item
                                                                      .story_viewers
                                                                      .length
                                                            }
                                                            Views
                                                            <IoMdArrowDropup className="text-2xl" />
                                                       </button>
                                                  )}
                                                  <button
                                                       className="cursor-pointer ms-5"
                                                       onClick={() =>
                                                            deleteHandle(
                                                                 item._id
                                                            )
                                                       }
                                                  >
                                                       <DeleteBin size={25} />
                                                  </button>
                                             </div>

                                             {openViewers && (
                                                  <div className="viewers bg-gray-600 py-4 ps-2 shadow-md rounded-md">
                                                       {viewers &&
                                                            viewers.map(
                                                                 (
                                                                      userDetails
                                                                 ) => {
                                                                      return (
                                                                           <>
                                                                                <div className="user-card mb-2 flex items-center justify-between">
                                                                                     <div className="left flex">
                                                                                          {userDetails?.profile_img ? (
                                                                                               <img
                                                                                                    src={
                                                                                                         userDetails?.profile_img
                                                                                                    }
                                                                                                    alt=""
                                                                                                    style={{}}
                                                                                                    className="w-9 rounded-lg"
                                                                                               />
                                                                                          ) : (
                                                                                               <ProfileIconWithText
                                                                                                    email={
                                                                                                         userDetails
                                                                                                              .email
                                                                                                              ?.email ||
                                                                                                         ""
                                                                                                    }
                                                                                                    size={
                                                                                                         "small"
                                                                                                    }
                                                                                               />
                                                                                          )}
                                                                                          <h1 className="ms-2 text-white">
                                                                                               {
                                                                                                    userDetails.username
                                                                                               }
                                                                                          </h1>
                                                                                     </div>
                                                                                     {item &&
                                                                                     item.likes.includes(
                                                                                          userDetails.user_id
                                                                                     ) ? (
                                                                                          <DislikeIcon
                                                                                               size={
                                                                                                    45
                                                                                               }
                                                                                          />
                                                                                     ) : null}
                                                                                </div>
                                                                           </>
                                                                      );
                                                                 }
                                                            )}
                                                  </div>
                                             )}
                                        </div>
                                   </div>
                              );
                         })}
                    </Carousel>
               </div>
               <div
                    className="close-icon absolute right-5"
                    onClick={() => navigate("/")}
               >
                    <CloseXIcon size={45} />
               </div>
          </section>
     );
}
