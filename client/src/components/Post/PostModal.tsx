import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ProfileIconWithText, VolumeOff, VolumeOn } from "../../assets/Icons";
import { IComment, IPost } from "../../types";
import Comment from "../Comment/Comment";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IoSend } from "react-icons/io5";
import API from "../../api";
import "./Post.css"

export default function PostModal({
     openModal,
     setOpenModal,
     post,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     post: IPost;
}) {
     const videoRef = useRef<HTMLVideoElement>(null);
     const date = new Date(post.createdAt);
     const [isMuted, setIsMuted] = useState(false);
     const [comments, setComments] = useState<IComment[]>([]);
     const [newComment, setNewComment] = useState("");

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/posts/comment/${post._id}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setComments(response.data.comments);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, [openModal, post]);

     async function handleSubmit() {
          try {
               if (newComment) {
                    const response = await API.post(
                         "/posts/comment",
                         { content: newComment, post_id: post._id },
                         { withCredentials: true }
                    );
                    if (response.data) {
                         console.log(response.data);
                         setComments([...comments, response.data.newComment]);
                    }
               }else{
                throw new Error('Comment empty')
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }

     const handleToggleMute = () => {
          const currentVideo = videoRef.current;
          if (currentVideo) {
               if (isMuted) {
                    currentVideo.muted = false; // Unmute the video
               } else {
                    currentVideo.muted = true; // Mute the video
               }

               setIsMuted(!isMuted);
          }
     };

     return (
          <div>
               <Modal
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                    size={"5xl"}
               >
                    <Modal.Body className="flex flex-col sm:flex-row">
                         <div className="content p-2 sm:w-1/2">
                              {post.type.includes("image") ? (
                                   <img
                                        src={post?.content}
                                        className="w-full rounded-md"
                                   />
                              ) : (
                                   <div className="relative">
                                        <video
                                             className="w-full"
                                             loop
                                             muted
                                             ref={videoRef}
                                             autoPlay
                                        >
                                             <source
                                                  src={post?.content}
                                                  type="video/mp4"
                                             />
                                             Error Message
                                        </video>
                                        <div
                                             className="absolute bottom-1 volume-button rounded-full"
                                             onClick={() => handleToggleMute()}
                                        >
                                             {isMuted ? (
                                                  <VolumeOff size={25} />
                                             ) : (
                                                  <VolumeOn size={25} />
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                         <div className="flex flex-col sm:w-1/2">
                              <div className="header flex gap-3 shadow-md w-full h-min py-2 px-3">
                                   <div className="profile-img-icon">
                                        {post?.user_details.profile_img ? (
                                             <img
                                                  src={
                                                       post?.user_details
                                                            ?.profile_img
                                                  }
                                                  alt=""
                                                  style={{}}
                                                  className="w-16 rounded-lg"
                                             />
                                        ) : (
                                             <ProfileIconWithText
                                                  email={
                                                       post?.user_details.email
                                                            .email || ""
                                                  }
                                                  size={"medium"}
                                             />
                                        )}
                                   </div>
                                   <div className="name w-full">
                                        <h1 className="">
                                             {post.user_details.username}
                                        </h1>
                                        <small className="text-xs text-slate-500">{`${date.getDay()} - ${
                                             date.getMonth() + 1
                                        } - ${date.getFullYear()}`}</small>
                                   </div>
                              </div>
                              <Modal.Header className="absolute right-2 top-4"></Modal.Header>
                              <div className="add-comment flex items-center h-min my-3 pe-2">
                                   <input
                                        type="text"
                                        className="rounded-md add-comment-inp mr-2"
                                        name="comment"
                                        placeholder="Add your comment"
                                        onChange={(e) =>
                                             setNewComment(e.target.value)
                                        }
                                   />
                                   <div onClick={handleSubmit} className="cursor-pointer">
                                        <IoSend />
                                   </div>
                              </div>
                              <div className="comments overflow-y-scroll">
                                   {comments?.map((item) => {
                                        return <Comment item={item} post_id={post._id} />;
                                   })}
                              </div>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     );
}
