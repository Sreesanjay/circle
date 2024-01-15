import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "flowbite-react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function CropDemo({
     src,
     setcoverImgae,
}: {
     src: string | undefined;
     setcoverImgae: Dispatch<SetStateAction<Blob | undefined>>;
}) {

     const [crop, setCrop] = useState<Crop>();
     const [openModal, setOpenModal] = useState(false);
    
     const buttonStyle = {
          width: "150px",
          height: "40px",
     };

     function handleCrop() {
          if (crop) {
               const canvas = document.createElement("canvas");
               const context = canvas.getContext("2d");
               if (context) {
                    context.fillRect(crop.x, crop.y, crop.width, crop.height);
                    canvas.toBlob((blob) => {
                        if(blob){
                         setcoverImgae(blob);
                        }
                    });
               }
          }
          setOpenModal(false);
     }
     return (
          <>
               <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
               <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Terms of Service</Modal.Header>
                    <Modal.Body>
                         <div className="space-y-6">
                              <ReactCrop
                                   crop={crop}
                                   onChange={(c) => setCrop(c)}
                              >
                                   <img src={src} />
                              </ReactCrop>
                         </div>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button
                              onClick={() => handleCrop()}
                              style={buttonStyle}
                         >
                              I accept
                         </Button>
                         <Button
                              color="gray"
                              onClick={() => handleCrop()}
                              style={buttonStyle}
                         >
                              Decline
                         </Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
