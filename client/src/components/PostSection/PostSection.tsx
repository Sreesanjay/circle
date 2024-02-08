import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { IPost } from "../../types";
import PostModal from "../Post/PostModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMyPost } from "../../services/postService";
import { toast } from "react-toastify";
import { postReset } from "../../features/post/postSlice";

export default function PostSection() {
     const dispatch = useAppDispatch();
     const { isSuccess, myPosts, isLoading, isError, errorMessage } =
          useAppSelector((state) => state.post);
     const { userProfile } = useAppSelector((state) => state.user);
     const { user } = useAppSelector((state) => state.auth);
     const [openComments, setOpenComments] = useState(false);
     const [choosedPost, setChoosedPost] = useState<IPost | null>(null);

     function handleOpenPost(post: IPost) {
          setOpenComments(true);
          setChoosedPost(post);
     }

     useEffect(() => {
          dispatch(getMyPost());
     }, [dispatch]);
     useEffect(() => {
          if (isError) {
               toast.error(errorMessage);
          }
          dispatch(postReset());
     }, [isSuccess, isError, errorMessage, dispatch]);

     return (
          <section className="posts p-5">
               {isLoading ? (
                    <div className="loader flex gap-5 justify-around">
                         <Skeleton
                              variant="rectangular"
                              width={210}
                              height={118}
                         />
                         <Skeleton
                              variant="rectangular"
                              width={210}
                              height={118}
                         />
                         <Skeleton
                              variant="rectangular"
                              width={210}
                              height={118}
                         />
                    </div>
               ) : (
                    <ImageList
                         //  sx={{ width:500, height: 450 }}
                         style={{ overflow: "hidden", height: "100%" }}
                         className="image-list"
                         variant="masonry"
                         cols={3}
                         gap={1}
                    >
                         {myPosts &&
                              myPosts.map((post: IPost) => (
                                   <ImageListItem key={post._id} className="">
                                        <div
                                             className="content p-2 shadow-md"
                                             onClick={() =>
                                                  handleOpenPost(post)
                                             }
                                        >
                                             {post.type.includes("image") ? (
                                                  <img
                                                       src={post?.content}
                                                       className="w-full rounded-md"
                                                  />
                                             ) : (
                                                  <div className="relative">
                                                       <video
                                                            className="w-full"
                                                            muted
                                                       >
                                                            <source
                                                                 src={
                                                                      post?.content
                                                                 }
                                                                 type="video/mp4"
                                                            />
                                                            Error Message
                                                       </video>
                                                  </div>
                                             )}
                                        </div>
                                   </ImageListItem>
                              ))}
                    </ImageList>
               )}
               {userProfile && choosedPost && (
                    <PostModal
                         openModal={openComments}
                         setOpenModal={setOpenComments}
                         type={"PROFILE"}
                         post={{
                              ...choosedPost,
                              user_details: {
                                   fullname: "",
                                   user_id: "",
                                   username: userProfile.username,
                                   profile_img: userProfile.profile_img,
                                   email: {
                                        email: user ? user.email : "",
                                   },
                              },
                         }}
                    />
               )}
          </section>
     );
}
