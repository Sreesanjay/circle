import { Button, Modal, FileInput } from "flowbite-react";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import ImageCrop from "../ImageCrop/ImageCrop";

export default function UploadImage({
     setcoverImgae,
}: {
     setcoverImgae: Dispatch<SetStateAction<Blob | undefined>>;
}) {
     const [openModal, setOpenModal] = useState(true);
     const [isCrop, setisCrop] = useState(false);
     const [inputImg, setInputImg] = useState<string>("")

     function onCloseModal() {
          setOpenModal(false);
     }
     const buttonStyle = {
          width: "100%",
          height: "40px",
     };

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               onCloseModal();
               setInputImg(URL.createObjectURL(e.target.files[0]));
               setisCrop(true);
          }
     }
     return (
          <>
               {isCrop && <ImageCrop src={inputImg} aspect={16/9}  setcoverImgae={setcoverImgae}/>}
               <Modal show={openModal} size="md" onClose={onCloseModal} popup>
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
                              <div className="w-full">
                                   <Button style={buttonStyle}>Upload</Button>
                              </div>
                         </div>
                    </Modal.Body>
               </Modal>
          </>
     );
}
