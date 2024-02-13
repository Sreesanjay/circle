import { useEffect, useState } from "react";
import { ProfileIconWithText } from "../../assets/Icons";
import { IComment } from "../../types";
import "./Comment.css";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import API from "../../api";
import { IoSend } from "react-icons/io5";

export default function Comment({
     item,
     post_id,
}: {
     item: IComment;
     post_id: string;
}) {
     const [replys, setReplys] = useState<IComment[]>([]);
     const [openReply, setOpenReply] = useState(false);
     const [newComment, setNewComment] = useState("");
     const [newReply, setNewReply] = useState(false);

     useEffect(() => {
          if (openReply) {
               (async () => {
                    try {
                         const response = await API.get(
                              `/posts/comment/replys/${item._id}`,
                              { withCredentials: true }
                         );
                         if (response.data) {
                              setReplys(response.data.replys);
                         }
                    } catch (error) {
                         const err = error as AxiosError<{
                              message?: string;
                              status?: string;
                         }>;
                         toast.error(err.message);
                    }
               })();
          }
     }, [openReply, item]);

     async function handleSubmit() {
          try {
               if (newComment) {
                    const response = await API.post(
                         "/posts/comment",
                         {
                              content: newComment,
                              post_id: post_id,
                              reply: item._id,
                         },
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setNewComment("");
                         setNewReply(false);
                         setOpenReply(true);
                         setReplys([...replys, response.data.newComment]);
                    }
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }
     return (
          <section className="comment mt-5 pb-5 bg-gray-800">
               <div className="header flex gap-3 px-5 py-2  rounded-md">
                    <div className="profile-img-icon">
                         {item?.user_details.profile_img ? (
                              <img
                                   src={item?.user_details?.profile_img}
                                   alt=""
                                   style={{}}
                                   className="w-12 rounded-lg"
                              />
                         ) : (
                              <ProfileIconWithText
                                   email={item?.user_details.email.email || ""}
                                   size={"small"}
                              />
                         )}
                    </div>
                    <div className="name">
                         <h1>{item.user_details.username}</h1>
                         {/* <small className="text-xs text-slate-500">{`${date.getDay()} - ${
                              date.getMonth() + 1
                         } - ${date.getFullYear()}`}</small> */}
                    </div>
               </div>
               <div className="content p-5 bg-gray-800">
                    <span className="font-light">{item.content}</span>
               </div>
               {newReply && (
                    <div className="add-comment flex items-center h-min my-3 px-2">
                         <input
                              type="text"
                              className="rounded-md add-comment-inp mr-2 bg-gray-800"
                              name="comment"
                              placeholder="Add your comment"
                              onChange={(e) => setNewComment(e.target.value)}
                         />
                         <div className="cursor-pointer" onClick={handleSubmit}>
                              <IoSend />
                         </div>
                    </div>
               )}
               <button
                    onClick={() => setOpenReply(!openReply)}
                    className="px-3 text-sm"
               >
                    {openReply ? "hide replies" : "View replies"}
               </button>
               <button
                    className="px-3 text-sm"
                    onClick={() => setNewReply(!newReply)}
               >
                    Reply
               </button>
               {openReply && (
                    <div className="replys m-5 ">
                         {replys &&
                              replys.map((reply) => {
                                   return (
                                        <div className="reply bg-gray-900 rounded-md mb-3">
                                             <div className="header flex gap-3 px-5 py-2">
                                                  <div className="profile-img-icon">
                                                       {reply?.user_details
                                                            .profile_img ? (
                                                            <img
                                                                 src={
                                                                      reply
                                                                           ?.user_details
                                                                           ?.profile_img
                                                                 }
                                                                 alt=""
                                                                 style={{}}
                                                                 className="w-9 rounded-lg"
                                                            />
                                                       ) : (
                                                            <ProfileIconWithText
                                                                 email={
                                                                      reply
                                                                           ?.user_details
                                                                           .email
                                                                           .email ||
                                                                      ""
                                                                 }
                                                                 size={"small"}
                                                            />
                                                       )}
                                                  </div>
                                                  <div className="name">
                                                       <h1>
                                                            {
                                                                 reply
                                                                      .user_details
                                                                      .username
                                                            }
                                                       </h1>
                                                  </div>
                                             </div>
                                             <div className="content p-5 font-light">
                                                  {reply.content}
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
               )}
          </section>
     );
}
