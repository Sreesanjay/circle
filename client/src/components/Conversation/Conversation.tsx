import { useEffect, useState } from "react";
import { ProfileIconWithText } from "../../assets/Icons";
import { IChat, userList } from "../../types";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import API from "../../api";
import "./Conversation.css";
import { setCurrentChat } from "../../features/Socket/SocketSlice";

export default function Conversation({
     chat,
     online,
}: {
     chat: IChat;
     online: boolean;
}) {
     const { user } = useAppSelector((state) => state.auth);
     const dispatch = useAppDispatch();
     const [userDetails, setUserDetails] = useState<userList | null>(null);
     useEffect(() => {
          (async () => {
               try {
                    if (!chat.is_groupchat) {
                         const user_id = chat.members.find(
                              (id) => id !== user?._id
                         );
                         const response = await API.get(
                              `/users/get-user-profile/${user_id}`,
                              { withCredentials: true }
                         );
                         if (response.data) {
                              setUserDetails(response.data.userProfile);
                         }
                    }
               } catch (error) {
                    toast.error("Internal error");
               }
          })();
     }, [chat, user]);

     return (
          <div
               className="chat-user-card flex items-center bg-seconday-bg hover:bg-black p-2 rounded-md shadow-lg mb-2"
               onClick={() => {
                    dispatch(setCurrentChat(chat));
               }}
          >
               <div className="profile-img relative w-min z-0">
                    {chat.is_groupchat ? (
                         chat?.icon ? (
                              <img
                                   src={chat?.icon}
                                   alt="dsfkajfhskadfh"
                                   className="w-10 h-10"
                              />
                         ) : (
                              <ProfileIconWithText
                                   size={"medium"}
                                   email={chat.chat_name || ""}
                              />
                         )
                    ) : userDetails?.profile_img ? (
                         <img
                              src={userDetails.profile_img}
                              alt="dsfkajfhskadfh"
                              className="w-10 h-10"
                         />
                    ) : (
                         <ProfileIconWithText
                              size={"medium"}
                              email={userDetails?.email || ""}
                         />
                    )}
                    {!chat.is_groupchat && online && (
                         <div className="active rounded-full w-3 h-3 bg-green-600 absolute bottom-0 right-0"></div>
                    )}
               </div>
               <div className="center-section px-2 flex flex-col justify-center">
                    <h1 className="text-xl">
                         {chat.is_groupchat
                              ? chat.chat_name
                              : userDetails?.username}
                    </h1>
                    <span className="text-xs overflow-hidden text-nowrap max-w-48">
                         {chat?.latest_message?.content ? (
                              chat.latest_message.is_delete ? (
                                   <h1 className="text-gray-500 p-2 rounded-md">
                                        This message has been deleted
                                   </h1>
                              ) : (
                                   <>
                                        {
                                             chat.latest_message?.userDetails
                                                  ?.username
                                        }{" "}
                                        :
                                        {chat.latest_message?.content_type ===
                                        "MEDIA"
                                             ? "file"
                                             : chat.latest_message
                                                    ?.content}{" "}
                                   </>
                              )
                         ) : null}
                    </span>
               </div>
          </div>
     );
}
