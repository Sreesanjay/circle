import { useEffect, useRef, useState } from "react";
import {
     ChatIcon,
     DislikeIcon,
     LikeIcon,
     ProfileIconWithText,
     ThreeDot,
     VolumeOff,
     VolumeOn,
} from "../../assets/Icons";
import { TiStarburst } from "react-icons/ti";

//list
import List from "@mui/material/List";
import { FaChevronRight } from "react-icons/fa";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { IPost } from "../../types";
import { useInView } from "react-intersection-observer";
import "./Post.css";
import PostModal from "./PostModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
     addClick,
     dislikePost,
     likePost,
     savePost,
     unsavePost,
} from "../../services/postService";
import { postReset } from "../../features/post/postSlice";
import Report from "../Modal/Report";
import LikedUserList from "../Modal/LikedUserList";
import { useNavigate } from "react-router-dom";
import { getChat } from "../../services/chatService";
import { setCurrentChat } from "../../features/Socket/SocketSlice";

export default function PostCard({ post }: { post: IPost }) {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { isError, isSuccess } = useAppSelector((state) => state.post);
     const { user } = useAppSelector((state) => state.auth);
     const [captionExpand, setCaptionExpand] = useState(false);
     const [isMuted, setIsMuted] = useState(true);
     const videoRef = useRef<HTMLVideoElement>(null);
     const [openComments, setOpenComments] = useState(false);
     const [showList, setShowList] = useState(false);
     const [openReport, setOpenReport] = useState(false);
     const [openLike, setOpenLike] = useState(false);

     const { ref, inView } = useInView({
          threshold: 1,
     });

     useEffect(() => {
          if (inView) {
               setIsMuted(true);
               videoRef.current?.play();
          } else {
               setIsMuted(true);
               videoRef.current?.pause();
          }
     }, [inView, ref]);
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

     function handleSave() {
          dispatch(savePost(post._id));
     }
     function handleUnsave() {
          dispatch(unsavePost(post._id));
     }
     function handleLike() {
          dispatch(likePost(post._id));
     }
     function handleDislike() {
          dispatch(dislikePost(post._id));
     }
     function handleReport() {
          setOpenReport(true);
     }
     useEffect(() => {
          dispatch(postReset());
     }, [isSuccess, isError, dispatch]);

     //handle boosted post click
     async function handleClick() {
          const response = await addClick(post._id);
          if (response && post.user_details) {
               const userId = post.user_id;
               if (post.is_boosted?.action === "PROFILE_VISIT") {
                    navigate(`/view-profile/${userId}`);
               } else if (post.is_boosted?.action === "MESSAGE") {
                    const response = await getChat(userId);
                    dispatch(setCurrentChat(response.chat));
                    navigate("/messages");
               }
          }
     }

     const date = new Date(post?.createdAt);

     return (
          <>
               <section className="post-card lg:w-6/6 mb-5 bg-gray-900 rounded-md shadow-lg pb-3">
                    <div className="header flex gap-3 px-5 py-2 shadow-sm justify-between relative">
                         <div
                              className="flex gap-3 cursor-pointer"
                              onClick={() => {
                                   if (user?._id === post.user_id) {
                                        navigate("/profile");
                                   } else {
                                        navigate(
                                             `/view-profile/${post.user_id}`
                                        );
                                   }
                              }}
                         >
                              <div className="profile-img-icon">
                                   {post?.user_details.profile_img ? (
                                        <img
                                             src={
                                                  post?.user_details
                                                       ?.profile_img
                                             }
                                             alt=""
                                             style={{}}
                                             className="w-12 rounded-lg"
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
                              <div className="name">
                                   <div className="flex gap-1">
                                        <h1>{post.user_details.username}</h1>
                                        <>
                                             {post.user_details.verified && (
                                                  <p className="text-blue-600 text-xl">
                                                       <TiStarburst />
                                                  </p>
                                             )}
                                        </>
                                   </div>
                                   <small className="text-xs text-slate-500">{`${date.getDay()} - ${
                                        date.getMonth() + 1
                                   } - ${date.getFullYear()}`}</small>
                              </div>
                         </div>
                         <div
                              className="post-options cursor-pointer "
                              onClick={() => setShowList(!showList)}
                         >
                              <ThreeDot size={35} />
                         </div>
                         {showList && (
                              <div className="list absolute right-4 top-10 z-20">
                                   <List
                                        sx={{
                                             width: "100%",
                                             maxWidth: 360,
                                             backgroundColor: "#121d33",
                                        }}
                                        className="rounded-md shadow-md "
                                        aria-label="contacts"
                                        onClick={() => setShowList(false)}
                                   >
                                        {post.is_saved ? (
                                             <ListItem
                                                  disablePadding
                                                  onClick={() => handleUnsave()}
                                             >
                                                  <ListItemButton>
                                                       <ListItemText
                                                            primary="Unsave"
                                                            className="px-5"
                                                       />
                                                  </ListItemButton>
                                             </ListItem>
                                        ) : (
                                             <ListItem
                                                  disablePadding
                                                  onClick={() => handleSave()}
                                             >
                                                  <ListItemButton>
                                                       <ListItemText
                                                            primary="Save"
                                                            className="px-5"
                                                       />
                                                  </ListItemButton>
                                             </ListItem>
                                        )}
                                        {user?._id !== post.user_id && (
                                             <ListItem
                                                  disablePadding
                                                  onClick={() => handleReport()}
                                             >
                                                  <ListItemButton>
                                                       <ListItemText
                                                            primary="Report"
                                                            className="px-5"
                                                       />
                                                  </ListItemButton>
                                             </ListItem>
                                        )}
                                   </List>
                              </div>
                         )}
                    </div>
                    <div className="caption p-3 flex flex-col items-end">
                         <span
                              className={`w-full text-left text-sm overflow-hidden whitespace-normal ${
                                   captionExpand ? "h-auto" : "h-5"
                              }`}
                         >
                              {post.caption}
                         </span>
                         {post.caption.length > 70 ? (
                              captionExpand ? (
                                   <button
                                        className="text-xs text-slate-400"
                                        onClick={() => setCaptionExpand(false)}
                                   >
                                        Read Less
                                   </button>
                              ) : (
                                   <button
                                        className="text-xs  text-slate-400"
                                        onClick={() => setCaptionExpand(true)}
                                   >
                                        Read More
                                   </button>
                              )
                         ) : null}
                    </div>
                    <div className="content p-2 relative">
                         {post.type.includes("image") ? (
                              <img
                                   src={post?.content}
                                   className="w-full rounded-md"
                              />
                         ) : (
                              <div className="relative" ref={ref}>
                                   <video
                                        className="w-full"
                                        loop
                                        muted
                                        ref={videoRef}
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
                         {post.is_boosted && user?._id !== post.user_id && (
                              <div
                                   className="boost-action h-12 bg-gray-800 hover:bg-gray-600 rounded-md flex items-center px-3 border bottom-0 justify-between"
                                   onClick={handleClick}
                              >
                                   <button>
                                        {post.is_boosted.action ===
                                        "PROFILE_VISIT"
                                             ? "Visit Profile"
                                             : post.is_boosted.action ===
                                               "WEBSITE"
                                             ? "Visit Website"
                                             : post.is_boosted.action ===
                                               "MESSAGE"
                                             ? "Message"
                                             : null}
                                   </button>
                                   <FaChevronRight />
                              </div>
                         )}
                    </div>
                    <footer className="flex px-3 gap-3 items-center">
                         <div className="likes flex items-center">
                              {user && post.likes.includes(user?._id) ? (
                                   <div
                                        className="like"
                                        onClick={handleDislike}
                                   >
                                        <DislikeIcon size={25} />
                                   </div>
                              ) : (
                                   <div className="like" onClick={handleLike}>
                                        <LikeIcon size={25} />
                                   </div>
                              )}
                              <span
                                   className="text-xs"
                                   onClick={() => setOpenLike(true)}
                              >
                                   {post.likes.length} Likes
                              </span>
                         </div>
                         <div className="comments flex items-center">
                              <div
                                   className="comments"
                                   onClick={() => setOpenComments(true)}
                              >
                                   <ChatIcon size={25} />
                                   <span className="text-xs">
                                        {post.comment}
                                   </span>
                              </div>
                         </div>
                    </footer>
               </section>
               <PostModal
                    openModal={openComments}
                    type={"DEFAULT"}
                    setOpenModal={setOpenComments}
                    post={post}
               />
               <Report
                    openModal={openReport}
                    setOpenModal={setOpenReport}
                    id={post._id}
                    reported_type={"post"}
               />
               <LikedUserList
                    openModal={openLike}
                    setOpenModal={setOpenLike}
                    post_id={post._id}
               />
          </>
     );
}
