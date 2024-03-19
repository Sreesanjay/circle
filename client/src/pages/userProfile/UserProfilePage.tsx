import { lazy, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TiStarburst } from "react-icons/ti";
import PopupModal from "../../components/Modal/PopupModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { getUserProfile } from "../../services/userService";
import Loader from "../../components/Loader/Loader";
import "./UserProfile.css";

import {
     Profile,
     PostIcon,
     SavedIcon,
     EditPenIcon,
     // AddIcon,
} from "../../assets/Icons";
import CoverImageUpload from "../../components/Modal/CoverUpload";
import UploadProfileImg from "../../components/Modal/ProfileUpload";
import FriendList from "../../components/FriendList/FriendList";
import CloseFriends from "../../components/CloseFriend/CloseFriends";
import ProfileSection from "../../components/Profile/ProfileSection";
import { resetUser } from "../../features/user/userSlice";
import { getUserProfile } from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";
const PostSection = lazy(
     () => import("../../components/PostSection/PostSection")
);
const SavedSection = lazy(
     () => import("../../components/SavedSection/SavedSection")
);

export default function UserProfilePage() {
     const dispatch = useAppDispatch();
     const { userProfile, isLoading, isError, isSuccess, errorMessage } =
          useAppSelector((state) => state.user);
     const navigate = useNavigate();

     const [showModal, setShowModal] = useState(false);
     const [showUploadImage, setshowUploadImage] = useState(false);
     const [showUploadProfile, setshowUploadProfile] = useState(false);
     const [showEditProfImgIcon, setshowEditProfIcon] = useState("hidden");
     const [content, setContent] = useState("PROFILE");

     const location = useLocation();

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
          (() => {
               dispatch(getUserProfile());
          })();
     }, [dispatch]);

     function updateProfile() {
          toast.success("profile updated");
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
                         <section className="header bg-gray-900 flex flex-col items-center sm:flex-row sm:items-end w-full pb-1 shadow-2xl">
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
                                   <div className="flex justify-center items-center gap-2">
                                        <h1 className="text-center mt-3 text-xl font-medium">
                                             {userProfile?.username}
                                        </h1>
                                        {userProfile?.isVerified && (
                                             <p className="text-blue-600 text-xl">
                                                  <TiStarburst />
                                             </p>
                                        )}
                                   </div>
                              </div>
                              <div className="right-nav grow ps-7 sm:ps-14 flex">
                                   <div
                                        className={`flex flex-col items-center  hover:bg-gray-800 rounded-md p-2 mt-2 sm:me-9 ${location.pathname === '/profile' && 'bg-gray-800'}`}
                                        onClick={() => {
                                             navigate("/profile");
                                             setContent("PROFILE");
                                        }}
                                   >
                                        <Profile size={28} />
                                        <h3 className="">Profile</h3>
                                   </div>
                                   <div
                                        className={`flex flex-col items-center hover:bg-gray-700 rounded-md p-2 mt-2 sm:me-9 ${location.pathname === '/profile/post' && 'bg-gray-800'} `}
                                        onClick={() => {
                                             navigate("/profile/post");
                                             setContent("POST");
                                        }}
                                   >
                                        <PostIcon size={28} />
                                        <h3 className="">Posts</h3>
                                   </div>
                                   <div
                                        className={`flex flex-col items-center hover:bg-gray-700 rounded-md p-2 mt-2 sm:me-9  ${location.pathname === '/profile/saved-post' && 'bg-gray-800'}`}
                                        onClick={() => {
                                             navigate("/profile/saved-post");
                                             setContent("SAVED");
                                        }}
                                   >
                                        <SavedIcon size={28} />
                                        <h3 className="">Saved</h3>
                                   </div>
                              </div>
                         </section>
                         <section className="profile-body min-h-screen w-full md:grid md:grid-cols-12">
                              <div className="left-section col-span-3 px-5 bg-gray-800 shadow-xl py-5">
                                   <FriendList />
                                   <hr className="my-3" />
                                   <div className="flex items-center mb-3 justify-between">
                                        <h1 className="font-medium text-center">
                                             Close Friends
                                        </h1>
                                   </div>
                                   <CloseFriends />
                              </div>
                              <div className="right-section col-span-9 pt-5 px-3">
                                   {content === "PROFILE" && <ProfileSection />}
                                   {content === "POST" && <PostSection />}
                                   {content === "SAVED" && <SavedSection />}
                              </div>
                         </section>
                    </section>
               )}
          </>
     );
}
