import { useAppSelector } from "../../app/hooks";
import { DeleteBin, ProfileIconWithText } from "../../assets/Icons";
import { IMessage } from "../../types";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TimeAgo from "react-timeago";
import "./MessageBox.css";
import PopupModal from "../Modal/PopupModal";
import { useState } from "react";
export default function MessageBox({
     message,
     hanleDelete,
}: {
     message: IMessage;
     hanleDelete: (id: string) => void;
}) {
     const [deleteMessage, setDeleteMessage] = useState(false);
     const { user } = useAppSelector((state) => state.auth);
     function isDelete() {
          setDeleteMessage(true);
     }
     function successDelete() {
          hanleDelete(message._id);
     }
     function cancelDelete() {
          setDeleteMessage(false);
     }
     return (
          <>
               <PopupModal
                    modalState={deleteMessage}
                    message={"Are you sure you want to delete this message?"}
                    posText={"Delete"}
                    negText={"No"}
                    successCallback={successDelete}
                    cancelCallback={cancelDelete}
               />
               <div
                    className={`
    message-box flex gap-4 mb-3 relative
    ${message.sender_id === user?._id ? "own" : "others"}`}
               >
                    {!message.is_delete && message.sender_id === user?._id && (
                         <div className="options mt-5">
                              <button onClick={isDelete}>
                                   <DeleteBin size={20} />
                              </button>
                         </div>
                    )}
                    {message.sender_id !== user?._id && (
                         <div className="profile-img">
                              {message.userDetails?.profile_img ? (
                                   <img
                                        src={message.userDetails.profile_img}
                                        alt="dsfkajfhskadfh"
                                        className="w-8 h-8 rounded-full"
                                   />
                              ) : (
                                   <ProfileIconWithText
                                        size={"small"}
                                        email={message.userDetails?.email || ""}
                                   />
                              )}
                         </div>
                    )}
                    {message.is_delete ? (
                         <h1 className="bg-gray-700 text-gray-500 p-2 rounded-md">
                              This message has been deleted
                         </h1>
                    ) : (
                         <div className="body flex flex-col gap-2">
                              <div className="user_details flex justify-between items-baseline">
                                   <h1>
                                        {message.sender_id !== user?._id &&
                                             message.userDetails.username}
                                   </h1>

                                   <div className="text-xs font-light">
                                        <TimeAgo
                                             date={
                                                  message.createdAt ||
                                                  Date.now()
                                             }
                                             minPeriod={6}
                                             formatter={(
                                                  value: number,
                                                  unit: TimeAgo.Unit,
                                                  suffix: TimeAgo.Suffix
                                             ) => {
                                                  if (unit === "second")
                                                       return "just now";
                                                  const plural: string =
                                                       value !== 1 ? "s" : "";
                                                  return `${value} ${unit}${plural} ${suffix}`;
                                             }}
                                        />
                                   </div>
                              </div>

                              <div
                                   className={`
         message relative py-3 w-min h-max min-w-60 max-w-96 rounded-md px-2
         ${
              message.sender_id === user?._id
                   ? "own bg-green-800"
                   : "others bg-gray-500"
         }`}
                              >
                                   {message &&
                                   message.content_type === "MEDIA" ? (
                                        <img
                                             src={message.content}
                                             alt=""
                                             className="w-96"
                                        />
                                   ) : (
                                        <p
                                             className="max-w-96 pe-2"
                                             style={{
                                                  overflowWrap: "break-word",
                                             }}
                                        >
                                             {message.content}
                                        </p>
                                   )}
                                   <div className="seen absolute right-1 bottom-0">
                                        {message.sender_id === user?._id ? (
                                             message.read_by.length > 0 ? (
                                                  <DoneAllIcon
                                                       sx={{
                                                            fontSize: 15,
                                                            color: "blue",
                                                       }}
                                                  />
                                             ) : (
                                                  <DoneAllIcon
                                                       sx={{
                                                            fontSize: 15,
                                                       }}
                                                  />
                                             )
                                        ) : null}
                                   </div>
                              </div>
                         </div>
                    )}
                    {/* {!message.is_delete && message.sender_id !== user?._id && (
                         <div className="options mt-5">
                              <button onClick={() => hanleDelete(message._id)}>
                                   <DeleteBin size={20} />
                              </button>
                         </div>
                    )} */}
               </div>
          </>
     );
}
