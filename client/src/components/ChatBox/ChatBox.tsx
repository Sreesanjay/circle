import {
     Dispatch,
     RefObject,
     SetStateAction,
     useEffect,
     useRef,
     useState,
} from "react";

import InputEmoji from "react-input-emoji";
import { IMessage, SendMessage, userList } from "../../types";
import "./ChatBox.css";
import { useAppSelector } from "../../app/hooks";
import API from "../../api";
import { toast } from "react-toastify";
import { ProfileIconWithText } from "../../assets/Icons";
import {
     getMessages,
     readMessage,
     sendMessage,
} from "../../services/chatService";
import { Spinner } from "flowbite-react";
import { Socket } from "socket.io-client";
import MessageBox from "../MessageBox/MessageBox";
import ChatDrawer from "../ChatDrawer/ChatDrawer";

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
                              setUserDetails(
                                   //      response.data.members.filter(
                                   //           (item: userList) =>
                                   //                item.user_id !== user?._id
                                   //      )
                                   response.data.members
                              );
                         }
                    }
               } catch (error) {
                    toast.error("Internal error");
               }
          })();
     }, [currentChat, user]);

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
               }
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [receivedMessage]);

     const getMessage = async () => {
          if (currentChat) {
               setIsLoading(true);
               const response = await getMessages(
                    currentChat?._id,
                    pagination.current
               );
               setIsLoading(false);
               if (response.messages.length > 0) {
                    setMessages((current) => [
                         ...response.messages,
                         ...current,
                    ]);
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
          setMessages([]);
          getMessage();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [currentChat]);

     useEffect(() => {
          console.log(currentChat);
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

     async function handleSend() {
          if (user && currentChat?._id) {
               const message = {
                    sender_id: user?._id,
                    content: newMessage,
                    chat_id: currentChat?._id,
               };
               const response = await sendMessage(message);
               if (response.newMessage) {
                    setNewMessage("");
                    setSendMessage({
                         ...response.newMessage,
                         members: currentChat.members,
                    });

                    setMessages((current) => [...current, response.newMessage]);
               }
          }
     }
     function handleScroll(e: React.UIEvent<HTMLElement>) {
          const element = e.target as HTMLElement;
          if (messages.length > 1 && element.scrollTop === 0) {
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
     });
     useEffect(() => {
          socket?.current?.on("stop-typing", (details) => {
               if (details.room === currentChat?._id) {
                    setIsTyping(false);
               }
          });
     });

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
     });
     return (
          <>
               {currentChat ? (
                    <section className="chatbox-container flex flex-col justify-between">
                         <section
                              className="header p-2 px-5 bg-gray-800 shadow-xl w-full flex"
                              onClick={() => setOpenDrawer(!openDrawer)}
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
                                             <div className="user-list flex gap-3 flex-nowrap">
                                                  <h1 className="text-xs text-gray-400">
                                                       you and
                                                  </h1>
                                                  {userDetails?.map(
                                                       (item, index) => {
                                                            if (
                                                                 index < 2 &&
                                                                 item.user_id !==
                                                                      user?._id
                                                            ) {
                                                                 return (
                                                                      <h1 className="text-xs text-gray-400">
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
                                             />
                                        );
                                   })}
                         </section>
                         <section className="chat-sender flex items-center px-5 bg-gray-900 py-2">
                              <div onClick={() => imageRef.current?.click()}>
                                   +
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
                                   className="send-button button"
                                   onClick={handleSend}
                              >
                                   Send
                              </div>
                              <input
                                   type="file"
                                   name=""
                                   id=""
                                   style={{ display: "none" }}
                                   ref={imageRef}
                              />
                         </section>
                    </section>
               ) : (
                    <h1>No chats</h1>
               )}

               <div>
                    <ChatDrawer
                         userDetails={userDetails}
                         setOpenDrawer={setOpenDrawer}
                         openDrawer={openDrawer}
                    />
               </div>
          </>
     );
}
