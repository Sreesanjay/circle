import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getMyStory } from "../../services/storyService";
import "./MyStory.css";
import ProfileIcon from "../../assets/ProfileIcon";
import { resetStory } from "../../features/story/storySlice";
import { Carousel } from "flowbite-react";
import { AddIcon, CloseXIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

export default function MyStory() {
     const navigate = useNavigate()
     const { myStory, isSuccess } = useAppSelector((state) => state.story);
     const { userProfile } = useAppSelector((state) => state.user);
     const dispatch = useAppDispatch();
     useEffect(() => {
          dispatch(getMyStory());
     }, [dispatch]);
     useEffect(() => {
          if (isSuccess) {
               dispatch(resetStory());
          }
     }, [isSuccess, dispatch]);
     useEffect(() => {
          console.log(myStory);
     }, [myStory]);
     return (
          <section className="sm:p-5 flex justify-center w-screen">
               <div className="story-card rounded-md relative w-screen sm:w-1/4 sm:min-w-96">
                    <div className="header p-3 flex gap-3 absolute z-20">
                         <ProfileIcon size="small" />
                         <h1>{userProfile?.username}</h1>
                         <div
                              className="absolute left-5 top-5"
                              onClick={() => navigate("/add-story")}
                         >
                              <AddIcon size={30} />
                         </div>
                    </div>
                    <Carousel indicators={false} slideInterval={10000}>
                         {myStory?.map((item) => {
                              return (
                                   <div
                                        className={`story ${item.background} h-full flex items-center justify-center`}
                                   >
                                        {item.story_type === "TEXT" ? (
                                             <h1
                                                  className={`text-${item.color}`}
                                             >
                                                  {item.content}
                                             </h1>
                                        ) : (
                                             <img src="" alt="" />
                                        )}
                                   </div>
                              );
                         })}
                    </Carousel>
               </div>
               <div className="close-icon absolute right-5" onClick={()=>navigate('/')}>
                   <CloseXIcon size={45}/> 
               </div>
          </section>
     );
}
