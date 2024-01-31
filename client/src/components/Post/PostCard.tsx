import { useEffect, useRef, useState } from "react";
import {
     ChatIcon,
     LikeIcon,
     ProfileIconWithText,
     VolumeOff,
     VolumeOn,
} from "../../assets/Icons";
import { IPost } from "../../types";
import { useInView } from "react-intersection-observer";
import "./Post.css";
import PostModal from "./PostModal";

export default function PostCard({ post }: { post: IPost }) {
     const [captionExpand, setCaptionExpand] = useState(false);
     const [isMuted, setIsMuted] = useState(true);
     const videoRef = useRef<HTMLVideoElement>(null);
     const [openComments, setOpenComments] = useState(false);
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

     const date = new Date(post.createdAt);

     return (
          <>
               <section className="post-card md:w-3/6 mb-5 bg-slate-50 rounded-md shadow-md pb-3">
                    <div className="header flex gap-3 px-5 py-2 shadow-sm">
                         <div className="profile-img-icon">
                              {post?.user_details.profile_img ? (
                                   <img
                                        src={post?.user_details?.profile_img}
                                        alt=""
                                        style={{}}
                                        className="w-12 rounded-lg"
                                   />
                              ) : (
                                   <ProfileIconWithText
                                        email={
                                             post?.user_details.email.email ||
                                             ""
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
                              <div className="like">
                                   <LikeIcon size={25} />
                              </div>
                              <span className="text-xs">
                                   {post.likes.length} Likes
                              </span>
                         </div>
                         <div className="comments flex items-center">
                              <div className="comment" onClick={() => setOpenComments(true)}>
                                   <ChatIcon size={25} />
                              </div>
                         </div>
                    </footer>
               </section>
               <PostModal
                    openModal={openComments}
                    setOpenModal={setOpenComments}
                    post={post}
               />
          </>
     );
}
