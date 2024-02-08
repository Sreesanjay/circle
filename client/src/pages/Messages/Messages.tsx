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
import {
     resetCurrentChat,
     setCurrentChat,
     setOnlineUsers,
} from "../../features/Socket/SocketSlice";
import { useLocation } from "react-router-dom";

export default function Messages({ socket }: { socket: RefObject<Socket> }) {
     const [search, setSearch] = useState("");
     const location = useLocation();
     const dispatch = useAppDispatch();
     const { user } = useAppSelector((state) => state.auth);
     const { onlineUsers } = useAppSelector((state) => state.socket);
     const [startTyping, setStartTyping] = useState(false);
     const [sendMessage, setSendMessage] = useState<SendMessage | null>(null);
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

     const { currentChat } = useAppSelector((state) => state.socket);
     const [chats, setChats] = useState<IChat[] | []>([]);
     useEffect(() => {
          socket?.current?.on("get-users", (users) => {
               dispatch(setOnlineUsers(users));
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     useEffect(() => {
          if (currentChat) {
               socket?.current?.emit("join-room", currentChat?._id);
          }
     }, [currentChat, socket]);

     useEffect(() => {
          if (startTyping) {
               socket?.current?.emit("typing", {
                    room: currentChat?._id,
                    user: user?._id,
               });
          }
     }, [startTyping, currentChat, socket, user]);

     useEffect(() => {
          socket?.current?.on("start-typing", (details) =>
               console.log("typing in room ", details)
          );
     });

     useEffect(() => {
          if (sendMessage !== null) {
               socket?.current?.emit("send-message", sendMessage);
               setSendMessage(null);
          }
     }, [sendMessage, socket, currentChat]);

     // Get the message from socket server
     useEffect(() => {
          socket?.current?.on("recieve-message", (data) => {
               console.log(data);
               setReceivedMessage(data);
          });
     }, [socket]);

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
                    const chats = await getAllChats();
                    setChats(chats);
               })();
          }
     }, [chats]);
     useEffect(() => {
          if (location.pathname !== "/messages") {
               dispatch(resetCurrentChat());
          }
     }, [location, dispatch]);

     async function handleAddChat(id: string) {
          const newChat = await createChat(id);
          setChats((current) => [newChat, ...current]);
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
          <section className="chat flex bg-red-400">
               <div className="chat-list md:w-96  bg-primary-bg p-3">
                    <header className="chat-header my-4 mb-7">
                         <h1 className="chat-title my-5 mb-7 text-2xl">
                              Messages
                         </h1>

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
                                                       src={user.profile_img}
                                                       alt=""
                                                       className="w-11 shadow rounded-md"
                                                  />
                                                  <div className="name leading-none">
                                                       <h1>{user.username}</h1>
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
                              return (
                                   <Conversation
                                        chat={chat}
                                        online={checkOnlineStatus(chat)}
                                        key={index}
                                   />
                              );
                         })}
               </div>
               <div className="message-section  bg-seconday-bg w-full">
                    <ChatBox
                         online={checkOnlineStatus(currentChat!)}
                         setSendMessage={setSendMessage}
                         receivedMessage={receivedMessage}
                         setStartTyping={setStartTyping}
                    />
               </div>
          </section>
     );
}
