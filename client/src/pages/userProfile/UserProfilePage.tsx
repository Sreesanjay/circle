import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PopupModal from "../../components/Modal/PopupModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
import Loader from "../../components/Loader/Loader";
export default function UserProfilePage() {
     const dispatch = useAppDispatch();
     const { userProfile, isLoading, isError, isSuccess, errorMessage } =
          useAppSelector((state) => state.user);

     const [showModal, setShowModal] = useState(false);
     useEffect(() => {
          (async () => {
               dispatch(getUserProfile());
          })();
     }, [dispatch]);
     useEffect(() => {
          if (isError) {
               toast(errorMessage);
          }
     }, [isError, errorMessage]);
     useEffect(() => {
          if (isSuccess) {
               if (!userProfile) {
                    setShowModal(true);
               }
          }
     }, [isSuccess, userProfile]);
     function updateProfile() {
          console.log("updateProfile");
     }
     return (
          <>
               {showModal && (
                    <PopupModal
                         modalState={true}
                         message="Profile updation pending. update now?"
                         posText="Update Now"
                         negText="Later"
                         successCallback={updateProfile}
                         cancelCallback={null}
                    />
               )}
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="user-profile">
                         <div className="cover-photo">
                              {/* <img src="" alt="" /> */}
                              <h1>user profile</h1>
                         </div>
                    </section>
               )}
          </>
     );
}
