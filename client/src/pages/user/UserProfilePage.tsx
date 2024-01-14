import { useEffect, useState } from "react";
import API from "../../api";
// import { useAppSelector } from "../../app/hooks"
export default function UserProfilePage() {
     // const {user} = useAppSelector((state) => state.auth);
     const [userProfile, setuserProfile] = useState(null)
     useEffect(() => {
          (async () => {
               try {
                    const userDetails = await API.get("/profile", {
                         withCredentials: true,
                    });
                    setuserProfile(userDetails.data)
               } catch (err) {
                    console.log(err);
               }
          })();
     }, []);
     return (
          <section className="user-profile">
               <div className="cover-photo">
                    <img src="" alt="" />
               </div>
          </section>
     );
}
