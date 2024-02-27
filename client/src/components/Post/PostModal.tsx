import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
     ProfileIconWithText,
     ThreeDot,
     VolumeOff,
     VolumeOn,
} from "../../assets/Icons";
import { IComment, IPost } from "../../types";
import Comment from "../Comment/Comment";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IoSend } from "react-icons/io5";
import API from "../../api";
import "./Post.css";

//list
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { deletePost, unsavePost } from "../../services/postService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditPost from "../Modal/EditPost";
import { postReset } from "../../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import Insights from "./Insights";

export default function PostModal({
     openModal,
     type,
     setOpenModal,
     post,
}: {
     openModal: boolean;
     type: string;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     post: IPost;
}) {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { isSuccess, isError, errorMessage } = useAppSelector(
          (state) => state.post
     );
     const videoRef = useRef<HTMLVideoElement>(null);
     const date = new Date(post.createdAt);
     const [isMuted, setIsMuted] = useState(false);
     const [comments, setComments] = useState<IComment[]>([]);
     const [newComment, setNewComment] = useState("");
     const [showList, setShowList] = useState(false);
     const [showOthersList, setShowOthersList] = useState(false);
     const [showNormalList, setShowNormalList] = useState(false);
     const [editPost, setEditPost] = useState(false);
     const [viewInsights, setViewInsights] = useState(false);

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
                         setComments([...comments, response.data.newComment]);
                    }
               } else {
                    throw new Error("Comment empty");
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }

     function handleUnsave() {
          dispatch(unsavePost(post._id));
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

     function handleEdit() {
          setEditPost(true);
     }
     function handleDelete() {
          dispatch(deletePost(post._id));
     }

     useEffect(() => {
          if (isSuccess) {
               setOpenModal(false);
          }
          if (isError) {
               toast.error(errorMessage);
          }
          dispatch(postReset());
     }, [isSuccess, setOpenModal, dispatch, isError, errorMessage]);

     return (
          <div>
               <EditPost
                    openModal={editPost}
                    setOpenModal={setEditPost}
                    post={post}
               />
               {viewInsights && (
                    <Insights
                         openModal={viewInsights}
                         setOpenModal={setViewInsights}
                         post={post}
                    />
               )}
               <Modal
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                    size={"5xl"}
               >
                    <Modal.Body className="view-post-modal flex flex-col sm:flex-row bg-gray-900 shadow-xl">
                         <div className="content p-2 sm:w-1/2 flex flex-col items-start justify-between">
                              {post.type.includes("image") ? (
                                   <img
                                        src={post?.content}
                                        className="w-5/6 rounded-md"
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
                              {type === "PROFILE" ? (
                                   !post.is_boosted ? (
                                        <button
                                             className="bg-primary py-2 hover:bg-primary-hover px-3 rounded-md mt-5 text-white"
                                             onClick={() =>
                                                  navigate(
                                                       `/posts/boost/${post?._id}`
                                                  )
                                             }
                                        >
                                             Boost this post
                                        </button>
                                   ) : (
                                        <button
                                             className="bg-primary py-2 hover:bg-primary-hover px-3 rounded-md mt-5 text-white"
                                             onClick={() =>
                                                  setViewInsights(true)
                                             }
                                        >
                                             View Insights
                                        </button>
                                   )
                              ) : null}
                         </div>
                         <div className="flex flex-col sm:w-1/2">
                              <div className="header flex items-center gap-3 shadow-md w-full h-min py-2 px-3">
                                   <div className="profile-img-icon">
                                        {post?.user_details?.profile_img ? (
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
                                        <h1 className="text-white">
                                             {post.user_details.username}
                                        </h1>
                                        <small className="text-xs text-slate-500">{`${date.getDay()} - ${
                                             date.getMonth() + 1
                                        } - ${date.getFullYear()}`}</small>
                                   </div>
                                   {type === "PROFILE" ? (
                                        <div
                                             className="cursor-pointer"
                                             onClick={() =>
                                                  setShowList(!showList)
                                             }
                                        >
                                             <ThreeDot size={35} />
                                        </div>
                                   ) : type === "SAVED" ? (
                                        <div
                                             className="cursor-pointer"
                                             onClick={() =>
                                                  setShowNormalList(!showList)
                                             }
                                        >
                                             <ThreeDot size={35} />
                                        </div>
                                   ) : type === "OTHERS" ? (
                                        <div
                                             className="cursor-pointer"
                                             onClick={() =>
                                                  setShowOthersList(
                                                       !showOthersList
                                                  )
                                             }
                                        >
                                             <ThreeDot size={35} />
                                        </div>
                                   ) : null}
                                   <div className="">
                                        <Modal.Header className="p-0"></Modal.Header>
                                   </div>
                              </div>
                              <div className="add-comment flex items-center h-min my-3 pe-2">
                                   <input
                                        type="text"
                                        className="rounded-md bg-gray-800 text-white add-comment-inp mr-2"
                                        value={newComment}
                                        name="comment"
                                        placeholder="Add your comment"
                                        onChange={(e) =>
                                             setNewComment(e.target.value)
                                        }
                                   />
                                   <div
                                        onClick={() => {
                                             handleSubmit();
                                             setNewComment("");
                                        }}
                                        className="cursor-pointer text-white"
                                   >
                                        <IoSend />
                                   </div>
                                   {showList && (
                                        <div className="list absolute right-8 top-24 z-20">
                                             <List
                                                  sx={{
                                                       width: "100%",
                                                       maxWidth: 360,
                                                       bgcolor: "background.paper",
                                                  }}
                                                  className="rounded-md shadow-md "
                                                  aria-label="contacts"
                                                  onClick={() =>
                                                       setShowList(false)
                                                  }
                                             >
                                                  <ListItem
                                                       disablePadding
                                                       onClick={() =>
                                                            handleDelete()
                                                       }
                                                  >
                                                       <ListItemButton>
                                                            <ListItemText
                                                                 primary="Delete"
                                                                 className="px-5"
                                                            />
                                                       </ListItemButton>
                                                  </ListItem>
                                                  <ListItem
                                                       disablePadding
                                                       onClick={() =>
                                                            handleEdit()
                                                       }
                                                  >
                                                       <ListItemButton>
                                                            <ListItemText
                                                                 primary="Edit"
                                                                 className="px-5"
                                                            />
                                                       </ListItemButton>
                                                  </ListItem>
                                             </List>
                                        </div>
                                   )}
                                   {showNormalList && (
                                        <div className="list absolute right-8 top-24 z-20">
                                             <List
                                                  sx={{
                                                       width: "100%",
                                                       maxWidth: 360,
                                                       bgcolor: "background.paper",
                                                  }}
                                                  className="rounded-md shadow-md "
                                                  aria-label="contacts"
                                                  onClick={() =>
                                                       setShowList(false)
                                                  }
                                             >
                                                  <ListItem
                                                       disablePadding
                                                       onClick={() =>
                                                            handleUnsave()
                                                       }
                                                  >
                                                       <ListItemButton>
                                                            <ListItemText
                                                                 primary="Unsave"
                                                                 className="px-5"
                                                            />
                                                       </ListItemButton>
                                                  </ListItem>
                                             </List>
                                        </div>
                                   )}
                              </div>
                              <div className="comments overflow-y-scroll">
                                   {comments?.map((item, index) => {
                                        return (
                                             <Comment
                                                  item={item}
                                                  post_id={post._id}
                                                  key={index}
                                             />
                                        );
                                   })}
                              </div>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     );
}
