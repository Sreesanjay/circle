import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import "./HomePage.css";
import Post from "../../components/Post/Post";
import Story from "../../components/Story/Story";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IUserList } from "../../types";
import API from "../../api";
import { ProfileIconWithText } from "../../assets/Icons";

export default function HomePage() {
     const dispatch = useAppDispatch();
     const [suggestion, setSuggestion] = useState<IUserList[]>([]);
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/users", {
                         withCredentials: true,
                    });
                    if (response.data) {
                         setSuggestion(response.data.suggestion);
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

     useEffect(() => {
          (async () => {
               dispatch(getUserProfile());
          })();
     }, [dispatch]);

     function handleFollow(id: string) {
          (async () => {
               try {
                    const response = await API.post("/users", { id });
                    if (response.data) {
                         setSuggestion((prev) => {
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
                         setSuggestion((prev) => {
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

               <div className="section md:ms-80 w-full md:w-auto md:py-5">
                    <Story />
                    <section className="body grid grid-cols-12">
                         <div className="post col-span-12 lg:col-span-6">
                              <Post />
                         </div>
                         <div className="right-section hidden col-span-6 lg:flex flex-col mt-3 p-5">
                              <div className="suggestions flex flex-col items-center">
                                   <div className="suggestion-container">
                                        {suggestion.length > 0 && (
                                             <h1 className="text-lg mb-10">
                                                  Suggestions for you
                                             </h1>
                                        )}
                                        {suggestion &&
                                             suggestion.map((item) => {
                                                  return (
                                                       <div
                                                            key={item._id}
                                                            className="user-suggestion-card  mt-3 flex justify-between max-w-96 gap-3"
                                                       >
                                                            <div className="profile flex gap-3">
                                                                 {item.profile_img ? (
                                                                      <img
                                                                           src={
                                                                                item.profile_img
                                                                           }
                                                                           alt=""
                                                                           className="w-10 h-10 rounded-md"
                                                                      />
                                                                 ) : (
                                                                      <div className="icon-with-text">
                                                                           <ProfileIconWithText
                                                                                email={
                                                                                     item.email
                                                                                }
                                                                                size="small"
                                                                           />
                                                                      </div>
                                                                 )}
                                                                 <h1 className="text-lg">
                                                                      {
                                                                           item.username
                                                                      }
                                                                 </h1>
                                                            </div>
                                                            {item.followed ? (
                                                                 <button
                                                                      className=" px-5 rounded-md h-7 hover:bg-slate-500"
                                                                      onClick={() =>
                                                                           handleUnfollow(
                                                                                item.user_id
                                                                           )
                                                                      }
                                                                 >
                                                                      Unfollow
                                                                 </button>
                                                            ) : (
                                                                 <button
                                                                      className=" px-5 rounded-md h-7 hover:bg-slate-500"
                                                                      onClick={() =>
                                                                           handleFollow(
                                                                                item.user_id
                                                                           )
                                                                      }
                                                                 >
                                                                      Follow
                                                                 </button>
                                                            )}
                                                       </div>
                                                  );
                                             })}
                                   </div>
                              </div>
                              <div className="box flex flex-col items-center mt-28  max-w-64 self-center p-5  py-10 rounded-md">
                                   <h1 className="text-gray-400">"Connect, Share, Inspire </h1>
                                   <h1 className="text-gray-400">Your Social Oasis Awaits!"</h1>
                              </div>
                         </div>
                    </section>
               </div>
          </div>
     );
}
