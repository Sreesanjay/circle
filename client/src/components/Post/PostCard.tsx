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

//list
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { IPost } from "../../types";
import { useInView } from "react-intersection-observer";
import "./Post.css";
import PostModal from "./PostModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
     dislikePost,
     likePost,
     savePost,
     unsavePost,
} from "../../services/postService";
import { postReset } from "../../features/post/postSlice";
import Report from "../Modal/Report";
import LikedUserList from "../Modal/LikedUserList";

export default function PostCard({ post }: { post: IPost }) {
     const dispatch = useAppDispatch();
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

     const date = new Date(post.createdAt);

     return (
          <>
               <section className="post-card md:w-3/6 mb-5 bg-slate-50 rounded-md shadow-md pb-3">
                    <div className="header flex gap-3 px-5 py-2 shadow-sm justify-between relative">
                         <div className="flex gap-3">
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
                                   <h1>{post.user_details.username}</h1>
                                   <small className="text-xs text-slate-500">{`${date.getDay()} - ${
                                        date.getMonth() + 1
                                   } - ${date.getFullYear()}`}</small>
                              </div>
                         </div>
                         <div
                              className="options cursor-pointer"
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
                                             bgcolor: "background.paper",
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
                              className="w-full text-left text-sm overflow-hidden"
                              style={{
                                   height: `${captionExpand ? "auto" : "20px"}`,
                              }}
                         >
                              {post.caption}
                         </span>
                         {captionExpand ? (
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
                         )}
                    </div>
                    <div className="content p-2">
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
