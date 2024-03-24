import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts } from "../../services/postService";
import { toast } from "react-toastify";
import PostCard from "./PostCard";
import { IPost } from "../../types";
import { postReset, setPagination } from "../../features/post/postSlice";
import { Skeleton } from "@mui/material";

export default function Post() {
     const dispatch = useAppDispatch();
     // const pagination = useRef<Date | null>(null);
     const postContainerRef = useRef<HTMLDivElement | null>(null);
     const { posts, pagination, errorMessage, isLoading, isError, isSuccess } =
          useAppSelector((state) => state.post);
     useEffect(() => {
          if (pagination == null && posts.length === 0) {
               dispatch(getPosts(null));
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     useEffect(() => {
          if (isError) {
               toast(errorMessage);
          }
          if (isSuccess) {
               if (pagination !== posts[posts.length - 2]?.createdAt) {
                    if (posts[posts.length - 2]?.is_boosted) {
                         dispatch(
                              setPagination(posts[posts.length - 2]?.createdAt)
                         );
                    } else {
                         dispatch(
                              setPagination(posts[posts.length - 1]?.createdAt)
                         );
                    }
               }
          }
          dispatch(postReset());
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [isError, errorMessage, isSuccess, dispatch, posts]);

     useEffect(() => {
          const handleScroll = () => {
               const bodyHeight = document.body.clientHeight;
               const scrollHeight = window.scrollY;
               const innerHeight = window.innerHeight;
               const isAtBottom = bodyHeight - (scrollHeight + innerHeight) < 1;
               if (isAtBottom) {
                    dispatch(getPosts(pagination));
               }
          };
          window.addEventListener("scroll", handleScroll);
          return () => {
               window.removeEventListener("scroll", handleScroll);
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [dispatch, pagination]);

     return (
          <div
               className="mt-3 post-container overflow-y-auto"
               ref={postContainerRef}
          >
               {posts.length !== 0 ? (
                    posts &&
                    posts.map((item: IPost, index) => {
                         return <PostCard post={item} key={index} />;
                    })
               ) : (
                    <div className="w-full pt-24 flex justify-center items-center flex-col mb-20">
                         <img
                              src="https://png.pngtree.com/svg/20161030/nodata_800056.png"
                              className="w-40"
                              alt=""
                         />
                         <h1 className="text-gray-400">No Posts Yet</h1>
                    </div>
               )}
               {isLoading && (
                    <>
                         <Skeleton
                              variant="rectangular"
                              sx={{ maxWidth: "100%" }}
                         />

                         {/* For other variants, adjust the size with `width` and `height` */}
                         <Skeleton variant="circular" width={60} height={60} />
                         <Skeleton
                              variant="rectangular"
                              sx={{ maxWidth: "100%" }}
                         />
                         <Skeleton variant="rounded" sx={{ maxWidth: "100%" }} />
                    </>
               )}
          </div>
     );
}
