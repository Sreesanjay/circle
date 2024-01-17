import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PopupModal from "../../components/Modal/PopupModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { getUserProfile } from "../../services/userService";
import Loader from "../../components/Loader/Loader";
import "./UserProfile.css";
import { resetUser } from "../../features/user/UserSlice";
import { Profile, PostIcon, SavedIcon, EditPenIcon } from "../../assets/Icons";
import CoverImageUpload from "../../components/Modal/CoverUpload";
import UploadProfileImg from "../../components/Modal/ProfileUpload";
// import { reset } from "../../features/auth/AuthSlice";
import FriendList from "../../components/FriendList/FriendList";
import CloseFriends from "../../components/CloseFriend/CloseFriends";
import ProfileSection from "../../components/Profile/ProfileSection";
import { getUserProfile } from "../../services/userService";

export default function UserProfilePage() {
     const dispatch = useAppDispatch();
     const { userProfile, isLoading, isError, isSuccess, errorMessage } =
          useAppSelector((state) => state.user);

     const [showModal, setShowModal] = useState(false);
     const [showUploadImage, setshowUploadImage] = useState(false);
     const [showUploadProfile, setshowUploadProfile] = useState(false);
     const [showEditProfImgIcon, setshowEditProfIcon] = useState("hidden");

     useEffect(() => {
          if (isError) {
               toast(errorMessage);
          } else if (isSuccess) {
               if (!userProfile) {
                    setShowModal(true);
               }
          }
          dispatch(resetUser());
     }, [isError, errorMessage, isSuccess, userProfile, dispatch]);
     useEffect(() => {
          (async () => {
               dispatch(getUserProfile());
          })();
     }, [dispatch]);
     // useEffect(() => {
     //      if (auth.isError || auth.isSuccess) {
     //           dispatch(reset());
     //      }
     // }, [user, auth, dispatch]);

     function updateProfile() {
          console.log("updateProfile");
     }

     return (
          <>
               <CoverImageUpload
                    showUploadImage={showUploadImage}
                    setshowUploadImage={setshowUploadImage}
               />
               <UploadProfileImg
                    showUploadProfile={showUploadProfile}
                    setshowUploadProfile={setshowUploadProfile}
               />
               <PopupModal
                    modalState={showModal}
                    message="Profile updation pending. update now?"
                    posText="Update Now"
                    negText="Later"
                    successCallback={updateProfile}
                    cancelCallback={null}
               />
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="user-profile flex flex-col items-center sm:items-start">
                         <section className="cover-photo">
                              <button
                                   onClick={() => setshowUploadImage(true)}
                                   className="add-cover-btn p-2 shadow-lg"
                              >
                                   <EditPenIcon size={25} />
                              </button>
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
                         <section className="header flex flex-col items-center sm:flex-row sm:items-end w-screen border-solid border-2 pb-1">
                              <div className="left-area sm:ms-20 pb-2">
                                   <div
                                        className="profile-img relative"
                                        onMouseOverCapture={() =>
                                             setshowEditProfIcon("block")
                                        }
                                        onMouseOutCapture={() =>
                                             setshowEditProfIcon("hidden")
                                        }
                                   >
                                        <button
                                             className={`edit-profileImg w-full h-full absolute top-0 ${showEditProfImgIcon}`}
                                             onClick={() =>
                                                  setshowUploadProfile(true)
                                             }
                                        >
                                             <EditPenIcon size={30} />
                                        </button>
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
                              <div className="right-nav grow ps-14 flex">
                                   <div className="flex flex-col items-center hover:bg-gray-100 rounded-md p-2 mt-2 me-9">
                                        <Profile size={28} />
                                        <h3 className="">Profile</h3>
                                   </div>
                                   <div className="flex flex-col items-center hover:bg-gray-100 rounded-md p-2 mt-2 me-9">
                                        <PostIcon size={28} />
                                        <h3 className="">Posts</h3>
                                   </div>
                                   <div className="flex flex-col items-center hover:bg-gray-100 rounded-md p-2 mt-2 me-9">
                                        <SavedIcon size={28} />
                                        <h3 className="">Saved</h3>
                                   </div>
                              </div>
                         </section>
                         <section className="profile-body bg-slate-50 w-screen px-6 md:grid md:grid-cols-12 pt-5">
                              <div className="left-section col-span-3 px-5 ">
                              <FriendList/>
                              <hr className="my-3"/>
                              <h1 className="font-medium text-center mb-3">Close Friends</h1>
                                   <CloseFriends/>
                              </div>
                              <div className="right-section col-span-9">
                                   <ProfileSection/>
                              </div>
                         </section>
                    </section>
               )}
          </>
     );
}
