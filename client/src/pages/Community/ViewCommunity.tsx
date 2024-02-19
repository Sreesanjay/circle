import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { ICommunity, IDiscussion } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
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
                    const response = await getDiscussions(currentCommunity._id);
                    if (response.discussions) {
                         setDiscussion(response.discussions);
                    }
               })();
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

     return (
          <section className="view-community grid grid-cols-12">
               <section className="left-side-bar col-span-3 bg-primary-bg px-3 pt-5">
                    <div
                         className="discover-community w-full bg-gray-800 py-3 rounded-md hover:bg-gray-700 cursor-pointer"
                         onClick={() => navigate("/community/discover")}
                    >
                         <h1 className="text-center">Discover Communities</h1>
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
                                   >
                                        <div className="icon w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                                             {item?.icon ? (
                                                  <img src={item.icon} alt="" />
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
               </section>
               <section className="body col-span-9">
                    <header className="header flex justify-between shadow-lg p-2 px-5">
                         <div className="profile flex gap-3">
                              <div className="icon h-16 w-28 bg-gray-700 rounded-md flex items-center justify-center">
                                   {currentCommunity?.icon ? (
                                        <img
                                             src={currentCommunity.icon}
                                             alt=""
                                        />
                                   ) : (
                                        <h1 className="text-2xl">
                                             {currentCommunity?.community_name[0].toUpperCase()}
                                        </h1>
                                   )}
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
                         <section className="discussion-section col-span-8">
                              <div className="new-discusssion flex items-center gap-3">
                                   <div className="file-upload-button text-3xl text-primary ">
                                        <FaFileCirclePlus />
                                   </div>
                                   <input type="hidden" />
                                   <button
                                        className="new-text-discussion-input w-3/4 h-12 rounded bg-gray-700 flex justify-start items-center px-3 text-slate-500"
                                        onClick={() => setNewDiscussion(true)}
                                   >
                                        Write Something
                                   </button>
                                   <div className="send-icon">
                                        <IconSend size={35} />
                                   </div>
                              </div>
                              <div className="discussions w-full flex flex-col items-center p-5 ">
                                   {discussion?.map((item) => {
                                        return (
                                             <DiscussionCard
                                                  discussion={item}
                                             />
                                        );
                                   })}
                              </div>
                         </section>
                         <div className="profile-section col-span-4 bg-gray-900 p-5 rounded-md">
                              <h1 className="text-lg">About</h1>
                              <p className="text-sm py-5">
                                   {currentCommunity?.about}
                              </p>

                              {currentCommunity?.privacy === "public" ? (
                                   <h1>Public</h1>
                              ) : (
                                   <div className="">
                                        <div className="flex items-center gap-2 text-lg">
                                             <RiGitRepositoryPrivateFill />
                                             <h1>Private</h1>
                                        </div>
                                        <p className="text-sm py-5">
                                             Only the members of this community
                                             are allowed to see discussions
                                        </p>
                                   </div>
                              )}
                              <h1 className="text-lg">Activity</h1>
                         </div>
                    </body>
               </section>
               <CommunityDrawer
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    community={currentCommunity}
               />
               <NewRequest
                    openDrawer={openNewRequest}
                    setOpenDrawer={setOpenNewRequest}
                    community={currentCommunity}
               />
               <NewDiscussion
                    openModal={newDiscussion}
                    setOpenModal={setNewDiscussion}
                    community={currentCommunity}
                    setDiscussion={setDiscussion}
               />
          </section>
     );
}
