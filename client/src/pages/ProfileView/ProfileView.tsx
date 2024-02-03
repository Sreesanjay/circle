import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import { IUserList } from "../../types";
import "./ProfileView.css";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { ThreeDot } from "../../assets/Icons";
import { ListGroup } from "flowbite-react";
import Report from "../../components/Modal/Report";

export default function ProfileView() {
     const [userProfile, setUserProfile] = useState<IUserList>();
     const [showList, setShowList] = useState(false);
     const [following, setFollowing] = useState(0);
     const [followers, setFollowers] = useState(0);
     const [isFollowing, setIsFollowing] = useState(false);
     const [isBlocked, setIsBlocked] = useState(false);
     const [openReport, setOpenReport] = useState(false);
     const { id } = useParams();
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/users/get-user-profile/${id}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setUserProfile(response.data.userProfile);
                         setFollowing(response.data.following);
                         setFollowers(response.data.followers);
                         setIsFollowing(response.data.isFollowing);
                         setIsBlocked(response.data.isBlocked);
                    }
               } catch (error) {
                    toast("message");
               }
          })();
     }, [id]);

     async function unfollow() {
          try {
               const response = await API.post(
                    "/users/unfollow",
                    { id },
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setIsFollowing(false);
                    setFollowers((current) => current - 1);
                    toast("Account unfollowed");
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }
     async function follow() {
          try {
               const response = await API.post(
                    "/users",
                    { id },
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setFollowers((current) => current + 1);
                    setIsFollowing(true);
                    toast("Account followed");
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }

     async function blockUser() {
          try {
               const response = await API.get(`/users/block-user/${id}`, {
                    withCredentials: true,
               });
               if (response.data) {
                    setIsFollowing(false);
                    if (isFollowing) {
                         setFollowers((current) => current - 1);
                    }
                    setIsBlocked(true);
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }

     async function unBlock() {
          try {
               const response = await API.get(`/users/unblock-user/${id}`, {
                    withCredentials: true,
               });
               if (response.data) {
                    setIsBlocked(false);
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }

     return (
          <section className="profile-view">
               <Report openModal={openReport} setOpenModal={setOpenReport} id={id as string} reported_type={'account'}/>
               <section className="cover-photo">
                    {userProfile?.cover_img ? (
                         <img
                              src={userProfile?.cover_img}
                              className="object-cover w-screen max-h-64"
                         />
                    ) : (
                         <div className="default-cover">
                              <img
                                   src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"
                                   alt=""
                                   className="w-full max-h-64"
                              />
                         </div>
                    )}
               </section>
               <section className="profile-details grid grid-cols-12 min-h-96">
                    <section className="left-section col-span-3 shadow-md flex flex-col items-center p-5">
                         <div className="profile-image w-36 flex justify-center">
                              {userProfile?.profile_img ? (
                                   <img
                                        src={userProfile?.profile_img}
                                        alt=""
                                        className="w-28 shadow-lg rounded-full"
                                   />
                              ) : (
                                   <img
                                        src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
                                        alt=""
                                        className="w-full rounded-md"
                                   />
                              )}
                         </div>
                         <div className="profile-info py-5 flex flex-col items-center w-full">
                              <h1 className="text-2xl">
                                   {userProfile?.username}
                              </h1>
                              <h3>{userProfile?.fullname}</h3>
                              <div className="counts flex justify-around w-full">
                                   <div className=" flex flex-col items-center">
                                        <span>{following}</span>
                                        <h1>Followig</h1>
                                   </div>
                                   <div className=" flex flex-col items-center">
                                        <span>{followers}</span>
                                        <h1>Followers</h1>
                                   </div>
                              </div>
                              <div className="btn py-5">
                                   {isBlocked ? (
                                        <button
                                             className="bg-primary py-1 px-7 rounded-md text-white"
                                             onClick={() => unBlock()}
                                        >
                                             UnBlock
                                        </button>
                                   ) : isFollowing ? (
                                        <button
                                             className="bg-primary py-1 px-7 rounded-md text-white"
                                             onClick={() => unfollow()}
                                        >
                                             Unfollow
                                        </button>
                                   ) : (
                                        <button
                                             className="bg-primary py-1 px-7 rounded-md text-white"
                                             onClick={() => follow()}
                                        >
                                             Follow
                                        </button>
                                   )}
                              </div>
                              <h1 className="mt-8 mb-3">Bio</h1>
                              <span className="bio">{userProfile?.bio}</span>
                         </div>
                    </section>
                    <section className="posts-section col-span-9">
                         <header className="w-full flex justify-between p-5 relative">
                              <h1 className="p-5 text-lg font-medium">Posts</h1>
                              <div
                                   className=""
                                   onClick={() => setShowList(!showList)}
                              >
                                   <ThreeDot size={35} />
                              </div>
                              {showList && (
                                   <ListGroup
                                        className="w-48 absolute right-5 top-16"
                                        onClick={() => setShowList(!showList)}
                                   >
                                        <div className="shadow-md">
                                             {isBlocked ? (
                                                  <ListGroup.Item
                                                       onClick={() => unBlock()}
                                                  >
                                                       UnBlock
                                                  </ListGroup.Item>
                                             ) : (
                                                  <ListGroup.Item
                                                       onClick={() =>
                                                            blockUser()
                                                       }
                                                  >
                                                       Block
                                                  </ListGroup.Item>
                                             )}
                                             <ListGroup.Item onClick={()=>setOpenReport(true)}>
                                                  Report
                                             </ListGroup.Item>
                                             <ListGroup.Item>
                                                  Messages
                                             </ListGroup.Item>
                                             <ListGroup.Item>
                                                  Download
                                             </ListGroup.Item>
                                        </div>
                                   </ListGroup>
                              )}
                         </header>
                    </section>
               </section>
          </section>
     );
}
