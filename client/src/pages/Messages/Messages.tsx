import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "../../api";
import "./Messages.css";
import { RefObject, useEffect, useState } from "react";
import { createChat, getAllChats } from "../../services/chatService";
import { IChat, IMessage, SendMessage } from "../../types";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
     addChat,
     addLatestMessage,
     resetCurrentChat,
     setChats,
     setCurrentChat,
     updateMembers,
} from "../../features/Socket/SocketSlice";
import { useLocation } from "react-router-dom";
import { ThreeDot } from "../../assets/Icons";
import { ListGroup } from "flowbite-react";
import CreateGroup from "../../components/Modal/CreateGroup";

export default function Messages({ socket }: { socket: RefObject<Socket> }) {
     const [search, setSearch] = useState("");
     const location = useLocation();
     const dispatch = useAppDispatch();
     const { user } = useAppSelector((state) => state.auth);
     const { onlineUsers } = useAppSelector((state) => state.socket);
     const [sendMessage, setSendMessage] = useState<SendMessage | null>(null);
     const [createGroup, setCreateGroup] = useState(false);
     const [openThreedot, setOpenThreeDot] = useState(false);
     const [receivedMessage, setReceivedMessage] = useState<IMessage | null>(
          null
     );
     const [userData, setUserData] = useState<
          | {
                 user_id: string;
                 username: string;
                 fullname: string;
                 profile_img: string;
            }[]
          | []
     >([]);

     const { currentChat, chats } = useAppSelector((state) => state.socket);

     useEffect(() => {
          if (sendMessage !== null && socket?.current) {
               socket?.current?.emit("send-message", sendMessage);
               dispatch(addLatestMessage(sendMessage));
               setSendMessage(null);
          }
     }, [sendMessage, socket, currentChat, dispatch]);

     // Get the message from socket server
     useEffect(() => {
          socket?.current?.on("recieve-message", (data) => {
               setReceivedMessage(data);
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);

     //add new chat
     useEffect(() => {
          socket?.current?.on("join-newchat", (newChat) => {
               const exists = chats.find((item) => item._id === newChat._id);
               if (exists !== undefined) {
                    dispatch(addChat(newChat));
               } else {
                    dispatch(updateMembers(newChat));
               }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);
     useEffect(() => {
          socket?.current?.on("remove-chat", (chat) => {
               dispatch(updateMembers(chat));
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);

     useEffect(() => {
          dispatch(addLatestMessage(receivedMessage));
          setReceivedMessage(null);
     }, [receivedMessage, dispatch]);

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/users/user-search?search=${search}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setUserData(response.data.userData);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, [search]);

     useEffect(() => {
          if (chats && chats.length === 0) {
               (async () => {
                    const allChats = await getAllChats();
                    dispatch(setChats(allChats));
               })();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     useEffect(() => {
          if (location.pathname !== "/messages") {
               dispatch(resetCurrentChat());
          }
     }, [location, dispatch]);

     async function handleAddChat(id: string) {
          const newChat = await createChat(id);
          socket?.current?.emit("new-chat", newChat);
          const exists = chats.find((item) => item._id === newChat._id);
          if (!exists) {
               dispatch(addChat(newChat));
          }
          dispatch(setCurrentChat(newChat));
     }

     const checkOnlineStatus = (chat: IChat) => {
          const chatMember = chat?.members.find(
               (member: string) => member !== user?._id
          );
          const online = onlineUsers?.find((user: { userId: string }) => {
               return chatMember === user.userId;
          });
          return online ? true : false;
     };

     return (
          <>
               <CreateGroup
                    openModal={createGroup}
                    setOpenModal={setCreateGroup}
                    socket={socket}
               />
               <section className="chat bg-red-400 grid grid-cols-12">
                    <div
                         className={`chat-list ${
                              currentChat ? "hidden" : "block"
                         } sm:block bg-primary-bg p-3 col-span-12 sm:col-span-5 md:col-span-3`}
                    >
                         <header className="chat-header my-4 mb-7">
                              <div className="flex items-center justify-between relative">
                                   <h1 className="chat-title my-5 mb-7 text-2xl">
                                        Messages
                                   </h1>
                                   <div
                                        className="cursor-pointer mb-5"
                                        onClick={() =>
                                             setOpenThreeDot(!openThreedot)
                                        }
                                   >
                                        <ThreeDot size={35} />
                                   </div>
                                   {openThreedot && (
                                        <div
                                             className="threedot-handle absolute right-0 top-12"
                                             onClick={() =>
                                                  setOpenThreeDot(false)
                                             }
                                        >
                                             <ListGroup className="w-48">
                                                  <ListGroup.Item
                                                       onClick={() =>
                                                            setCreateGroup(true)
                                                       }
                                                  >
                                                       Create Group
                                                  </ListGroup.Item>
                                             </ListGroup>
                                        </div>
                                   )}
                              </div>

                              <input
                                   type="text"
                                   className="search bg-seconday-bg border-none rounded-md w-full shadow-lg"
                                   onChange={(e) => setSearch(e.target.value)}
                                   placeholder="Search"
                                   value={search}
                              />
                              {userData.length > 0 && (
                                   <div className="user-list-search absolute mt-2 py-2 bg-seconday-bg w-80 shadow-md cursor-pointer z-20">
                                        {userData.map((user, index) => {
                                             return (
                                                  <div
                                                       className="user h-12 flex px-3 gap-3 items-center mb-2"
                                                       key={index}
                                                       onClick={() => {
                                                            setSearch("");
                                                            handleAddChat(
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
                                                                 {user.username}
                                                            </h1>
                                                            <small>
                                                                 {user.fullname}
                                                            </small>
                                                       </div>
                                                  </div>
                                             );
                                        })}
                                   </div>
                              )}
                         </header>
                         {chats &&
                              chats.map((chat, index) => {
                                   if (
                                        chat.latest_message?.content ||
                                        chat.is_groupchat
                                   ) {
                                        return (
                                             <Conversation
                                                  chat={chat}
                                                  online={checkOnlineStatus(
                                                       chat
                                                  )}
                                                  key={index}
                                             />
                                        );
                                   }
                              })}
                    </div>
                    <div
                         className={`message-section ${
                              currentChat ? "block" : "hidden"
                         }  sm:block bg-seconday-bg w-full col-span-12 sm:col-span-7 md:col-span-9 `}
                    >
                         <div
                              className="back-arrow p-2 absolute md:hidden"
                              onClick={() => dispatch(resetCurrentChat())}
                         >
                              <ArrowBackIcon />
                         </div>
                         <ChatBox
                              online={checkOnlineStatus(currentChat!)}
                              setSendMessage={setSendMessage}
                              receivedMessage={receivedMessage}
                              socket={socket}
                         />
                    </div>
               </section>
          </>
     );
}
