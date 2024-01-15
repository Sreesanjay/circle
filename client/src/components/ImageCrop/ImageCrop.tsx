import { Dispatch, SetStateAction, useRef, useState, FC } from "react";
import { Button, Modal } from "flowbite-react";
import ReactCrop, { Crop, PixelCrop} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ICropDemo {
     src: string;
     aspect : number | undefined;
     setcoverImgae: Dispatch<SetStateAction<Blob | undefined>>;
}
const CropDemo: FC<ICropDemo> = ({ src, aspect, setcoverImgae }) => {
     const [openModal, setOpenModal] = useState(true);
     const buttonStyle = {
          width: "150px",
          height: "40px",
     };

     const [crop, setCrop] = useState<Crop>();
     const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
     const imgRef = useRef<HTMLImageElement>(null);

     const getCroppedImg = async (
          image: HTMLImageElement,
          crop: PixelCrop
     ): Promise<Blob> => {
          return new Promise((resolve) => {
               const canvas = document.createElement("canvas");
               const scaleX = image.naturalWidth / image.width;
               const scaleY = image.naturalHeight / image.height;
               canvas.width = crop.width!;
               canvas.height = crop.height!;
               const ctx = canvas.getContext("2d");

               if (ctx) {
                    ctx.drawImage(
                         image,
                         crop.x! * scaleX,
                         crop.y! * scaleY,
                         crop.width! * scaleX,
                         crop.height! * scaleY,
                         0,
                         0,
                         crop.width!,
                         crop.height!
                    );
                    canvas.toBlob((blob) => {
                         if (blob) {
                              resolve(blob);
                         }
                    }, "image/jpeg"); // You can change the second argument to adjust the format (e.g., "image/png")
               }
          });
     };

     async function handleCrop() {
          if (completedCrop && imgRef.current) {
               const croppedImageBlob = await getCroppedImg(
                    imgRef.current,
                    completedCrop
               );
               setcoverImgae(croppedImageBlob);
          }
          setOpenModal(false);
     }

     return (
          <>
               <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Terms of Service</Modal.Header>
                    <Modal.Body>
                         <div className="space-y-6">
                              <ReactCrop
                                   crop={crop}
                                   onChange={(_, percentCrop) =>
                                        setCrop(percentCrop)
                                   }
                                   onComplete={(c) => setCompletedCrop(c)}
                                   aspect={aspect}
                              >
                                   <img src={src} alt="" ref={imgRef} />
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
};

export default CropDemo;
