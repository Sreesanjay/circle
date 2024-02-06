import { useEffect } from "react";
import { useAppDispatch} from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import "./HomePage.css";
import Post from "../../components/Post/Post";
import Story from "../../components/Story/Story";

export default function HomePage() {
     const dispatch = useAppDispatch();
     useEffect(() => {
          (async () => {
               dispatch(getUserProfile());
          })();
     }, [dispatch]);


     return (
          <div className="flex flex-col">
               <HomeSidebar />

               <div className="section md:ms-80 w-full md:w-auto p-5 ">
                    <Story/>
                    <section className="posts">
                         <Post />
                    </section>
               </div>
          </div>
     );
}
