import { getMyStory, getStories } from "../../services/storyService";
import { resetStory } from "../../features/story/storySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "../../assets/Icons";
import "./Story.css";

export default function Story() {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { userProfile } = useAppSelector((state) => state.user);
     const { user } = useAppSelector((state) => state.auth);
     const { myStory, story, isSuccess } = useAppSelector(
          (state) => state.story
     );
     useEffect(() => {
          (async () => {
               dispatch(getMyStory());
               dispatch(getStories());
          })();
     }, [dispatch]);
     useEffect(() => {
          if (isSuccess) {
               dispatch(resetStory());
          }
     }, [isSuccess, dispatch]);


     return (
          <section className="story-section flex items-center gap-5 bg-gray-900 h-32 rounded-md ps-3 shadow-md">
               <div className="my-story flex items-center justify-center relative ">
                    <div
                         className="profile p-1 rounded-full cursor-pointer relative"
                         onClick={() => {
                              if (myStory.length !== 0) {
                                   navigate("/my-story");
                              }
                         }}
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
                         {myStory.length === 0 && (
                              <div
                                   className="absolute right-0 bottom-0"
                                   onClick={() => navigate("/add-story")}
                              >
                                   <AddIcon size={40} />
                              </div>
                         )}
                    </div>
                    <div className="stories-list max-w-2/3 overflow-x-scroll flex gap-5 ms-4">
                         {story &&
                              story.map((item, initialIndex) => {
                                   return (
                                        <div
                                             className="w-20 h-20 rounded-full cursor-pointer"
                                             key={initialIndex}
                                             onClick={() =>
                                                  navigate(
                                                       `/view-story/${initialIndex}`
                                                  )
                                             }
                                        >
                                             {item.user_details?.profile_img ? (
                                                  <img
                                                       src={
                                                            item.user_details
                                                                 ?.profile_img
                                                       }
                                                       alt=""
                                                       className="w-20 h-20 rounded-full shadow-md"
                                                  />
                                             ) : (
                                                  <div className="text-5xl flex items-center justify-center pb-1 w-20 h-20 bg-gray-400 rounded-full text-white">
                                                       <h1>
                                                            {item.user_details.email?.email[0].toUpperCase()}
                                                       </h1>
                                                  </div>
                                             )}
                                        </div>
                                   );
                              })}
                    </div>
               </div>
          </section>
     );
}
