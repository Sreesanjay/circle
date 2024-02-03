import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts } from "../../services/postService";
import { toast } from "react-toastify";
import PostCard from "./PostCard";
import { IPost } from "../../types";
import { postReset } from "../../features/post/postSlice";
import { Skeleton } from "@mui/material";

export default function Post() {
     const dispatch = useAppDispatch();
     const pagination = useRef(0);
     const postContainerRef = useRef<HTMLDivElement | null>(null);
     const { posts, errorMessage, isLoading, isError, isSuccess } =
          useAppSelector((state) => state.post);

     useEffect(() => {
          console.log("isLoading", isLoading);
     }, [isLoading]);
     useEffect(() => {
          dispatch(getPosts(pagination.current));
          pagination.current = pagination.current + 1;
     }, [dispatch]);

     useEffect(() => {
          if (isError) {
               toast(errorMessage);
          }
          dispatch(postReset());
     }, [isError, errorMessage, isSuccess, dispatch]);

     useEffect(() => {
          const handleScroll = () => {
               const bodyHeight = document.body.clientHeight; // Visible height
               const scrollHeight = window.scrollY; // Total scrollable height
               const scrollTop = window.scrollY;
               const isAtBottom = scrollTop + scrollHeight > bodyHeight;
               if (isAtBottom) {
                    dispatch(getPosts(pagination.current));
                    pagination.current = pagination.current + 1;
               }
          };
          window.addEventListener("scroll", handleScroll);
          return () => {
               window.removeEventListener("scroll", handleScroll);
          };
     }, [dispatch]);

     return (
          <div
               className="mt-5 post-container overflow-y-auto"
               ref={postContainerRef}
          >
               {posts &&
                    posts.map((item: IPost, index) => {
                         return <PostCard post={item} key={index} />;
                    })}
               {isLoading && (
                    <>
                         <Skeleton variant="rectangular" sx={{maxWidth:'50%'}} />

                         {/* For other variants, adjust the size with `width` and `height` */}
                         <Skeleton variant="circular" width={60} height={60} />
                         <Skeleton
                              variant="rectangular"
                              sx={{maxWidth:'50%'}}
                         />
                         <Skeleton variant="rounded" sx={{maxWidth:'50%'}}/>
                    </>
               )}
          </div>
     );
}