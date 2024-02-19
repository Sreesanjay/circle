import { useAppSelector } from "../../app/hooks";
import { DislikeIcon, LikeIcon, ProfileIconWithText } from "../../assets/Icons";
import { likeDiscussion } from "../../services/communityService";
import { IDiscussion } from "../../types";

export default function DiscussionCard({
     discussion,
}: {
     discussion: IDiscussion;
}) {
     const { user } = useAppSelector((state) => state.auth);

     async function likeHandle() {
          const response = await likeDiscussion(discussion._id);
          if (response.likedDiscussion) {
               setDiscussion((current) => {
                return current.map(item=>)
               });
          }
     }
     return (
          <section className="mb-5 bg-gray-900 w-full rounded-md p-2">
               <header className="header flex gap-3">
                    <div className="profile-img">
                         {discussion.userProfile.profile_img ? (
                              <img
                                   src={discussion.userProfile.profile_img}
                                   alt=""
                                   className="w-10 h-10 rounded-md"
                              />
                         ) : (
                              <div className="profile-icon">
                                   <ProfileIconWithText
                                        email={discussion.userProfile.email}
                                        size={"small"}
                                   />{" "}
                              </div>
                         )}
                    </div>
                    <div className="user-name">
                         <h1 className="text-lg">
                              {discussion.userProfile.username}
                         </h1>
                    </div>
               </header>
               <div className="content py-5">
                    {discussion.content_type === "TEXT" ? (
                         <p>{discussion.content}</p>
                    ) : (
                         <img src="" alt="" />
                    )}
               </div>
               <div className="footer">
                    {discussion.likes.includes(user?._id as string) ? (
                         <div>
                              <DislikeIcon size={25} />
                         </div>
                    ) : (
                         <div className="like-button" onClick={likeDiscussion}>
                              <LikeIcon size={25} />
                         </div>
                    )}
               </div>
          </section>
     );
}
