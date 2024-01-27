import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import { IUserList } from "../../types";
import "./ProfileView.css"
export default function ProfileView({ id }: { id: string }) {
     const [userProfile, setUserProfile] = useState<IUserList>();
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/users/get-user-profile/${id}`
                    );
                    if (response.data) {
                         setUserProfile(response.data.userProfile);
                    }
               } catch (error) {
                    toast("message");
               }
          })();
     }, [id]);

     return (
          <section className="profile-view">
               <section className="cover-photo">
                    {userProfile?.cover_img ? (
                         <img
                              src={userProfile?.cover_img}
                              className="object-cover"
                         />
                    ) : (
                         <div className="default-cover">
                              <img
                                   src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"
                                   alt=""
                              />
                         </div>
                    )}
               </section>
               <section className="header flex flex-col items-center sm:flex-row sm:items-end w-full border-solid border-2 pb-1">
                    <div className="left-area sm:ms-20 pb-2">
                         <div className="profile-img relative">
                              {userProfile?.profile_img ? (
                                   <img
                                        src={userProfile?.profile_img}
                                        alt=""
                                        className="w-full shadow-lg rounded-md"
                                   />
                              ) : (
                                   <img
                                        src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
                                        alt=""
                                        className="w-full shadow-lg rounded-md"
                                   />
                              )}
                         </div>
                         <h1 className="text-center mt-3 text-xl font-medium">
                              {userProfile?.username}
                         </h1>
                    </div>
               </section>
          </section>
     );
}
