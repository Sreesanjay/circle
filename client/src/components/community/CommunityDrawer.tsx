import { Drawer } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICommunity, userList } from "../../types";
import { getMemberes, removeMember } from "../../services/communityService";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { ProfileIconWithText, RemoveIcon } from "../../assets/Icons";
import "./CommunityDrawer.css";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import Report from "../Modal/Report";
import EditCommunity from "./EditCommunity";
import API from "../../api";
import { toast } from "react-toastify";
import PopupModal from "../Modal/PopupModal";
type TMember = {
     user_id: string;
     status: string;
     is_admin: boolean;
} | null;
export default function CommunityDrawer({
     openDrawer,
     setOpenDrawer,
     community,
     setCommunity,
     setUser,
}: {
     openDrawer: boolean;
     setOpenDrawer: Dispatch<SetStateAction<boolean>>;
     community: ICommunity | null;
     setCommunity: Dispatch<SetStateAction<ICommunity | null>>;
     setUser: Dispatch<SetStateAction<TMember | null>>;
}) {
     const navigate = useNavigate();
     const [members, setMembers] = useState<userList[] | []>([]);
     const [adminId, setAdminId] = useState<string>("");
     const [isUser, setIsUser] = useState<boolean>(false);
     const [openReport, setOpenReport] = useState<boolean>(false);
     const [openEdit, setOpenEdit] = useState<boolean>(false);
     const { user } = useAppSelector((state) => state.auth);
     const [deleteComm, setDeleteComm] = useState<boolean>(false);
     useEffect(() => {
          (async () => {
               const memberId = community?.members
                    .filter((item) => item.status === "active")
                    .map((member) => member.user_id);
               if (memberId) {
                    const repsonse = await getMemberes(memberId);
                    if (repsonse.members) {
                         setMembers(repsonse.members);
                    }
               }
          })();
     }, [community]);

     useEffect(() => {
          if (community) {
               community.members.map((item) => {
                    if (item.is_admin) {
                         setAdminId(item.user_id);
                    }
                    return item;
               });
          }
     }, [community]);

     useEffect(() => {
          if (community && user) {
               community.members.map((item) => {
                    if (item.user_id === user?._id) {
                         setIsUser(true);
                    }
                    return item;
               });
          }
     }, [community, user]);

     async function handleRemove(id: string) {
          const payload = {
               user_id: id,
               community_id: community?._id,
          };
          const response = await removeMember(payload);
          if (response.member && community) {
               community.members = community?.members.filter(
                    (item) => item.user_id !== id
               );
               setCommunity(community);
               setMembers((current) =>
                    current.filter((item) => item.user_id !== id)
               );
               if (id === user?._id) {
                    setUser(null);
                    setIsUser(false);
                    if (community.privacy === "private") {
                         navigate("/community/recent_discussions");
                    }
               }
          }
     }
     async function deleteCommunity() {
          const response = await API.put(`/community/remove/${community?._id}`);
          if (response.data) {
               setOpenDrawer(false);
               toast.success("community deleted");
               navigate("/community/recent_discussions");
          }
     }

     function isDeleteCommunity() {
          setDeleteComm(true);
     }

     function cancelDeletion() {
          setDeleteComm(false);
     }

     return (
          <div>
               <PopupModal
                    modalState={deleteComm}
                    message={"Are you sure you want to delete this community?"}
                    posText={"Delete"}
                    negText={"No"}
                    successCallback={deleteCommunity}
                    cancelCallback={cancelDeletion}
               />
               <Drawer
                    anchor={"right"}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
               >
                    <div
                         className="btn text-3xl px-10 py-3 bg-gray-700 sm:hidden"
                         onClick={() => setOpenDrawer(false)}
                    >
                         <IoChevronBackCircleSharp />
                    </div>
                    <div className="container bg-gray-900 w-96 h-screen p-5 flex flex-col items-center">
                         <div className="icon h-28 w-28 bg-gray-700 rounded-full flex items-center justify-center relative">
                              {community?.icon ? (
                                   <img src={community.icon} alt="" />
                              ) : (
                                   <h1 className="text-5xl text-white">
                                        {community?.community_name[0].toUpperCase()}
                                   </h1>
                              )}
                         </div>
                         <h1 className="text-2xl text-white mt-5">
                              {community?.community_name}
                         </h1>
                         {isUser && (
                              <div className="exit-report-btn py-3">
                                   <button
                                        className="btn px-5 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md"
                                        onClick={() =>
                                             handleRemove(user?._id as string)
                                        }
                                   >
                                        Exit
                                   </button>
                                   {user?._id !== adminId ? (
                                        <button
                                             className="btn px-5 py-1 ms-3 bg-primary hover:bg-primary-hover text-white rounded-md"
                                             onClick={() => {
                                                  setOpenReport(true);
                                                  setOpenDrawer(false);
                                             }}
                                        >
                                             Report
                                        </button>
                                   ) : (
                                        <>
                                             <button
                                                  className="btn px-5 py-1 ms-3 bg-primary hover:bg-primary-hover text-white rounded-md"
                                                  onClick={() => {
                                                       setOpenEdit(true);
                                                       setOpenDrawer(false);
                                                  }}
                                             >
                                                  Edit
                                             </button>
                                             <button
                                                  className="btn px-5 py-1 ms-3 bg-primary hover:bg-primary-hover text-white rounded-md"
                                                  onClick={isDeleteCommunity}
                                             >
                                                  Delete
                                             </button>
                                        </>
                                   )}
                              </div>
                         )}
                         <div className="drawer-body w-full p-5 text-white pt-10">
                              <h1 className="text-xl mb-5">Members</h1>
                              <div className="members max-h-96 overflow-y-scroll">
                                   {members &&
                                        members.map((item, index) => {
                                             return (
                                                  <div
                                                       className="user-card mb-4 bg-gray-800 p-2 rounded-md flex justify-between items-center"
                                                       key={index}
                                                  >
                                                       <div className="profile flex gap-3">
                                                            {item.profile_img ? (
                                                                 <img
                                                                      src={
                                                                           item.profile_img
                                                                      }
                                                                      alt=""
                                                                      className="w-10 h-10"
                                                                 />
                                                            ) : (
                                                                 <ProfileIconWithText
                                                                      email={
                                                                           item.email
                                                                      }
                                                                      size={
                                                                           "small"
                                                                      }
                                                                 />
                                                            )}
                                                            <div className="name flex items-center">
                                                                 <h1 className="text-lg">
                                                                      {
                                                                           item.username
                                                                      }
                                                                 </h1>
                                                                 {item.user_id ===
                                                                      user?._id && (
                                                                      <p className="">
                                                                           (You)
                                                                      </p>
                                                                 )}
                                                            </div>
                                                       </div>
                                                       <div className="actions">
                                                            {item.user_id ===
                                                            adminId ? (
                                                                 <p className="text-sm">
                                                                      Admin
                                                                 </p>
                                                            ) : (
                                                                 user?._id ===
                                                                      adminId && (
                                                                      <div
                                                                           className="remove"
                                                                           onClick={() =>
                                                                                handleRemove(
                                                                                     item.user_id
                                                                                )
                                                                           }
                                                                      >
                                                                           <RemoveIcon
                                                                                size={
                                                                                     25
                                                                                }
                                                                           />
                                                                      </div>
                                                                 )
                                                            )}
                                                       </div>
                                                  </div>
                                             );
                                        })}
                              </div>
                         </div>
                    </div>
               </Drawer>
               {community && (
                    <>
                         <Report
                              openModal={openReport}
                              setOpenModal={setOpenReport}
                              id={community._id}
                              reported_type="community"
                         />
                         <EditCommunity
                              showModal={openEdit}
                              setShowModal={setOpenEdit}
                              community={community}
                              setCommunity={setCommunity}
                         />
                    </>
               )}
          </div>
     );
}
