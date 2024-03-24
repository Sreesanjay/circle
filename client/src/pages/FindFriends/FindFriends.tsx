import { Breadcrumb } from "flowbite-react";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import { FaUserFriends } from "react-icons/fa";
import "./FindFriends.css";
import { useEffect, useState } from "react";
import API from "../../api";
import { IUserList } from "../../types";
import { ProfileIconWithText } from "../../assets/Icons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function FindFriends() {
     const [suggestion, setSuggestion] = useState<IUserList[]>([]);
     const [userList, setUserList] = useState<IUserList[]>([]);
     const navigate = useNavigate();
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/users", {
                         withCredentials: true,
                    });
                    if (response.data) {
                         setSuggestion(response.data.suggestion);
                         setUserList(response.data.userList);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, []);

     function handleFollow(id: string) {
          (async () => {
               try {
                    const response = await API.post(
                         "/users",
                         { id },
                         { withCredentials: true }
                    );
                    if (response.data) {
                         toast(response.data.message);
                         setSuggestion((prev) => {
                              return prev.map((item) => {
                                   if (item.user_id === id) {
                                        item.followed = true;
                                   }
                                   return item;
                              });
                         });
                         setUserList((prev) => {
                              return prev.map((item) => {
                                   if (item.user_id === id) {
                                        item.followed = true;
                                   }
                                   return item;
                              });
                         });
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }

     function handleUnfollow(id: string) {
          (async () => {
               try {
                    const response = await API.post(
                         "/users/unfollow",
                         { id },
                         { withCredentials: true }
                    );
                    if (response.data) {
                         toast(response.data.message);
                         setSuggestion((prev) => {
                              return prev.map((item) => {
                                   if (item.user_id === id) {
                                        item.followed = false;
                                   }
                                   return item;
                              });
                         });
                         setUserList((prev) => {
                              return prev.map((item) => {
                                   if (item.user_id === id) {
                                        item.followed = false;
                                   }
                                   return item;
                              });
                         });
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }

     return (
          <div className="flex flex-col">
               <HomeSidebar />
               <div className="section md:ms-80 p-5">
                    <Breadcrumb aria-label="Default breadcrumb example">
                         <Breadcrumb.Item href="#" icon={FaUserFriends}>
                              Find Friends
                         </Breadcrumb.Item>
                    </Breadcrumb>
                    {suggestion.length > 0 && (
                         <>
                              <h1 className="my-3">Suggestions for you</h1>
                              <section className="suggested-for-you flex gap-5 py-5 flex-wrap justify-center sm:justify-start">
                                   {suggestion.map((user) => {
                                        return (
                                             <div className="friend-card bg-gray-900 rounded-md flex flex-col items-center w-56 shadow-md p-3">
                                                  <div
                                                       className="header w-32 rounded-md mb-3"
                                                       onClick={() =>
                                                            navigate(
                                                                 `/view-profile/${user.user_id}`
                                                            )
                                                       }
                                                  >
                                                       {user.profile_img ? (
                                                            <img
                                                                 src={
                                                                      user.profile_img
                                                                 }
                                                                 alt=""
                                                                 className="rounded-lg"
                                                            />
                                                       ) : (
                                                            <ProfileIconWithText
                                                                 email={
                                                                      user?.email ||
                                                                      ""
                                                                 }
                                                                 size={"large"}
                                                            />
                                                       )}
                                                  </div>
                                                  <h1>{user.username}</h1>
                                                  <div className="connections_details w-full flex justify-between py-3">
                                                       <div className="followers flex flex-col items-center justify-center text-sm">
                                                            <h1>
                                                                 {
                                                                      user.followers
                                                                 }
                                                            </h1>
                                                            <span className="text-sm">
                                                                 followers
                                                            </span>
                                                       </div>
                                                       <div className="following text-sm flex flex-col items-center justify-center">
                                                            <h1>
                                                                 {
                                                                      user.following
                                                                 }
                                                            </h1>
                                                            <span className="text-sm">
                                                                 following
                                                            </span>
                                                       </div>
                                                  </div>
                                                  {user.followed ? (
                                                       <button
                                                            className="btn bg-primary p-2 px-8 rounded-md text-white hover:bg-primary-hover"
                                                            onClick={() =>
                                                                 handleUnfollow(
                                                                      user.user_id
                                                                 )
                                                            }
                                                       >
                                                            Unfollow
                                                       </button>
                                                  ) : (
                                                       <button
                                                            className="btn bg-primary p-2 px-8 rounded-md text-white hover:bg-primary-hover"
                                                            onClick={() =>
                                                                 handleFollow(
                                                                      user.user_id
                                                                 )
                                                            }
                                                       >
                                                            Follow
                                                       </button>
                                                  )}
                                             </div>
                                        );
                                   })}
                              </section>
                         </>
                    )}
                    <h1 className="my-5">People You may know</h1>

                    <section className="suggested-for-you flex gap-5 py-5 flex-wrap justify-center sm:justify-start">
                         {userList.map((user) => {
                              return (
                                   <div className="friend-card bg-gray-900 rounded-md flex flex-col items-center w-56 shadow-md p-3">
                                        <div
                                             className="header w-32 rounded-md mb-3"
                                             onClick={() =>
                                                  navigate(
                                                       `/view-profile/${user.user_id}`
                                                  )
                                             }
                                        >
                                             {user.profile_img ? (
                                                  <img
                                                       src={user.profile_img}
                                                       alt=""
                                                       className="rounded-lg"
                                                  />
                                             ) : (
                                                  <ProfileIconWithText
                                                       email={user?.email || ""}
                                                       size={"large"}
                                                  />
                                             )}
                                        </div>
                                        <h1>{user.username}</h1>
                                        <div className="connections_details w-full flex justify-between py-3">
                                             <div className="followers flex flex-col items-center justify-center text-sm">
                                                  <h1>{user.followers}</h1>
                                                  <span className="text-sm">
                                                       followers
                                                  </span>
                                             </div>
                                             <div className="following text-sm flex flex-col items-center justify-center">
                                                  <h1>{user.following}</h1>
                                                  <span className="text-sm">
                                                       following
                                                  </span>
                                             </div>
                                        </div>
                                        {user.followed ? (
                                             <button
                                                  className="btn bg-primary p-2 px-8 rounded-md text-white hover:bg-primary-hover"
                                                  onClick={() =>
                                                       handleUnfollow(
                                                            user.user_id
                                                       )
                                                  }
                                             >
                                                  Unfollow
                                             </button>
                                        ) : (
                                             <button
                                                  className="btn bg-primary p-2 px-8 rounded-md text-white hover:bg-primary-hover"
                                                  onClick={() =>
                                                       handleFollow(
                                                            user.user_id
                                                       )
                                                  }
                                             >
                                                  Follow
                                             </button>
                                        )}
                                   </div>
                              );
                         })}
                    </section>
               </div>
          </div>
     );
}
