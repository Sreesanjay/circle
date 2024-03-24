import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IPost } from "../../types";
import { ImageList, ImageListItem, Skeleton } from "@mui/material";
import PostModal from "../Post/PostModal";
import { useAppSelector } from "../../app/hooks";
export default function SavedSection() {
     const [savedPosts, setSavedPosts] = useState<IPost[] | []>([]);
     const { isSuccess } = useAppSelector((state) => state.post);
     const [isLoading, setIsLoading] = useState(false);
     const [openComments, setOpenComments] = useState(false);
     const [choosedPost, setChoosedPost] = useState<IPost | null>(null);

     function handleOpenPost(post: IPost) {
          setOpenComments(true);
          setChoosedPost(post);
     }

     useEffect(() => {
          (async () => {
               try {
                    setIsLoading(true);
                    const response = await API.get("/profile/saved-posts", {
                         withCredentials: true,
                    });
                    if (response.data) {
                         setIsLoading(false);
                         setSavedPosts(response.data.posts);
                    }
               } catch (error) {
                    setIsLoading(false);
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, [isSuccess]);
     return (
          <div>
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
                              {savedPosts &&
                                   savedPosts.map((post: IPost, index) => (
                                        <ImageListItem key={index} className="">
                                             <div
                                                  className="content p-2 shadow-md"
                                                  onClick={() =>
                                                       handleOpenPost(post)
                                                  }
                                             >
                                                  {post.type.includes(
                                                       "image"
                                                  ) ? (
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
               </section>
               {choosedPost && (
                    <PostModal
                         openModal={openComments}
                         setOpenModal={setOpenComments}
                         type={"SAVED"}
                         post={choosedPost}
                    />
               )}
          </div>
     );
}
