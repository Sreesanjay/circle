import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDiscussion, IDiscussionComment } from "../../types";
import { Modal } from "flowbite-react";
import {
     addComment,
     dislikeComment,
     getComments,
     likeComment,
} from "../../services/communityService";
import "./ViewComments.css";
import { DislikeIcon, LikeIcon } from "../../assets/Icons";
import { useAppSelector } from "../../app/hooks";
import { IconSend } from "../../assets/Icons";

export default function ViewComments({
     openModal,
     setOpenModal,
     discussion,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     discussion: IDiscussion;
}) {
     const [comment, setComment] = useState<IDiscussionComment[] | []>([]);
     const { user } = useAppSelector((state) => state.auth);
     const [newComment, setNewComment] = useState<string>("");
     useEffect(() => {
          if (discussion) {
               (async () => {
                    const response = await getComments(discussion._id);
                    if (response.comment) {
                         setComment(response.comment);
                    }
               })();
          }
     }, [discussion]);
     function handleOpenReply(id: string) {
          const reply = document.getElementById(`reply-${id}`);
          if (reply && reply.style.display !== "none") {
               reply.style.display = "none";
          } else if (reply) {
               reply.style.display = "block";
          }
     }
     function handleOpenReplyInput(id: string) {
          const reply = document.getElementById(`reply-inp-${id}`);
          if (reply && reply.style.display !== "none") {
               reply.style.display = "none";
          } else if (reply) {
               reply.style.display = "flex";
          }
     }

     async function handleLike(id: string) {
          const response = await likeComment(id);
          if (response.comment) {
               setComment((current) =>
                    current.map((item) => {
                         if (item._id === id) {
                              item.likes.push(user?._id as string);
                         }
                         return item;
                    })
               );
          }
     }
     async function handleDislike(id: string) {
          const response = await dislikeComment(id);
          if (response.comment) {
               setComment((current) =>
                    current.map((item) => {
                         if (item._id === id) {
                              item.likes = item.likes.filter(
                                   (userId) => userId !== user?._id
                              );
                         }
                         return item;
                    })
               );
          }
     }

     async function handleSendComment() {
          if (user && discussion) {
               const payload = {
                    user_id: user?._id,
                    discussion_id: discussion?._id,
                    content: newComment,
               };
               const response = await addComment(payload);
               setNewComment('')
               if (response.comment) {
                    setComment((current) => [response.comment, ...current]);
               }
          }
     }

     async function handleReply(id: string) {
          const reply = document.getElementById(
               `inp-reply-${id}`
          ) as HTMLInputElement;
          if (reply && user && discussion) {
               const payload = {
                    user_id: user?._id,
                    discussion_id: discussion?._id,
                    content: reply.value,
                    reply: id,
               };
               const response = await addComment(payload);
               if (response.comment) {
                    setComment((current) => [response.comment, ...current]);
               }
          }
     }
     return (
          <Modal
               show={openModal}
               size="xl"
               onClose={() => setOpenModal(false)}
               popup
          >
               <Modal.Body className="bg-gray-800 border text-white overflow-hidden">
                    <Modal.Header />
                    <section className="comment-view min-h-96 flex flex-col justify-between relative">
                         {comment &&
                              comment.map((item, index) => {
                                   return (
                                        !item.reply && (
                                             <div
                                                  className="comment flex mb-3"
                                                  key={index}
                                             >
                                                  <div className="profile-icon">
                                                       {item.user_details
                                                            .profile_img ? (
                                                            <img
                                                                 src={
                                                                      item
                                                                           .user_details
                                                                           .profile_img
                                                                 }
                                                                 alt=""
                                                                 className="w-9 h-9 rounded-full"
                                                            />
                                                       ) : (
                                                            <div className="icon-with-text">
                                                                 <h1>
                                                                      {
                                                                           item
                                                                                .user_details
                                                                                .email
                                                                      }
                                                                 </h1>
                                                            </div>
                                                       )}
                                                  </div>
                                                  <div className="group w-full">
                                                       <div className="content-body w-full p-3 bg-gray-900">
                                                            <div className="user-header h-10">
                                                                 <div className="user-details">
                                                                      <h1 className="text-md">
                                                                           {
                                                                                item
                                                                                     .user_details
                                                                                     .username
                                                                           }
                                                                      </h1>
                                                                 </div>
                                                            </div>
                                                            <div className="content">
                                                                 <p>
                                                                      {
                                                                           item.content
                                                                      }
                                                                 </p>
                                                            </div>
                                                            <div className="footer flex justify-between items-center">
                                                                 <p
                                                                      className="text-sm cursor-pointer mt-5 view-reply"
                                                                      onClick={() =>
                                                                           handleOpenReply(
                                                                                item._id
                                                                           )
                                                                      }
                                                                 >
                                                                      View
                                                                      Replies
                                                                 </p>
                                                                 <p
                                                                      className="btn-reply text-sm cursor-pointer mt-5"
                                                                      onClick={() =>
                                                                           handleOpenReplyInput(
                                                                                item._id
                                                                           )
                                                                      }
                                                                 >
                                                                      Reply
                                                                 </p>
                                                                 <div className="likes flex items-center">
                                                                      <>
                                                                           {item.likes.includes(
                                                                                user?._id as string
                                                                           ) ? (
                                                                                <div
                                                                                     className="like"
                                                                                     onClick={() =>
                                                                                          handleDislike(
                                                                                               item._id
                                                                                          )
                                                                                     }
                                                                                >
                                                                                     <DislikeIcon
                                                                                          size={
                                                                                               15
                                                                                          }
                                                                                     />
                                                                                </div>
                                                                           ) : (
                                                                                <div
                                                                                     className="likes"
                                                                                     onClick={() =>
                                                                                          handleLike(
                                                                                               item._id
                                                                                          )
                                                                                     }
                                                                                >
                                                                                     <LikeIcon
                                                                                          size={
                                                                                               15
                                                                                          }
                                                                                     />
                                                                                </div>
                                                                           )}
                                                                      </>
                                                                      {
                                                                           item
                                                                                .likes
                                                                                .length
                                                                      }
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div
                                                            className=" py-3 hidden"
                                                            id={`reply-inp-${item._id}`}
                                                       >
                                                            <input
                                                                 type="text"
                                                                 id={`inp-reply-${item._id}`}
                                                                 placeholder="Add your reply"
                                                                 className="rounded-md bg-gray-700 w-full"
                                                            />
                                                            <div
                                                                 className=""
                                                                 onClick={() =>
                                                                      handleReply(
                                                                           item._id
                                                                      )
                                                                 }
                                                            >
                                                                 <IconSend
                                                                      size={10}
                                                                 />
                                                            </div>
                                                       </div>
                                                       <div
                                                            className="replies hidden mt-5"
                                                            id={`reply-${item._id}`}
                                                       >
                                                            <div className="reply-container">
                                                                 {comment.map(
                                                                      (
                                                                           reply,
                                                                           index
                                                                      ) => {
                                                                           return reply.reply &&
                                                                                reply.reply ===
                                                                                     item._id ? (
                                                                                <div
                                                                                     className="comment flex gap-3 mb-5"
                                                                                     key={
                                                                                          index
                                                                                     }
                                                                                >
                                                                                     <div className="profile-icon">
                                                                                          {reply
                                                                                               .user_details
                                                                                               .profile_img ? (
                                                                                               <img
                                                                                                    src={
                                                                                                         reply
                                                                                                              .user_details
                                                                                                              .profile_img
                                                                                                    }
                                                                                                    alt=""
                                                                                                    className="w-9 h-9 rounded-full"
                                                                                               />
                                                                                          ) : (
                                                                                               <div className="icon-with-text">
                                                                                                    <h1>
                                                                                                         {
                                                                                                              reply
                                                                                                                   .user_details
                                                                                                                   .email
                                                                                                         }
                                                                                                    </h1>
                                                                                               </div>
                                                                                          )}
                                                                                     </div>
                                                                                     <div className="group w-full">
                                                                                          <div className="content-body w-full p-3 bg-gray-900">
                                                                                               <div className="user-header h-10">
                                                                                                    <div className="user-details">
                                                                                                         <h1 className="text-md">
                                                                                                              {
                                                                                                                   reply
                                                                                                                        .user_details
                                                                                                                        .username
                                                                                                              }
                                                                                                         </h1>
                                                                                                    </div>
                                                                                               </div>
                                                                                               <div className="content">
                                                                                                    <p>
                                                                                                         {
                                                                                                              reply.content
                                                                                                         }
                                                                                                    </p>
                                                                                               </div>
                                                                                               <div className="likes flex justify-end items-center">
                                                                                                    <>
                                                                                                         {reply.likes.includes(
                                                                                                              user?._id as string
                                                                                                         ) ? (
                                                                                                              <div
                                                                                                                   className="like"
                                                                                                                   onClick={() =>
                                                                                                                        handleDislike(
                                                                                                                             reply._id
                                                                                                                        )
                                                                                                                   }
                                                                                                              >
                                                                                                                   <DislikeIcon
                                                                                                                        size={
                                                                                                                             15
                                                                                                                        }
                                                                                                                   />
                                                                                                              </div>
                                                                                                         ) : (
                                                                                                              <div
                                                                                                                   className="likes"
                                                                                                                   onClick={() =>
                                                                                                                        handleLike(
                                                                                                                             reply._id
                                                                                                                        )
                                                                                                                   }
                                                                                                              >
                                                                                                                   <LikeIcon
                                                                                                                        size={
                                                                                                                             15
                                                                                                                        }
                                                                                                                   />
                                                                                                              </div>
                                                                                                         )}
                                                                                                    </>
                                                                                                    {
                                                                                                         reply
                                                                                                              .likes
                                                                                                              .length
                                                                                                    }
                                                                                               </div>
                                                                                          </div>
                                                                                     </div>
                                                                                </div>
                                                                           ) : null;
                                                                      }
                                                                 )}
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )
                                   );
                              })}
                         <div className="comment-box flex sticky bottom-0">
                              <input
                                   type="text"
                                   className="bg-gray-700 w-full rounded-md"
                                   placeholder="Add your comment"
                                   onChange={(e) =>
                                        setNewComment(e.target.value)
                                   }
                                   value={newComment}
                              />
                              <div
                                   className="send-btn"
                                   onClick={handleSendComment}
                              >
                                   <IconSend size={10} />
                              </div>
                         </div>
                    </section>
               </Modal.Body>
          </Modal>
     );
}
