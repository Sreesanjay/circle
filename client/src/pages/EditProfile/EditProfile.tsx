import { useState, ChangeEvent, useEffect } from "react";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import UploadProfileImg from "../../components/Modal/ProfileUpload";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import validate from "../../util/formValidate";
import "./EditProfile.css";
import { EditPenIcon } from "../../assets/Icons";
import { Label, Radio, TextInput, Textarea } from "flowbite-react";
import { updateProfile } from "../../services/userService";

export default function EditProfile() {
     const dispatch = useAppDispatch()
     const { userProfile } = useAppSelector((state) => state.user);
     const [showProfileUpload, setshowProfileUpload] = useState(false);
     const [showEditProfImgIcon, setshowEditProfIcon] = useState("hidden");
     const [isSubmit, setisSubmit] = useState(false);
     type IProfileInp = {
          username: string;
          fullname: string;
          gender: string;
          bio: string;
     };
     const [formData, setFormData] = useState<IProfileInp>({
          username:userProfile?.username ? userProfile?.username : "",
          fullname: userProfile?.fullname || "",
          gender: userProfile?.gender || "",
          bio: userProfile?.bio || "",
     });
     const [formError, setformError] = useState({
          username: "",
          bio: "",
     });
     function handleChange(
          e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
     ) {
          console.log(e.target.value);
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     }

     function handleSubmit() {
          setformError({
               ...formError,
               username: validate("username", formData.username),
               bio: validate("bio", formData.bio),
          });
          setisSubmit(true);
     }

     useEffect(() => {
          if (isSubmit) {
               if (!formError.username && !formError.bio) {
                    dispatch(updateProfile);
               }
          }
     }, [isSubmit, formData, formError,dispatch]);
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
                                        className={`edit-profileImg bg-gray-100 w-full h-full absolute top-0 ${showEditProfImgIcon}`}
                                        onClick={() =>
                                             setshowProfileUpload(true)
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
                         </div>
                         <form className="form col-span-4 p-5">
                              <div>
                                   <div className="mb-2 block">
                                        <Label
                                             htmlFor="fullname"
                                             value="Your Full Name"
                                        />
                                   </div>
                                   <TextInput
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        onChange={handleChange}
                                        value={userProfile?.fullname}
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
                                   {formError.username && (
                                        <span className="text-sm text-red-600">
                                             {formError.username}
                                        </span>
                                   )}
                                   <TextInput
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder={
                                             userProfile?.username
                                                  ? userProfile?.username
                                                  : "Enter the new username"
                                        }
                                        required
                                        className="text-field"
                                   />
                              </div>
                              <div className="mt-5">
                                   <div className="mb-2 block">
                                        <Label
                                             htmlFor="gender"
                                             value="Gender"
                                        />
                                   </div>

                                   <div className="w-64">
                                        <div className="flex items-center gap-2">
                                             <Radio
                                                  id="male"
                                                  name="gender"
                                                  onChange={handleChange}
                                                  defaultChecked ={formData.gender==='Male'}
                                                  value="Male"
                                             />
                                             <Label htmlFor="united-state">
                                                  Male
                                             </Label>
                                             <Radio
                                                  id="male"
                                                  name="gender"
                                                  value="Female"
                                                  defaultChecked ={formData.gender==='Female'}
                                                  onChange={handleChange}
                                             />
                                             <Label htmlFor="united-state">
                                                  Female
                                             </Label>
                                             <Radio
                                                  id="male"
                                                  name="gender"
                                                  value="Other"
                                                  defaultChecked ={formData.gender==='Other'}
                                                  onChange={handleChange}
                                             />
                                             <Label htmlFor="united-state">
                                                  Other
                                             </Label>
                                        </div>
                                   </div>
                              </div>

                              <div className="mt-5">
                                   <div className="mb-2 block">
                                        <Label htmlFor="bio" value="Bio" />
                                   </div>
                                   {formError.bio && (
                                        <span className="text-sm text-red-600">
                                             {formError.bio}
                                        </span>
                                   )}
                                   <Textarea
                                        id="bio"
                                        style={{ maxWidth: "500px" }}
                                        placeholder="Add your bio"
                                        name="bio"
                                        required
                                        onChange={handleChange}
                                        value={userProfile?.bio}
                                        rows={4}
                                   />
                              </div>
                              <div
                                   className="btn-group flex justify-end mt-5"
                                   style={{ maxWidth: "500px" }}
                              >
                                   <button
                                        className="button  bg-red-600 p-2 px-5 rounded-lg"
                                        type="reset"
                                        onClick={()=>setformError({
                                             username: "",
                                             bio: "",
                                        })}
                                   >
                                        Reset
                                   </button>
                                   <button
                                        className="button bg-primary p-2 px-5 rounded-lg ms-2"
                                        type="button"
                                        onClick={() => handleSubmit()}
                                   >
                                        Update
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </section>
     );
}
