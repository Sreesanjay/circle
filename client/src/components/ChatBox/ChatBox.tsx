import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { IMessage, SendMessage, userList } from "../../types";
import "./ChatBox.css";
import { useAppSelector } from "../../app/hooks";
import API from "../../api";
import { toast } from "react-toastify";
import { ProfileIconWithText } from "../../assets/Icons";
import { getMessages, sendMessage } from "../../services/chatService";
export default function ChatBox({
     online,
     setSendMessage,
     receivedMessage,
     setStartTyping,
}: {
     online: boolean;
     setSendMessage: Dispatch<SetStateAction<SendMessage | null>>;
     receivedMessage: IMessage | null;
     setStartTyping: Dispatch<SetStateAction<boolean>>;
}) {
     const { user } = useAppSelector((state) => state.auth);
     const { currentChat } = useAppSelector((state) => state.socket);
     const [userDetails, setUserDetails] = useState<userList | null>(null);
     const [newMessage, setNewMessage] = useState("");
     const [messages, setMessages] = useState<IMessage[] | []>([]);
     const imageRef = useRef<HTMLInputElement | null>(null);

     useEffect(() => {
          (async () => {
               try {
                    const user_id = currentChat?.members.find(
                         (id) => id !== user?._id
                    );
                    if (user_id) {
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
     }, [currentChat, user]);

     useEffect(() => {
          if (receivedMessage) {
               setMessages((current) => [...current, receivedMessage]);
          }
     }, [receivedMessage]);

     useEffect(() => {
          (async () => {
               if (messages.length === 0 && currentChat) {
                    const response = await getMessages(currentChat?._id);
                    if (response.messages) {
                         setMessages(response.messages);
                    }
               }
          })();
     }, [messages, currentChat]);

     async function handleSend() {
          if (user && currentChat?._id) {
               const message = {
                    sender_id: user?._id,
                    content: newMessage,
                    chat_id: currentChat?._id,
               };
               const response = await sendMessage(message);
               if (response.newMessage) {
                    setSendMessage({
                         ...response.newMessage,
                         members: currentChat.members,
                    });
                    setMessages((current) => [...current, response.newMessage]);
               }
          }
     }

     const handleChange = (newMessage: string) => {
          setNewMessage(newMessage);
     };

     return (
          <>
               {currentChat ? (
                    <section className="chatbox-container flex flex-col justify-between">
                         <section className="header p-2 px-5 bg-gray-800 shadow-xl w-full flex">
                              <div className="profile-img relative w-fit">
                                   {userDetails?.profile_img ? (
                                        <img
                                             src={userDetails.profile_img}
                                             alt="dsfkajfhskadfh"
                                             className="w-16 h-16 rounded-full"
                                        />
                                   ) : (
                                        <ProfileIconWithText
                                             size={"medium"}
                                             email={userDetails?.email || ""}
                                        />
                                   )}
                                   {online && (
                                        <div className="active rounded-full w-3 h-3 bg-green-400 absolute bottom-0 right-0"></div>
                                   )}
                              </div>
                              <div className="name-info ms-3">
                                   <h1 className="text-2xl opacity-75      ">
                                        {userDetails?.username}
                                   </h1>
                              </div>
                         </section>
                         <section className="chat-body">
                              {messages &&
                                   messages.map((message) => {
                                        return (
                                             <div
                                                  key={message._id}
                                                  className={`
                                                  flex gap-4
                                                  ${
                                                       message.sender_id ===
                                                       user?._id
                                                            ? "own"
                                                            : "others"
                                                  } `}
                                             >
                                                  {message.sender_id !==
                                                       user?._id && (
                                                       <div className="profile-img ">
                                                            {message.userDetails
                                                                 ?.profile_img ? (
                                                                 <img
                                                                      src={
                                                                           message
                                                                                .userDetails
                                                                                .profile_img
                                                                      }
                                                                      alt="dsfkajfhskadfh"
                                                                      className="w-8 h-8 rounded-full"
                                                                 />
                                                            ) : (
                                                                 <ProfileIconWithText
                                                                      size={
                                                                           "small"
                                                                      }
                                                                      email={
                                                                           message
                                                                                .userDetails
                                                                                ?.email ||
                                                                           ""
                                                                      }
                                                                 />
                                                            )}
                                                       </div>
                                                  )}
                                                  <div className="body flex flex-col gap-2">
                                                       <div className="user_details">
                                                            <h1>{message.userDetails.username}</h1>
                                                       </div>
                                                       <div
                                                            className={`
                                                       message py-3 w-min min-w-60 max-w-96 text-wrap rounded-md px-2 
                                                       ${
                                                            message.sender_id ===
                                                            user?._id
                                                                 ? "own bg-green-800"
                                                                 : "others bg-red-500"
                                                       }`}
                                                       >
                                                            <h1>
                                                                 {
                                                                      message.content
                                                                 }
                                                            </h1>
                                                       </div>
                                                  </div>
                                             </div>
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
                                        // if (!typing) {
                                        setStartTyping(true);
                                        // }

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
          </>
     );
}
