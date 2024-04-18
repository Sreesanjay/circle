import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { ICommunity, IDiscussion } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
     getAnalytics,
     getCommunity,
     getDiscussions,
     getMyCommunity,
} from "../../services/communityService";
import { resetCommunity } from "../../features/community/communitySlice";
import { FaFileCirclePlus } from "react-icons/fa6";
import "./ViewCommunity.css";
import CommunityDrawer from "../../components/community/CommunityDrawer";
import NewRequest from "../../components/community/NewRequest";
import { IconSend } from "../../assets/Icons";
import NewDiscussion from "../../components/community/NewDiscussion";
import DiscussionCard from "../../components/community/DiscussionCard";
import MediaDiscussion from "../../components/community/MediaDiscussion";

export default function ViewCommunity() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const [currentCommunity, setCurrentCommunity] =
          useState<ICommunity | null>(null);
     const { user } = useAppSelector((state) => state.auth);
     const { id } = useParams();
     const [openDrawer, setOpenDrawer] = useState(false);
     const [openNewRequest, setOpenNewRequest] = useState(false);
     const [newDiscussion, setNewDiscussion] = useState(false);
     const [discussion, setDiscussion] = useState<IDiscussion[] | []>([]);
     const [openMediaUpload, setOpenMediaUpload] = useState(false);
     const [showDropDown, setShowDropDown] = useState("hidden");
     // const pagination = useRef<Date | null>(null);
     const discussionRef = useRef<HTMLDivElement | null>(null);
     const [analystics, setAnalystics] = useState({
          total_members: 0,
          total_discussion: 0,
          discussions_today: 0,
     });
     const { myCommunity, isSuccess, isError } = useAppSelector(
          (state) => state.community
     );
     const [member, setMember] = useState<{
          user_id: string;
          status: string;
          is_admin: boolean;
     } | null>(null);

     useEffect(() => {
          if (currentCommunity) {
               (async () => {
                    const response = await getAnalytics(currentCommunity._id);
                    if (response.analytics) {
                         setAnalystics(response.analytics);
                    }
               })();
          }
     }, [currentCommunity]);

     async function fetchDiscussion() {
          if (currentCommunity) {
               let pagination: Date | null = null;
               if (
                    discussion.length &&
                    currentCommunity._id === discussion[0].community_id
               ) {
                    pagination =
                         discussion.length > 0
                              ? discussion[discussion.length - 1].createdAt
                              : null;
               }
               const response = await getDiscussions(
                    currentCommunity._id,
                    pagination
               );
               if (response.discussions) {
                    if (pagination === null) {
                         setDiscussion(response.discussions);
                    } else {
                         setDiscussion([
                              ...discussion,
                              ...response.discussions,
                         ]);
                    }
               }
          }
     }

     useEffect(() => {
          if (currentCommunity) {
               fetchDiscussion();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [currentCommunity]);

     useEffect(() => {
          if (currentCommunity && user) {
               const member = currentCommunity.members.filter(
                    (member) => member.user_id === user?._id
               );
               setMember(member[0]);
          }
     }, [currentCommunity, user]);

     useEffect(() => {
          if (id) {
               (async () => {
                    const response = await getCommunity(id as string);
                    setCurrentCommunity(response.community);
               })();
          }
     }, [id]);

     useEffect(() => {
          dispatch(getMyCommunity());
     }, [dispatch]);
     useEffect(() => {
          dispatch(resetCommunity());
     }, [isSuccess, isError, dispatch]);

     //scroll handler
     useEffect(() => {
          const handleScroll = () => {
               const bodyHeight = document.body.clientHeight;
               const scrollHeight = window.scrollY;
               const innerHeight = window.innerHeight;
               const isAtBottom = bodyHeight - (scrollHeight + innerHeight) < 1;
               if (isAtBottom) {
                    fetchDiscussion();
               }
          };
          window.addEventListener("scroll", handleScroll);
          return () => {
               window.removeEventListener("scroll", handleScroll);
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [dispatch, discussion]);

     return (
          <section className="view-community grid grid-cols-12 relative">
               <section
                    className={`col-span-12 ${showDropDown} sm:block sm:col-span-5 md:col-span-5 lg:col-span-3 z-20`}
                    onClick={() => setShowDropDown("hidden")}
               >
                    <div
                         className={`left-side-bar fixed overflow-y-scroll bg-gray-900 w-full sm:w-auto 2xl:w-96  pt-5 px-3`}
                    >
                         <h1 className="mb-8 text-2xl">Community</h1>
                         <div
                              className="discover-community w-full bg-gray-800 py-3 rounded-md hover:bg-gray-700 cursor-pointer"
                              onClick={() => navigate("/community/discover")}
                         >
                              <h1 className="text-center">
                                   Discover Communities
                              </h1>
                         </div>

                         <h1 className="your-community text-lg my-5">
                              Your Communities
                         </h1>
                         {myCommunity &&
                              myCommunity.map((item, index) => {
                                   return (
                                        <div
                                             className={`community-choose-card mb-3 flex gap-3 overflow-hidden items-center ${
                                                  item._id !== id
                                                       ? "bg-gray-800"
                                                       : "bg-gray-700"
                                             } hover:bg-gray-700 p-1 px-2 rounded-md cursor-pointer`}
                                             key={index}
                                             onClick={() => {
                                                  navigate(
                                                       `/community/view/${item._id}`
                                                  );
                                             }}
                                        >
                                             <div className="icon w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg relative">
                                                  {item?.icon ? (
                                                       <img
                                                            src={item.icon}
                                                            alt=""
                                                       />
                                                  ) : (
                                                       <h1 className="text-xl">
                                                            {item?.community_name[0].toUpperCase()}
                                                       </h1>
                                                  )}
                                             </div>
                                             <div className="deatils">
                                                  <h1 className="text-lg">
                                                       {item.community_name}
                                                  </h1>
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
               </section>
               <section className="body col-span-12 sm:col-span-7 md:col-span-7 lg:col-span-9">
                    <header className="header flex justify-between shadow-lg p-2 px-5">
                         <div className="profile flex gap-3">
                              <div className="icon h-16 w-28  rounded-md flex items-center justify-center relative">
                                   {currentCommunity?.icon ? (
                                        <img
                                             src={currentCommunity.icon}
                                             alt=""
                                             className="h-14 w-14 rounded-md"
                                        />
                                   ) : (
                                        <h1 className="text-2xl bg-gray-700 px-8 py-3 rounded-md">
                                             {currentCommunity?.community_name[0].toUpperCase()}
                                        </h1>
                                   )}
                                   <button
                                        className="sm:hidden cursor-pointer btn absolute z-20 w-full h-full"
                                        onClick={() => setShowDropDown("block")}
                                   ></button>
                              </div>
                              <h1
                                   className="text-2xl"
                                   onClick={() => setOpenDrawer(true)}
                              >
                                   {currentCommunity?.community_name}
                              </h1>
                         </div>
                         {member && member.is_admin && (
                              <button
                                   className="text-2xl"
                                   onClick={() => setOpenNewRequest(true)}
                              >
                                   <FaUserPlus />
                              </button>
                         )}
                    </header>
                    <body className="container grid grid-cols-12 p-5">
                         <section className="discussion-section col-span-12 lg:col-span-8">
                              {member ? (
                                   <div className="new-discusssion flex items-center gap-3">
                                        <div
                                             className="file-upload-button text-3xl text-primary "
                                             onClick={() =>
                                                  setOpenMediaUpload(true)
                                             }
                                        >
                                             <FaFileCirclePlus />
                                        </div>
                                        <input type="hidden" />
                                        <button
                                             className="new-text-discussion-input w-5/6 h-12 rounded bg-gray-700 flex justify-start items-center px-3 text-slate-500"
                                             onClick={() =>
                                                  setNewDiscussion(true)
                                             }
                                        >
                                             Write Something
                                        </button>
                                        <div className="send-icon">
                                             <IconSend size={35} />
                                        </div>
                                   </div>
                              ) : (
                                   <div className="join-suggestion flex  bg-gray-900/25 text-gray-400 me-5 p-5">
                                        <h1>
                                             Join this community to post
                                             discussions
                                        </h1>
                                   </div>
                              )}
                              {discussion.length !== 0 ? (
                                   <div
                                        className="discussions w-full flex flex-col items-center py-5 sm:p-5"
                                        ref={discussionRef}
                                   >
                                        {discussion?.map((item, index) => {
                                             return (
                                                  <DiscussionCard
                                                       discussion={item}
                                                       setDiscussion={
                                                            setDiscussion
                                                       }
                                                       key={index}
                                                       type={"DEFAULT"}
                                                  />
                                             );
                                        })}
                                   </div>
                              ) : (
                                   <div className="w-full h-1/2 flex justify-center items-center flex-col">
                                        <img src="https://png.pngtree.com/svg/20161030/nodata_800056.png" className="w-40" alt="" />
                                        <h1 className="text-gray-400">No Discussions Yet</h1>
                                   </div>
                              )}
                         </section>
                         <div className="right-section hidden lg:block sm:col-span-4 bg-gray-900 p-5 rounded-md">
                              <h1 className="text-lg">About</h1>
                              <p className="text-sm py-2 pb-5">
                                   {currentCommunity?.about}
                              </p>

                              {currentCommunity?.privacy === "public" ? (
                                   <div className="">
                                        <h1 className="text-lg">Public</h1>
                                        <p className="text-sm py-2 pb-5">
                                             Everyone can see discussions
                                        </p>
                                   </div>
                              ) : (
                                   <div className="">
                                        <div className="flex items-center gap-2 text-lg">
                                             <RiGitRepositoryPrivateFill />
                                             <h1 className="text-lg">
                                                  Private
                                             </h1>
                                        </div>
                                        <p className="text-sm py-5">
                                             Only the members of this community
                                             are allowed to see discussions
                                        </p>
                                   </div>
                              )}
                              <h1 className="text-lg">Activity</h1>
                              <div className="analytics">
                                   <ul className="flex flex-col gap-3 mt-5">
                                        <li>
                                             {analystics.discussions_today}{" "}
                                             Discussions today
                                        </li>
                                        <li>
                                             {analystics.total_discussion} Total
                                             discussions{" "}
                                        </li>
                                        <li>
                                             {analystics.total_members} members
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    </body>
               </section>
               <CommunityDrawer
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    community={currentCommunity}
                    setCommunity={setCurrentCommunity}
                    setUser={setMember}
               />
               <NewRequest
                    openDrawer={openNewRequest}
                    setOpenDrawer={setOpenNewRequest}
                    community={currentCommunity}
                    setCommunity={setCurrentCommunity}
               />
               <NewDiscussion
                    openModal={newDiscussion}
                    setOpenModal={setNewDiscussion}
                    community={currentCommunity}
                    setDiscussion={setDiscussion}
               />
               {currentCommunity && (
                    <MediaDiscussion
                         showUploadImage={openMediaUpload}
                         setshowUploadImage={setOpenMediaUpload}
                         community={currentCommunity._id}
                         setDiscussion={setDiscussion}
                    />
               )}
          </section>
     );
}
