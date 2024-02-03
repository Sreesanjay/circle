import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getMyStory } from "../../services/storyService";
import "./MyStory.css";
import ProfileIcon from "../../assets/ProfileIcon";
import { resetStory } from "../../features/story/storySlice";

export default function MyStory() {
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
          <section className="p-5 flex justify-center w-screen">
               <div className="story-card bg-gray-400 rounded-md relative">
                    <div className="header p-3 flex gap-3">
                         <ProfileIcon size="medium" />
                         <h1>{userProfile?.username}</h1>
                    </div>
                    {myStory?.map((item) => {
                         return (
                              <div className="story absolute">
                                   <h1>{item.content}</h1>
                              </div>
                         );
                    })}
               </div>
          </section>
     );
}
