import { useAppSelector } from "../../app/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
     DislikeIcon,
     LikeIcon,
     ProfileIconWithText,
     ThreeDot,
} from "../../assets/Icons";
import {
     deleteDiscussion,
     dislikeDiscussion,
     getCommunity,
     likeDiscussion,
} from "../../services/communityService";
import { ICommunity, IDiscussion } from "../../types";
import { FaComment } from "react-icons/fa";
import ViewComments from "./ViewComments";
import { ListGroup } from "flowbite-react";
import Report from "../Modal/Report";
import { useNavigate } from "react-router-dom";

export default function DiscussionCard({
     discussion,
     setDiscussion,
     type,
}: {
     discussion: IDiscussion;
     setDiscussion: Dispatch<SetStateAction<IDiscussion[]>>;
     type: string;
}) {
     const { user } = useAppSelector((state) => state.auth);
     const navigate = useNavigate();
     const [openViewDiscussion, setOpenViewDiscussion] = useState(false);
     const [openList, setOpenList] = useState(false);
     const [community, setCommunity] = useState<ICommunity | null>(null);
     const [openReport, setOpenReport] = useState(false);

     async function likeHandle() {
          const response = await likeDiscussion(discussion._id);
          if (response.likedDiscussion) {
               setDiscussion((current) => {
                    return current.map((item: IDiscussion) => {
                         if (item._id === discussion._id) {
                              item.likes.push(user?._id as string);
                         }
                         return item;
                    });
               });
          }
     }

     useEffect(() => {
          (async () => {
               const response = await getCommunity(discussion.community_id);
               if (response.community) {
                    setCommunity(response.community);
               }
          })();
     }, [discussion]);

     async function dislikeHandle() {
          const response = await dislikeDiscussion(discussion._id);
          if (response.likedDiscussion) {
               setDiscussion((current) => {
                    return current.map((item: IDiscussion) => {
                         if (item._id === discussion._id) {
                              item.likes = item.likes.filter(
                                   (userId) => userId !== user?._id
                              );
                         }
                         return item;
                    });
               });
          }
     }

     async function handleDelete() {
          const response = await deleteDiscussion(discussion._id);
          if (response.deletedDiscussion) {
               setDiscussion((current) => {
                    return current.filter(
                         (item) => item._id !== discussion._id
                    );
               });
          }
     }

     return (
          <section className="mb-5 bg-gray-900 w-full rounded-md p-2">
               <header className="header flex justify-between relative">
                    {type === "RECENT" ? (
                         <div
                              className="profile-img flex gap-3 items-start cursor-pointer"
                              onClick={() =>
                                   navigate(`/community/view/${community?._id}`)
                              }
                         >
                              {community?.icon ? (
                                   <img
                                        src={community.icon}
                                        alt=""
                                        className="w-10 h-10 rounded-md"
                                   />
                              ) : (
                                   community?.community_name && (
                                        <div className="profile-icon">
                                             <ProfileIconWithText
                                                  email={
                                                       community?.community_name as string
                                                  }
                                                  size={"small"}
                                             />{" "}
                                        </div>
                                   )
                              )}
                              <div
                                   className="user-name"
                                   style={{ lineHeight: ".5" }}
                              >
                                   <h1 className="text-lg">
                                        {community?.community_name}
                                   </h1>
                                   <span
                                        className=""
                                        style={{ fontSize: "10px" }}
                                   >
                                        Posted by @
                                        {discussion.userProfile.username}
                                   </span>
                              </div>
                         </div>
                    ) : (
                         <div className="profile-img flex gap-3">
                              {discussion.userProfile.profile_img ? (
                                   <img
                                        src={discussion.userProfile.profile_img}
                                        alt=""
                                        className="w-10 h-10 rounded-md"
                                   />
                              ) : (
                                   <div className="profile-icon">
                                        <ProfileIconWithText
                                             email={
                                                  discussion.userProfile.email
                                             }
                                             size={"small"}
                                        />{" "}
                                   </div>
                              )}
                              <div className="user-name">
                                   <h1 className="text-lg">
                                        {discussion.userProfile.username}
                                   </h1>
                              </div>
                         </div>
                    )}
                    <div
                         className="btn cursor-pointer"
                         onClick={() => setOpenList(!openList)}
                    >
                         <ThreeDot size={25} />
                    </div>
                    {openList && (
                         <div className="absolute right-0 top-5">
                              <ListGroup className="w-48">
                                   {discussion.user_id === user?._id ? (
                                        <ListGroup.Item onClick={handleDelete}>
                                             Delete
                                        </ListGroup.Item>
                                   ) : (
                                        <ListGroup.Item
                                             onClick={() => setOpenReport(true)}
                                        >
                                             Report
                                        </ListGroup.Item>
                                   )}
                              </ListGroup>
                         </div>
                    )}
               </header>
               <div className="content py-5">
                    {discussion.content_type === "TEXT" ? (
                         <p>{discussion.content}</p>
                    ) : (
                         <>
                              <p className="my-3 text-slate-200">
                                   {discussion.caption}
                              </p>
                              <img src={discussion.content} alt="" />
                         </>
                    )}
               </div>
               <div className="footer flex items-center gap-4">
                    <div className="like-section flex items-center text-sm">
                         {discussion.likes.includes(user?._id as string) ? (
                              <div
                                   className="dislike-button"
                                   onClick={dislikeHandle}
                              >
                                   <DislikeIcon size={25} />
                              </div>
                         ) : (
                              <div className="like-button" onClick={likeHandle}>
                                   <LikeIcon size={25} />
                              </div>
                         )}
                         {discussion.likes.length} likes
                    </div>
                    <div
                         className="comment text-xl text-primary flex items-center gap-4 cursor-pointer"
                         onClick={() => setOpenViewDiscussion(true)}
                    >
                         <FaComment />
                         <div className="text-sm text-white">
                              {discussion.comments} comments
                         </div>
                    </div>
               </div>
               <ViewComments
                    openModal={openViewDiscussion}
                    setOpenModal={setOpenViewDiscussion}
                    discussion={discussion}
               />
               <Report
                    openModal={openReport}
                    setOpenModal={setOpenReport}
                    id={discussion._id}
                    reported_type={"discussion"}
               />
          </section>
     );
}
