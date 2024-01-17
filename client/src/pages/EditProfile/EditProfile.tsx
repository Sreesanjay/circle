import { useState } from "react";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import UploadProfileImg from "../../components/Modal/ProfileUpload";
import { useAppSelector } from "../../app/hooks";
import "./EditProfile.css";
import { EditPenIcon } from "../../assets/Icons";
import { Label, TextInput } from "flowbite-react";

export default function EditProfile() {
     const { user } = useAppSelector((state) => state.auth);
     const { userProfile } = useAppSelector((state) => state.user);
     const [showProfileUpload, setshowProfileUpload] = useState(false);
     const [showEditProfImgIcon, setshowEditProfIcon] = useState("hidden");

     return (
          <section className="manage-account flex">
               <ManageAccSidebar />
               <div className="edit-profile p-3 w-screen">
                    <h1 className="text-lg font-medium mb-5">Edit profile</h1>
                    <div className="container grid grid-cols-6">
                         <div className="profile-change col-span-2 p-5">
                              <UploadProfileImg
                                   showUploadProfile={showProfileUpload}
                                   setshowUploadProfile={setshowProfileUpload}
                              />
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
                                        className={`edit-profileImg bg-gray-50 w-full h-full absolute top-0 ${showEditProfImgIcon}`}
                                        onClick={() =>
                                             setshowProfileUpload(true)
                                        }
                                   >
                                        <EditPenIcon size={30} />
                                   </button>
                                   {user?.profile_img ? (
                                        <img
                                             src={user?.profile_img}
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
                         </div>
                         <div className="form col-span-4 p-5">
                              <div>
                                   <div className="mb-2 block">
                                        <Label
                                             htmlFor="email1"
                                             value="Your Full Name"
                                        />
                                   </div>
                                   <TextInput
                                        id="email1"
                                        type="text"
                                        placeholder="Enter your full name"
                                        required
                                        className="text-field "
                                   />
                              </div>
                              <div className="mt-5">
                                   <div className="mb-2 block">
                                        <Label
                                             htmlFor="username"
                                             value="User name"
                                        />
                                   </div>
                                   <TextInput
                                        id="username"
                                        type="text"
                                        placeholder={user?.username ? user?.username :"Enter the new username"}
                                        required
                                        className="text-field"
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}
