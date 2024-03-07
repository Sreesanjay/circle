import { Button, Modal, FileInput } from "flowbite-react";
import {
     useState,
     ChangeEvent,
     Dispatch,
     SetStateAction,
     useEffect,
} from "react";
import ImageCrop from "../ImageCrop/ImageCrop";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteProfile, updateProfileImg } from "../../services/userService";

export default function UploadProfileImg({
     showUploadProfile,
     setshowUploadProfile,
}: {
     showUploadProfile: boolean;
     setshowUploadProfile: Dispatch<SetStateAction<boolean>>;
}) {
     const [isCrop, setisCrop] = useState(false);
     const dispatch = useAppDispatch();
     const [inputImg, setInputImg] = useState<string>("");
     // const { user } = useAppSelector((state) => state.auth);
     const { userProfile } = useAppSelector((state) => state.user);
     const [profileImg, setprofileImg] = useState<Blob | undefined>();

     useEffect(() => {
        setshowUploadProfile(false);
          if (profileImg) {
               const file = new File([profileImg], "cover_img", {
                    type: profileImg.type,
               });
               dispatch(updateProfileImg(file))
          }
     }, [profileImg, dispatch, setshowUploadProfile]);

     function onCloseModal() {
        setshowUploadProfile(false);
     }
     const buttonStyle = {
          width: "100%",
          height: "40px",
     };
     const DltButtonStyle = {
          width: "100%",
          height: "40px",
          backgroundColor: "red",
     };

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               onCloseModal();
               setInputImg(URL.createObjectURL(e.target.files[0]));
               setisCrop(true);
          }
     }
     function deleteCoverImg() {
          dispatch(deleteProfile());
          onCloseModal();
     }
     return (
          <>
               <ImageCrop
                    src={inputImg}
                    aspect={1 / 1}
                    isCrop={isCrop}
                    setisCrop={setisCrop}
                    setImage={setprofileImg}
               />
               <Modal
                    show={showUploadProfile}
                    size="md"
                    onClose={onCloseModal}
                    popup
               >
                    <Modal.Header />
                    <Modal.Body>
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                   Upload Profile Image
                              </h3>
                              <div>
                                   <div className="mb-2">
                                        <FileInput
                                             id="small-file-upload"
                                             sizing="sm"
                                             accept="image/*"
                                             style={buttonStyle}
                                             onChange={handleChange}
                                        />
                                   </div>
                              </div>
                              {userProfile?.profile_img && (
                                   <div className="w-full">
                                        <Button
                                             style={DltButtonStyle}
                                             onClick={deleteCoverImg}
                                        >
                                             Delete
                                        </Button>
                                   </div>
                              )}
                         </div>
                    </Modal.Body>
               </Modal>
          </>
     );
}
