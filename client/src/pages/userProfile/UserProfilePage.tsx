import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import PopupModal from "../../components/Modal/PopupModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUserProfile, updateCoverImg } from "../../services/userService";
import Loader from "../../components/Loader/Loader";
import "./UserProfile.css";
import { resetUser } from "../../features/user/UserSlice";
import { Profile, PostIcon, SavedIcon } from "../../assets/Icons";
import ImageUpload from "../../components/Modal/ImageUpload";

export default function UserProfilePage() {
     const dispatch = useAppDispatch();
     const { userProfile, isLoading, isError, isSuccess, errorMessage } =
          useAppSelector((state) => state.user);

     const { user } = useAppSelector((state) => state.auth);

     const [showModal, setShowModal] = useState(false);
     const [showUploadImage, setshowUploadImage] = useState(false);
     const [coverImgae, setcoverImgae] = useState<Blob | undefined>();

     useEffect(() => {
          (async () => {
               dispatch(getUserProfile());
          })();
     }, [dispatch]);

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

     //cover-imgage update
     useEffect(() => {
          setshowUploadImage(false)
          if(coverImgae){
               const file = new File([coverImgae] , "cover_img", {type : coverImgae.type})
               dispatch(updateCoverImg(file))

          }
     }, [coverImgae,dispatch]);

     function updateProfile() {
          console.log("updateProfile");
     }

     return (
          <>
               {showUploadImage && (
                    <ImageUpload setcoverImgae={setcoverImgae} />
               )}
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
                    <section className="user-profile flex flex-col items-center sm:items-start">
                         <section className="cover-photo">
                              {userProfile?.cover_img ? (
                                   <img src={userProfile?.cover_img} />
                              ) : (
                                   <div className="default-cover">
                                        <Button
                                             variant="contained"
                                             onClick={() =>
                                                  setshowUploadImage(true)
                                             }
                                             className="add-cover-btn"
                                        >
                                             <CloudUploadIcon className="me-2" />{" "}
                                             cover photo
                                        </Button>
                                        <img
                                             src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"
                                             alt=""
                                        />
                                   </div>
                              )}
                         </section>
                         <section className="header flex flex-col items-center sm:flex-row sm:items-end w-screen border-solid border-2 pb-1">
                              <div className="left-area sm:ms-20 pb-2">
                                   <div className="profile-img">
                                        <img src="" alt="" />
                                   </div>
                                   <h1 className="text-center mt-3 text-xl font-medium">
                                        {user?.username}
                                   </h1>
                              </div>
                              <div className="right-nav grow ps-10 flex">
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
                    </section>
               )}
          </>
     );
}
