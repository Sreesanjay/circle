import {
     ChangeEvent,
     Dispatch,
     RefObject,
     SetStateAction,
     useEffect,
     useRef,
     useState,
} from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import InputEmoji from "react-input-emoji";
import { IMessage, SendMessage, userList } from "../../types";
import "./ChatBox.css";
import { useAppSelector } from "../../app/hooks";
import API from "../../api";
import { toast } from "react-toastify";
import { ProfileIconWithText } from "../../assets/Icons";
import {
     deleteFile,
     deleteMessage,
     getMessages,
     isBlocked,
     readMessage,
     sendFileMessage,
     sendMessage,
} from "../../services/chatService";
import { Spinner } from "flowbite-react";
import { Socket } from "socket.io-client";
import MessageBox from "../MessageBox/MessageBox";
import ChatDrawer from "../ChatDrawer/ChatDrawer";
import { useNavigate } from "react-router-dom";

export default function ChatBox({
     online,
     setSendMessage,
     receivedMessage,
     socket,
}: {
     online: boolean;
     setSendMessage: Dispatch<SetStateAction<SendMessage | null>>;
     receivedMessage: IMessage | null;
     socket: RefObject<Socket>;
}) {
     const navigate = useNavigate();
     const { user } = useAppSelector((state) => state.auth);
     const { currentChat } = useAppSelector((state) => state.socket);
     const [userDetails, setUserDetails] = useState<userList[] | null>(null);
     const [newMessage, setNewMessage] = useState("");
     const [messages, setMessages] = useState<IMessage[] | []>([]);
     const imageRef = useRef<HTMLInputElement | null>(null);
     const chatBody = useRef<HTMLElement | null>(null);
     const pagination = useRef<Date | null>(null);
     const [isLoading, setIsLoading] = useState(false);
     const [isTyping, setIsTyping] = useState(false);
     const [startTyping, setStartTyping] = useState(false);
     const [openDrawer, setOpenDrawer] = useState(false);
     const [blocked, setBlocked] = useState<string | null>(null);
     const [fileInput, setFileInput] = useState<{
          content: string;
          file_type: string;
     } | null>(null);

     useEffect(() => {
          (async () => {
               try {
                    if (currentChat?.members) {
                         const response = await API.post(
                              "/chat/get-members",
                              { members: currentChat?.members },
                              { withCredentials: true }
                         );
                         if (response.data) {
                              if (currentChat.is_groupchat) {
                                   setUserDetails(response.data.members);
                              } else {
                                   setUserDetails(
                                        response.data.members.filter(
                                             (member: userList) =>
                                                  member.user_id !== user?._id
                                        )
                                   );
                              }
                         }
                    }
               } catch (error) {
                    toast.error("Internal error");
               }
          })();
     }, [currentChat, user]);

     useEffect(() => {
          (async () => {
               if (currentChat && !currentChat?.is_groupchat) {
                    const userId = currentChat?.members.find(
                         (item) => item !== user?._id
                    );
                    const response = await isBlocked(userId as string);
                    if (response.blocked) {
                         setBlocked(response.blocked);
                    }
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [currentChat]);

     useEffect(() => {
          socket?.current?.on("block-chat", (userId) => {
               const user_id = currentChat?.members.find(
                    (item) => item === user?._id
               );
               if (userId === user_id) {
                    setBlocked("you were blocked by this user");
               }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);

     useEffect(() => {
          socket?.current?.on("unblock-chat", (userId) => {
               const user_id = currentChat?.members.find(
                    (item) => item === user?._id
               );
               if (userId === user_id) {
                    setBlocked(null);
               }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);

     useEffect(() => {
          if (receivedMessage) {
               if (receivedMessage.chat_id === currentChat?._id) {
                    setMessages((current) => [...current, receivedMessage]);
                    if (
                         !receivedMessage.read_by.includes(
                              user?._id as string
                         ) ||
                         receivedMessage.sender_id !== user?._id
                    ) {
                         handleReadMessage(receivedMessage._id);
                    }
               } else {
                    toast.success(
                         `You have a new message from ${receivedMessage.userDetails.username}`
                    );
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [receivedMessage]);

     // eslint-disable-next-line react-hooks/exhaustive-deps
     const getMessage = async () => {
          if (currentChat) {
               setIsLoading(true);
               const response = await getMessages(
                    currentChat?._id,
                    pagination.current
               );
               setIsLoading(false);
               if (response.messages.length > 0) {
                    setMessages(() => [...response.messages, ...messages]);
                    response.messages.map((message: IMessage) => {
                         if (
                              !message.read_by.includes(user?._id as string) ||
                              message.sender_id !== user?._id
                         ) {
                              handleReadMessage(message._id);
                         }
                    });
               }
          }
     };
     useEffect(() => {
          pagination.current = null;
          setMessages([]);
          setFileInput(null);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [currentChat]);

     useEffect(() => {
          if (
               currentChat &&
               messages.length === 0 &&
               pagination.current === null
          ) {
               getMessage();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [messages]);

     useEffect(() => {
          if (currentChat && socket.current?.connected) {
               socket?.current?.emit("join-room", currentChat?._id);
          }
     }, [currentChat, socket]);

     //scroll to bottom when new message arrives
     useEffect(() => {
          if (chatBody.current && messages.length <= 10) {
               chatBody.current.scrollTop = chatBody.current.scrollHeight;
          }
     }, [messages]);

     async function handleSendFile(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               const response = await sendFileMessage(e.target.files[0]);
               if (response) {
                    setFileInput({
                         content: response,
                         file_type: e.target.files[0].type,
                    });
               }
          }
     }

     async function hanleDelete(id: string) {
          const response = await deleteMessage(id);
          if (response.messages) {
               setMessages(
                    messages.map((item) => {
                         socket?.current?.emit("deleteMessage", {
                              chat_id: item.chat_id,
                              message_id: item._id,
                         });
                         if (item._id === id) {
                              item.is_delete = true;
                         }
                         return item;
                    })
               );
          }
     }

     useEffect(() => {
          socket?.current?.on("delete-message", ({ chat_id, message_id }) => {
               if (chat_id === currentChat?._id) {
                    setMessages(
                         messages.map((item) => {
                              if (item._id === message_id) {
                                   item.is_delete = true;
                              }
                              return item;
                         })
                    );
               }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current, currentChat]);

     async function handleSend(type: string) {
          if (user && currentChat?._id) {
               let message;
               if (type === "file") {
                    message = {
                         sender_id: user?._id,
                         content: fileInput?.content as string,
                         content_type: "MEDIA",
                         file_type: fileInput?.file_type,
                         chat_id: currentChat?._id,
                    };
                    setFileInput(null);
               } else if (type === "text") {
                    message = {
                         sender_id: user?._id,
                         content: newMessage as string,
                         content_type: "TEXT",
                         chat_id: currentChat?._id,
                    };
               }
               if (message) {
                    const response = await sendMessage(message);
                    if (response.newMessage) {
                         setNewMessage("");
                         setSendMessage({
                              ...response.newMessage,
                              members: currentChat.members,
                         });

                         setMessages((current) => [
                              ...current,
                              response.newMessage,
                         ]);
                    }
               }
          }
     }
     function handleScroll(e: React.UIEvent<HTMLElement>) {
          const element = e.target as HTMLElement;
          if (
               messages.length > 1 &&
               element.scrollTop === 0 &&
               messages[0].chat_id === currentChat?._id
          ) {
               pagination.current = messages[0].createdAt;
               getMessage();
          }
     }

     /**
      * function for listening the changes in input boxes
      * @param {string} newMessage
      */
     const handleChange = (newMessage: string) => {
          setNewMessage(newMessage);
     };

     /**
      * function for handling read message
      * @param {string} id  message _id
      */
     async function handleReadMessage(id: string) {
          const response = await readMessage(id);
          if (response) {
               socket?.current?.emit("read-message", response.messages);
          }
     }

     useEffect(() => {
          if (startTyping) {
               socket?.current?.emit("typing", {
                    room: currentChat?._id,
                    user: user?._id,
               });
          } else {
               socket?.current?.emit("typed", {
                    room: currentChat?._id,
                    user: user?._id,
               });
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [startTyping]);

     useEffect(() => {
          socket?.current?.on("start-typing", (details) => {
               if (details.room === currentChat?._id) {
                    setIsTyping(true);
               }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current, currentChat]);
     useEffect(() => {
          socket?.current?.on("stop-typing", (details) => {
               if (details.room === currentChat?._id) {
                    setIsTyping(false);
               }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current, currentChat]);

     //catching read-message
     useEffect(() => {
          socket?.current?.on("read", (message) => {
               setMessages((current) => {
                    return current.map((item) => {
                         if (item._id === message._id) {
                              item = {
                                   ...item,
                                   read_by: message.read_by,
                              };
                         }
                         return item;
                    });
               });
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);
     return (
          <>
               {currentChat ? (
                    <section className="chatbox-container flex flex-col justify-between">
                         <section
                              className="header p-2 px-5 bg-gray-800 shadow-xl w-full flex"
                              onClick={() => {
                                   if (currentChat.is_groupchat) {
                                        setOpenDrawer(!openDrawer);
                                   } else {
                                        const userId = currentChat.members.find(
                                             (item) => item !== user?._id
                                        );
                                        navigate(`/view-profile/${userId}`);
                                   }
                              }}
                         >
                              <div className="profile-img relative w-fit">
                                   {currentChat.is_groupchat ? (
                                        currentChat.icon ? (
                                             <img
                                                  src={currentChat.icon}
                                                  alt="dsfkajfhskadfh"
                                                  className="w-16 h-16 rounded-full"
                                             />
                                        ) : (
                                             <ProfileIconWithText
                                                  size={"medium"}
                                                  email={
                                                       currentChat?.chat_name ||
                                                       ""
                                                  }
                                             />
                                        )
                                   ) : userDetails &&
                                     userDetails[0]?.profile_img ? (
                                        <img
                                             src={userDetails[0].profile_img}
                                             alt="dsfkajfhskadfh"
                                             className="w-16 h-16 rounded-full"
                                        />
                                   ) : (
                                        <ProfileIconWithText
                                             size={"medium"}
                                             email={
                                                  (userDetails &&
                                                       userDetails[0]?.email) ||
                                                  ""
                                             }
                                        />
                                   )}

                                   {!currentChat.is_groupchat && online && (
                                        <div className="active rounded-full w-3 h-3 bg-green-400 absolute bottom-0 right-0"></div>
                                   )}
                              </div>
                              <div className="name-info ms-3">
                                   <h1 className="text-2xl opacity-75      ">
                                        {currentChat.is_groupchat
                                             ? currentChat.chat_name
                                             : userDetails &&
                                               userDetails[0]?.username}
                                   </h1>
                                   {isTyping ? (
                                        <span className="text-xs">Typing</span>
                                   ) : (
                                        currentChat.is_groupchat && (
                                             <div className="user-list flex gap-2 flex-nowrap">
                                                  {currentChat.members.includes(
                                                       user?._id as string
                                                  ) && (
                                                       <h1 className="text-xs text-gray-400">
                                                            you,
                                                       </h1>
                                                  )}
                                                  {userDetails?.map(
                                                       (item, index) => {
                                                            if (
                                                                 index < 2 &&
                                                                 item.user_id !==
                                                                      user?._id
                                                            ) {
                                                                 return (
                                                                      <h1
                                                                           className="text-xs text-gray-400"
                                                                           key={
                                                                                index
                                                                           }
                                                                      >
                                                                           {
                                                                                item.username
                                                                           }
                                                                      </h1>
                                                                 );
                                                            }
                                                       }
                                                  )}
                                                  {userDetails &&
                                                  userDetails?.length > 2 ? (
                                                       <span className="text-xs text-gray-400">
                                                            and{" "}
                                                            {userDetails.length -
                                                                 2}{" "}
                                                            others
                                                       </span>
                                                  ) : null}
                                             </div>
                                        )
                                   )}
                              </div>
                         </section>
                         <section
                              className="chat-body grow"
                              ref={chatBody}
                              onScroll={(e) => handleScroll(e)}
                         >
                              {isLoading ? (
                                   <h1 className="message-loader text-center">
                                        Chat history loading{" "}
                                        <Spinner
                                             color="info"
                                             aria-label="Info spinner example "
                                        />
                                   </h1>
                              ) : null}
                              {messages &&
                                   messages.map((message, index) => {
                                        return (
                                             <MessageBox
                                                  key={index}
                                                  message={message}
                                                  hanleDelete={hanleDelete}
                                             />
                                        );
                                   })}
                         </section>
                         {fileInput ? (
                              <div className="file-box w-96 h-96 p-2 bg-gray-700 shadow-lg rounded-md">
                                   {fileInput.file_type.includes("image") ? (
                                        <img src={fileInput.content} alt="" />
                                   ) : null}
                                   <div className="footer py-3">
                                        <button
                                             className="discard px-3 py-1 rounded-md bg-red-600"
                                             onClick={() => {
                                                  deleteFile(fileInput.content);
                                                  setFileInput(null);
                                             }}
                                        >
                                             Discard
                                        </button>
                                        <button
                                             className="send px-3 py-1 rounded-md bg-primary ms-3"
                                             onClick={() => handleSend("file")}
                                        >
                                             Send
                                        </button>
                                   </div>
                              </div>
                         ) : !currentChat.removed_members?.includes(
                                user?._id as string
                           ) ? (
                              blocked ? (
                                   <div className="py-3 w-full bg-slate-400">
                                        <h1 className="text-center text-black">
                                             {blocked}
                                        </h1>
                                   </div>
                              ) : (
                                   <section className="chat-sender flex items-center px-5 bg-gray-900 py-2">
                                        <div
                                             onClick={() =>
                                                  imageRef.current?.click()
                                             }
                                             className="cursor-pointer"
                                        >
                                             <AttachmentIcon />
                                        </div>
                                        <InputEmoji
                                             value={newMessage}
                                             onChange={(e) => {
                                                  handleChange(e);
                                                  setStartTyping(true);

                                                  setTimeout(() => {
                                                       setStartTyping(false);
                                                  }, 3000);
                                             }}
                                        />
                                        <div
                                             className="send-button button cursor-pointer"
                                             onClick={() => handleSend("text")}
                                        >
                                             Send
                                        </div>
                                        <input
                                             type="file"
                                             name=""
                                             accept="image/*"
                                             id=""
                                             ref={imageRef}
                                             style={{ display: "none" }}
                                             onChange={handleSendFile}
                                        />
                                   </section>
                              )
                         ) : (
                              <div className="py-3 w-full bg-slate-400">
                                   <h1 className="text-center text-black">
                                        You are no longer a member
                                   </h1>
                              </div>
                         )}
                    </section>
               ) : (
                    <img
                         src="https://studio.uxpincdn.com/studio/wp-content/uploads/2023/04/Chat-User-Interface-Design.png.webp"
                         alt=""
                         className="h-full opacity-70"
                    />
               )}

               <div>
                    <ChatDrawer
                         userDetails={userDetails}
                         setOpenDrawer={setOpenDrawer}
                         openDrawer={openDrawer}
                         socket={socket}
                    />
               </div>
          </>
     );
}
