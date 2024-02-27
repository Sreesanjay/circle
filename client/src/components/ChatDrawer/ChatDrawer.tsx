import { Drawer } from "@mui/material";
import {
     AddIcon,
     CloseCircleIcon,
     EditPenIcon,
     ProfileIconWithText,
     RemoveIcon,
} from "../../assets/Icons";
import {
     ChangeEvent,
     Dispatch,
     RefObject,
     SetStateAction,
     useEffect,
     useRef,
     useState,
} from "react";
import API from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { userList } from "../../types";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Report from "../../components/Modal/Report";
import {
     addMember,
     changeChatName,
     changeGroupIcon,
     removeMember,
} from "../../services/chatService";
import {
     updateChatName,
     updateGroupIcon,
     updateMembers,
} from "../../features/Socket/SocketSlice";
import "./ChatDrawer.css";
import ImageCrop from "../ImageCrop/ImageCrop";
import { AxiosError } from "axios";
import { Socket } from "socket.io-client";

export default function ChatDrawer({
     userDetails,
     setOpenDrawer,
     openDrawer,
     socket,
}: {
     userDetails: userList[] | null;
     openDrawer: boolean;
     setOpenDrawer: Dispatch<SetStateAction<boolean>>;
     socket: RefObject<Socket>;
}) {
     const dispatch = useAppDispatch();
     const [isEditGroupName, setIsEditGroupName] = useState(false);
     const { currentChat } = useAppSelector((state) => state.socket);
     const { user } = useAppSelector((state) => state.auth);
     const [chat_name, setChat_name] = useState(currentChat?.chat_name || "");
     const iconInput = useRef<HTMLInputElement>(null);
     const [reportId, setReportId] = useState<string | null>(null);
     const [inputImg, setInputImg] = useState<string>("");
     const [isCrop, setisCrop] = useState(false);
     const [groupIcon, setGroupIcon] = useState<Blob | undefined>();
     const [search, setSearch] = useState("");
     const [showAddMemberInput, setShowAddMemberInput] = useState(false);
     const [userData, setUserData] = useState<
          | {
                 user_id: string;
                 username: string;
                 fullname: string;
                 profile_img: string;
            }[]
          | []
     >([]);

     useEffect(() => {
          if (currentChat?.is_groupchat) {
               setReportId(currentChat._id);
          } else {
               const id = currentChat?.members.find(
                    (item) => item !== user?._id
               );
               setReportId(id as string);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userDetails]);

     const [openReport, setOpenReport] = useState(false);

     async function handleChangeChatName() {
          if (chat_name === currentChat?.chat_name) return;
          const response = await changeChatName({
               chat_name,
               chat_id: currentChat?._id as string,
          });
          if (response) {
               toast(response.message);
               dispatch(updateChatName(response.chat));
               setIsEditGroupName(false);
          }
     }

     function handleIconChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               setInputImg(URL.createObjectURL(e.target.files[0]));
               setOpenDrawer(false);
               setisCrop(true);
          }
     }
     async function handleAddMember(user_id: string) {
          if (user_id && currentChat) {
               const response = await addMember({
                    chat_id: currentChat?._id,
                    user: user_id,
               });
               if (response.chat) {
                    dispatch(updateMembers(response.chat));
                    socket?.current?.emit("new-chat", response.chat);
               }
          }
     }
     async function handleRemoveMember(user_id: string) {
          if (user_id && currentChat) {
               const response = await removeMember({
                    chat_id: currentChat?._id,
                    user: user_id,
               });
               if (response.chat) {
                    dispatch(updateMembers(response.chat));
                    socket?.current?.emit("exit-chat", response.chat);
               }
          }
     }

     useEffect(() => {
          (async () => {
               if (groupIcon && currentChat) {
                    const response = await changeGroupIcon({
                         chat_id: currentChat._id,
                         icon: groupIcon,
                    });
                    if (response.chat) {
                         dispatch(updateGroupIcon(response.chat));
                    }
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [groupIcon]);

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/users/user-search?search=${search}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setUserData(
                              response.data.userData.filter(
                                   (item: {
                                        user_id: string;
                                        username: string;
                                        fullname: string;
                                        profile_img: string;
                                   }) => {
                                        if (
                                             !currentChat?.members.includes(
                                                  item.user_id
                                             )
                                        ) {
                                             return item;
                                        }
                                   }
                              )
                         );
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.response?.data.message);
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [search]);

     async function handleExitChat() {
          if (user?._id && currentChat) {
               const response = await removeMember({
                    chat_id: currentChat?._id,
                    user: user?._id,
               });
               if (response.chat) {
                    dispatch(updateMembers(response.chat));
                    socket?.current?.emit("exit-chat", response.chat);
               }
          }
     }
     return (
          <>
               <Report
                    openModal={openReport}
                    setOpenModal={setOpenReport}
                    id={reportId as string}
                    reported_type={"group"}
               />
               <ImageCrop
                    src={inputImg}
                    aspect={1 / 1}
                    isCrop={isCrop}
                    setisCrop={setisCrop}
                    setImage={setGroupIcon}
               />
               <Drawer
                    anchor={"right"}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
               >
                    <div className="btn text-3xl p-3 bg-gray-700 sm:hidden" onClick={() => setOpenDrawer(false)} >
                         <IoChevronBackCircleSharp />
                    </div>
                    <div className="chat-drawer bg-gray-700 overflow-y-scroll flex flex-col items-center pt-16">
                         <section className="header flex flex-col items-center">
                              <div className="profile-img relative">
                                   <div className="img">
                                        {currentChat &&
                                        currentChat.is_groupchat ? (
                                             currentChat.icon ? (
                                                  <img
                                                       src={currentChat.icon}
                                                       alt="dsfkajfhskadfh"
                                                       className="w-24 h-24 rounded-full"
                                                  />
                                             ) : (
                                                  <ProfileIconWithText
                                                       size={"large"}
                                                       email={
                                                            currentChat?.chat_name ||
                                                            ""
                                                       }
                                                  />
                                             )
                                        ) : userDetails &&
                                          userDetails[0]?.profile_img ? (
                                             <img
                                                  src={
                                                       userDetails[0]
                                                            .profile_img
                                                  }
                                                  alt="dsfkajfhskadfh"
                                                  className="w-24 h-24 rounded-full"
                                             />
                                        ) : (
                                             <ProfileIconWithText
                                                  size={"large"}
                                                  email={
                                                       (userDetails &&
                                                            userDetails[0]
                                                                 ?.email) ||
                                                       ""
                                                  }
                                             />
                                        )}
                                   </div>
                                   <div className="edit-icon w-full h-full bg-gray-600 absolute top-0  justify-center items-center">
                                        <div
                                             className="h-min"
                                             onClick={() =>
                                                  iconInput.current?.click()
                                             }
                                        >
                                             <EditPenIcon size={25} />
                                        </div>
                                   </div>
                              </div>
                              <input
                                   type="file"
                                   className="icon-input"
                                   ref={iconInput}
                                   onChange={handleIconChange}
                              />
                              <div className="name ">
                                   {currentChat?.is_groupchat ? (
                                        <div className="relative flex justify-center">
                                             {isEditGroupName ? (
                                                  <input
                                                       type="text"
                                                       value={chat_name}
                                                       className="mt-5 rounded-md"
                                                       onChange={(e) =>
                                                            setChat_name(
                                                                 e.target.value
                                                            )
                                                       }
                                                  />
                                             ) : (
                                                  <h1 className="text-white text-center text-3xl mt-5">
                                                       {currentChat?.chat_name}
                                                  </h1>
                                             )}
                                             {isEditGroupName ? (
                                                  <>
                                                       <button
                                                            className="ms-3 mt-7 text-white rounded-md h-min bg-primary hover:bg-primary-hover"
                                                            onClick={() =>
                                                                 handleChangeChatName()
                                                            }
                                                       >
                                                            <DoneIcon />
                                                       </button>
                                                       <button
                                                            className="ms-3 text-white mt-7 rounded-md h-min bg-red-700 hover:bg-primary-hover"
                                                            onClick={() =>
                                                                 setIsEditGroupName(
                                                                      false
                                                                 )
                                                            }
                                                       >
                                                            <CloseIcon />
                                                       </button>
                                                  </>
                                             ) : (
                                                  currentChat.admins?.includes(
                                                       user?._id as string
                                                  ) && (
                                                       <div
                                                            className="edit-group-name rounded-full absolute right-0 top-7 bottom-0 cursor-pointer"
                                                            onClick={() =>
                                                                 setIsEditGroupName(
                                                                      !isEditGroupName
                                                                 )
                                                            }
                                                       >
                                                            <EditPenIcon
                                                                 size={25}
                                                            />
                                                       </div>
                                                  )
                                             )}
                                        </div>
                                   ) : (
                                        userDetails && (
                                             <>
                                                  <h1 className="text-white text-center text-3xl mt-5">
                                                       {
                                                            userDetails[0]
                                                                 ?.username
                                                       }
                                                  </h1>
                                                  <h3 className="text-white text-center">
                                                       {
                                                            userDetails[0]
                                                                 ?.fullname
                                                       }
                                                  </h3>
                                             </>
                                        )
                                   )}
                              </div>
                         </section>
                         <section className="flex gap-5 pt-10">
                              {currentChat?.is_groupchat ? (
                                   currentChat.members.includes(
                                        user?._id as string
                                   ) && (
                                        <button
                                             className="exit-group px-4 py-1 rounded-md text-secondary bg-primary hover:bg-primary-hover"
                                             onClick={() => {
                                                  setShowAddMemberInput(false);
                                                  handleExitChat();
                                             }}
                                        >
                                             Exit
                                        </button>
                                   )
                              ) : (
                                   <button className="exit-group px-4 py-1 rounded-md text-secondary bg-primary hover:bg-primary-hover">
                                        Block
                                   </button>
                              )}
                              <button
                                   className="report px-4 py-1 rounded-md text-secondary bg-red-700"
                                   onClick={() => setOpenReport(true)}
                              >
                                   Report
                              </button>
                         </section>
                         <div className="members text-white w-full p-5 pt-10">
                              <h1 className="text-lg text-slate-200">
                                   Members ({userDetails?.length})
                              </h1>
                              <div className="members-container">
                                   {currentChat &&
                                        currentChat.admins?.includes(
                                             user?._id as string
                                        ) && (
                                             <button
                                                  className="add-member py-1 px-5 w-full text-left mt-5 rounded-md text-slate-400"
                                                  onClick={() =>
                                                       setShowAddMemberInput(
                                                            !showAddMemberInput
                                                       )
                                                  }
                                             >
                                                  {showAddMemberInput ? (
                                                       <CloseCircleIcon
                                                            size={25}
                                                       />
                                                  ) : (
                                                       <AddIcon size={25} />
                                                  )}
                                                  Add Member
                                             </button>
                                        )}
                                   {showAddMemberInput && (
                                        <div className="add-member-search mt-5">
                                             <input
                                                  type="text"
                                                  className="search bg-seconday-bg border-none rounded-md w-full shadow-lg"
                                                  onChange={(e) =>
                                                       setSearch(e.target.value)
                                                  }
                                                  placeholder="Add user"
                                                  value={search}
                                             />
                                        </div>
                                   )}
                                   {userData.length > 0 && (
                                        <div className="user-list-search absolute mt-2 py-2 bg-seconday-bg w-80 shadow-md cursor-pointer z-20">
                                             {userData.map((user, index) => {
                                                  return (
                                                       <div
                                                            className="user h-12 flex px-3 gap-3 items-center mb-2"
                                                            key={index}
                                                            onClick={() => {
                                                                 setSearch("");
                                                                 handleAddMember(
                                                                      user.user_id
                                                                 );
                                                            }}
                                                       >
                                                            <img
                                                                 src={
                                                                      user.profile_img
                                                                 }
                                                                 alt=""
                                                                 className="w-11 shadow rounded-md"
                                                            />
                                                            <div className="name leading-none">
                                                                 <h1>
                                                                      {
                                                                           user.username
                                                                      }
                                                                 </h1>
                                                                 <small>
                                                                      {
                                                                           user.fullname
                                                                      }
                                                                 </small>
                                                            </div>
                                                       </div>
                                                  );
                                             })}
                                        </div>
                                   )}
                                   <div className="user-list mt-5 ">
                                        {userDetails &&
                                             userDetails.map(
                                                  (userProfile, index) => {
                                                       return (
                                                            <div
                                                                 className="user h-12 flex px-3 gap-3 items-center mb-2 shadow-sm hover:bg-gray-600 rounded-md"
                                                                 key={index}
                                                                 onClick={() => {
                                                                      setSearch(
                                                                           ""
                                                                      );
                                                                 }}
                                                            >
                                                                 {userProfile.profile_img ? (
                                                                      <img
                                                                           src={
                                                                                userProfile.profile_img
                                                                           }
                                                                           alt=""
                                                                           className="w-11 shadow rounded-md"
                                                                      />
                                                                 ) : (
                                                                      <ProfileIconWithText
                                                                           email={
                                                                                userProfile.email
                                                                           }
                                                                           size={
                                                                                "small"
                                                                           }
                                                                      />
                                                                 )}
                                                                 <div className="name leading-none">
                                                                      <h1>
                                                                           {
                                                                                userProfile.username
                                                                           }
                                                                           {userProfile.user_id ===
                                                                                user?._id &&
                                                                                " (You)"}
                                                                      </h1>
                                                                      <small>
                                                                           {
                                                                                userProfile.fullname
                                                                           }
                                                                      </small>
                                                                 </div>
                                                                 {(currentChat &&
                                                                      !currentChat.admins?.includes(
                                                                           user?._id as string
                                                                      )) ||
                                                                      (userProfile.user_id !==
                                                                           user?._id && (
                                                                           <div
                                                                                className="remove-icon"
                                                                                onClick={() =>
                                                                                     handleRemoveMember(
                                                                                          userProfile.user_id
                                                                                     )
                                                                                }
                                                                           >
                                                                                <RemoveIcon
                                                                                     size={
                                                                                          25
                                                                                     }
                                                                                />
                                                                           </div>
                                                                      ))}
                                                                 {currentChat?.admins.includes(
                                                                      userProfile.user_id
                                                                 ) && (
                                                                      <span className="text-xs">
                                                                           Admin
                                                                      </span>
                                                                 )}
                                                            </div>
                                                       );
                                                  }
                                             )}
                                   </div>
                              </div>
                         </div>
                    </div>
               </Drawer>
          </>
     );
}
