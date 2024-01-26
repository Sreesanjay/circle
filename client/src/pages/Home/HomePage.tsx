import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import "./HomePage.css";
import { AddIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { getMyStory } from "../../services/storyService";
import { resetStory } from "../../features/story/storySlice";
export default function HomePage() {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { userProfile } = useAppSelector((state) => state.user);
     const { user } = useAppSelector((state) => state.auth);
     const myStory = useAppSelector((state) => state.story);
     useEffect(() => {
          (async () => {
               dispatch(getUserProfile());
               dispatch(getMyStory());
          })();
     }, [dispatch]);

     useEffect(() => {
          if (myStory.isSuccess) {
               dispatch(resetStory());
          }
     }, [myStory.isSuccess, dispatch]);
     return (
          <div className="flex">
               <HomeSidebar />
               <div className="section ms-80 w-full pe-5 py-2">
                    <section className="story-section flex items-center gap-5 bg-slate-50 h-32 rounded-md ps-3 shadow-md">
                         <div className="my-story flex items-center justify-center relative">
                              <div
                                   className="profile p-1 rounded-full"
                                   onClick={() => navigate("/my-story")}
                              >
                                   {userProfile?.profile_img ? (
                                        <img
                                             src={userProfile?.profile_img}
                                             alt=""
                                             className="w-20 h-20 rounded-full shadow-md"
                                        />
                                   ) : (
                                        <div className="text-7xl flex items-center justify-center pb-1 w-20 h-20 bg-gray-400 rounded-full text-white">
                                             <h1>{user?.email[0]}</h1>
                                        </div>
                                   )}
                              </div>
                              {myStory.myStory.length === 0 && (
                                   <div
                                        className="absolute right-0 bottom-0"
                                        onClick={() => navigate("/add-story")}
                                   >
                                        <AddIcon size={40} />
                                   </div>
                              )}
                         </div>
                    </section>
               </div>
          </div>
     );
}
