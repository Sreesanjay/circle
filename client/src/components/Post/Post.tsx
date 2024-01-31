import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts } from "../../services/postService";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import PostCard from "./PostCard";
import { IPost } from "../../types";
import { postReset } from "../../features/post/postSlice";

export default function Post() {
     const dispatch = useAppDispatch();
     const { posts, errorMessage, isLoading, isError,isSuccess } = useAppSelector(
          (state) => state.post
     );
     useEffect(() => {
          dispatch(getPosts());
     }, [dispatch]);

     useEffect(() => {
          if (isError) {
               toast(errorMessage);
          }
          dispatch(postReset())
     }, [isError, errorMessage,isSuccess,dispatch]);
     return (
          <div className="mt-5">
               {posts &&
                    posts.map((item:IPost, index) => {
                         return <PostCard post={item} key={index} />;
                    })}
               {isLoading && <Loader />}
          </div>
     );
}
