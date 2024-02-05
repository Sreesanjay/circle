import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetStory } from "../../features/story/storySlice";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
// import { Carousel } from "flowbite-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import {
     CloseXIcon,
     DislikeIcon,
     LikeIcon,
     ProfileIconWithText,
} from "../../assets/Icons";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ViewStory.css";
import {
     dislikeStory,
     getStories,
     likeStory,
     viewStory,
} from "../../services/storyService";

export default function ViewStory() {
     const navigate = useNavigate();
     const { story, isSuccess } = useAppSelector((state) => state.story);
     const { user } = useAppSelector((state) => state.auth);
     const dispatch = useAppDispatch();
     const { initialIndex } = useParams();
     const [current, setCurrent] = useState<number>(
          parseInt(initialIndex as string, 10) | 0
     );
     const [previous, setPrevious] = useState<number>(current - 1);
     const [next, setNext] = useState<number>(current + 1);

     function nextHandle() {
          setPrevious(current);
          setCurrent(next);
          setNext(next + 1);
     }

     function previousHandle() {
          setNext(current);
          setCurrent(previous);
          setPrevious(previous - 1);
     }

     useEffect(() => {
          viewHandle(story[current]?.stories[0]?._id);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [current]);

     useEffect(() => {
          if (story.length === 0) {
               dispatch(getStories());
          }
     }, [dispatch, story]);

     useEffect(() => {
          if (isSuccess) {
               dispatch(resetStory());
          }
     }, [isSuccess, dispatch]);

     function LikeStory(story_id: string) {
          dispatch(likeStory(story_id));
     }
     function DislikeStory(story_id: string) {
          dispatch(dislikeStory(story_id));
     }

     function viewHandle(story_id: string) {
          dispatch(viewStory(story_id));
     }
     return (
          <section className="stories sm:p-5 flex justify-cente bg-gray-800">
               <div className="all-stories flex justify-center gap-5 relative">
                    {previous !== -1 && (
                         <>
                              <button
                                   className="block sm:hidden absolute left-0 top-0 bottom-0 z-20"
                                   onClick={previousHandle}
                              >
                                   <FaChevronLeft className="text-3xl" />
                              </button>
                              <div
                                   className="prev-story-card hidden sm:flex items-center absolute left-10 top-0 bottom-0 opacity-60"
                                   onClick={previousHandle}
                              >
                                   <div className="">
                                        <div className="rounded-md relative">
                                             <div className="header p-3 flex gap-3 absolute z-20">
                                                  <div className="profile-img-icon">
                                                       {story[previous]
                                                            ?.user_details
                                                            ?.profile_img ? (
                                                            <img
                                                                 src={
                                                                      story[
                                                                           previous
                                                                      ]
                                                                           ?.user_details
                                                                           ?.profile_img
                                                                 }
                                                                 alt=""
                                                                 style={{}}
                                                                 className="w-8 rounded-lg"
                                                            />
                                                       ) : (
                                                            <ProfileIconWithText
                                                                 email={
                                                                      story[
                                                                           previous
                                                                      ]
                                                                           ?.user_details
                                                                           .email
                                                                           ?.email ||
                                                                      ""
                                                                 }
                                                                 size={"small"}
                                                            />
                                                       )}
                                                  </div>
                                                  <h1 className="text-sm">
                                                       {
                                                            story[previous]
                                                                 ?.user_details
                                                                 .username
                                                       }
                                                  </h1>
                                             </div>

                                             <div
                                                  className={` prev-story ${story[previous].stories[0].background} flex items-center justify-center`}
                                             >
                                                  {story[previous].stories[0]
                                                       .story_type ===
                                                  "TEXT" ? (
                                                       <h1
                                                            className={`text-${story[previous].stories[0].color} text-2xl`}
                                                       >
                                                            {
                                                                 story[previous]
                                                                      .stories[0]
                                                                      .content
                                                            }
                                                       </h1>
                                                  ) : (
                                                       <img
                                                            src={
                                                                 story[previous]
                                                                      .stories[0]
                                                                      .content
                                                            }
                                                       />
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </>
                    )}
                    {story.map((item, index) => {
                         return (
                              <>
                                   {current === index && (
                                        <div
                                             key={index}
                                             className="min-w-96 w-1/4"
                                        >
                                             <div className="story-card rounded-md relative">
                                                  <div className="header p-3 flex gap-3 absolute z-20">
                                                       <div className="profile-img-icon">
                                                            {item.user_details
                                                                 ?.profile_img ? (
                                                                 <img
                                                                      src={
                                                                           item
                                                                                .user_details
                                                                                ?.profile_img
                                                                      }
                                                                      alt=""
                                                                      style={{}}
                                                                      className="w-12 rounded-lg"
                                                                 />
                                                            ) : (
                                                                 <ProfileIconWithText
                                                                      email={
                                                                           item
                                                                                .user_details
                                                                                .email
                                                                                ?.email ||
                                                                           ""
                                                                      }
                                                                      size={
                                                                           "small"
                                                                      }
                                                                 />
                                                            )}
                                                       </div>
                                                       <h1>
                                                            {
                                                                 item
                                                                      .user_details
                                                                      .username
                                                            }
                                                       </h1>
                                                  </div>
                                                  <Carousel
                                                       infiniteLoop={false}
                                                       showThumbs={false}
                                                       onChange={(index) =>
                                                            viewHandle(
                                                                 item?.stories[
                                                                      index
                                                                 ]?._id
                                                            )
                                                       }
                                                  >
                                                       {item &&
                                                            item.stories?.map(
                                                                 (
                                                                      item,
                                                                      index
                                                                 ) => {
                                                                      return (
                                                                           <div
                                                                                key={
                                                                                     index
                                                                                }
                                                                                className={`story ${item.background} flex items-center justify-center rounded-md`}
                                                                           >
                                                                                {item.story_type ===
                                                                                "TEXT" ? (
                                                                                     <h1
                                                                                          className={`text-${item.color} text-2xl`}
                                                                                     >
                                                                                          {
                                                                                               item.content
                                                                                          }
                                                                                     </h1>
                                                                                ) : (
                                                                                     <img src={item.content} alt="" />
                                                                                )}
                                                                                <div className="footer absolute bottom-4 right-3">
                                                                                     {user &&
                                                                                     !item.likes.includes(
                                                                                          user._id
                                                                                     ) ? (
                                                                                          <div
                                                                                               className=""
                                                                                               onClick={() =>
                                                                                                    LikeStory(
                                                                                                         item?._id
                                                                                                    )
                                                                                               }
                                                                                          >
                                                                                               <LikeIcon
                                                                                                    size={
                                                                                                         45
                                                                                                    }
                                                                                               />
                                                                                          </div>
                                                                                     ) : (
                                                                                          <div
                                                                                               className=""
                                                                                               onClick={() =>
                                                                                                    DislikeStory(
                                                                                                         item?._id
                                                                                                    )
                                                                                               }
                                                                                          >
                                                                                               <DislikeIcon
                                                                                                    size={
                                                                                                         45
                                                                                                    }
                                                                                               />
                                                                                          </div>
                                                                                     )}
                                                                                </div>
                                                                           </div>
                                                                      );
                                                                 }
                                                            )}
                                                  </Carousel>
                                             </div>
                                        </div>
                                   )}
                              </>
                         );
                    })}

                    {current < story.length - 1 && (
                         <>
                              <button className="block sm:hidden absolute right-0 top-0 bottom-0">
                                   <FaChevronRight
                                        className="text-3xl "
                                        onClick={nextHandle}
                                   />
                              </button>
                              <div
                                   className="prev-story-card hidden sm:flex items-center absolute right-10 top-0 bottom-0 opacity-60"
                                   onClick={nextHandle}
                              >
                                   <div className="">
                                        <div className="rounded-md relative">
                                             <div className="header p-3 flex gap-3 absolute z-20">
                                                  <div className="profile-img-icon">
                                                       {story[next]
                                                            ?.user_details
                                                            ?.profile_img ? (
                                                            <img
                                                                 src={
                                                                      story[
                                                                           next
                                                                      ]
                                                                           ?.user_details
                                                                           ?.profile_img
                                                                 }
                                                                 alt=""
                                                                 style={{}}
                                                                 className="w-8 rounded-lg"
                                                            />
                                                       ) : (
                                                            <ProfileIconWithText
                                                                 email={
                                                                      story[
                                                                           next
                                                                      ]
                                                                           ?.user_details
                                                                           .email
                                                                           ?.email ||
                                                                      ""
                                                                 }
                                                                 size={"small"}
                                                            />
                                                       )}
                                                  </div>
                                                  <h1 className="text-sm">
                                                       {
                                                            story[next]
                                                                 ?.user_details
                                                                 .username
                                                       }
                                                  </h1>
                                             </div>

                                             <div
                                                  className={` prev-story ${story[next].stories[0].background} flex items-center justify-center`}
                                             >
                                                  {story[next].stories[0]
                                                       .story_type ===
                                                  "TEXT" ? (
                                                       <h1
                                                            className={`text-${story[next].stories[0].color} text-2xl`}
                                                       >
                                                            {
                                                                 story[next]
                                                                      ?.stories[0]
                                                                      .content
                                                            }
                                                       </h1>
                                                  ) : (
                                                       <img
                                                            src={
                                                                 story[previous]
                                                                      ?.stories[0]
                                                                      .content
                                                            }
                                                       />
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </>
                    )}
               </div>

               <div
                    className="close-icon absolute right-5"
                    onClick={() => navigate("/")}
               >
                    {" "}
                    <CloseXIcon size={45} />
               </div>
          </section>
     );
}
