import { Button, Modal, FileInput } from "flowbite-react";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

export default function UploadImage({
     setcoverImgae,
}: {
     setcoverImgae : Dispatch<SetStateAction<string>> 
}) {
     const [openModal, setOpenModal] = useState(true);

     function onCloseModal() {
          setOpenModal(false);
     }
     const buttonStyle = {
          width: "100%",
          height: "40px",
     };

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               onCloseModal()
               console.log(e.target.files[0])
            //    setcoverImgae(e.target.files[0]);
          }
     }
     return (
          <>
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
