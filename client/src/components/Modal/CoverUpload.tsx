import { Button, Modal, FileInput } from "flowbite-react";
import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import ImageCrop from "../ImageCrop/ImageCrop";
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import {deleteCover, updateCoverImg} from "../../services/userService"

export default function UploadCoverImage({
     showUploadImage,
     setshowUploadImage,
}: {
     showUploadImage: boolean;
     setshowUploadImage: Dispatch<SetStateAction<boolean>>;
}) {
     const dispatch = useAppDispatch()
     const { userProfile } = useAppSelector((state) => state.user);
     const [isCrop, setisCrop] = useState(false);
     const [inputImg, setInputImg] = useState<string>("");
     const [coverImgae, setcoverImgae] = useState<Blob | undefined>();


     useEffect(() => {
          setshowUploadImage(false);
          if (coverImgae) {
               const file = new File([coverImgae], "cover_img", {
                    type: coverImgae.type,
               });
               dispatch(updateCoverImg(file));
          }
     }, [coverImgae, dispatch,setshowUploadImage]);

     function onCloseModal() {
          setshowUploadImage(false);
     }
     const buttonStyle = {
          width: "100%",
          height: "40px",
     };
     const DltButtonStyle = {
          width: "100%",
          height: "40px",
          backgroundColor:"red"
     };

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               onCloseModal();
               setInputImg(URL.createObjectURL(e.target.files[0]));
               setisCrop(true);
          }
     }
     function deleteCoverImg() {
          dispatch(deleteCover())
          onCloseModal();
     }
     return (
          <>
               <ImageCrop
                    src={inputImg}
                    aspect={16 / 9}
                    isCrop={isCrop}
                    setisCrop={setisCrop}
                    setImage={setcoverImgae}
               />
               <Modal
                    show={showUploadImage}
                    size="md"
                    onClose={onCloseModal}
                    popup
               >
                    <Modal.Header />
                    <Modal.Body>
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                   Upload Cover Image
                              </h3>
                              <div>
                                   <div className="mb-2">
                                        <FileInput
                                             id="small-file-upload"
                                             sizing="sm"
                                             style={buttonStyle}
                                             onChange={handleChange}
                                        />
                                   </div>
                              </div>
                              {userProfile?.cover_img && (
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
