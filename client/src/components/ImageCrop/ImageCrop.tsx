import { Dispatch, SetStateAction, useRef, useState, FC } from "react";
import { Button, Modal } from "flowbite-react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


// import Box from "@mui/material/Box";
// import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import PrintIcon from "@mui/icons-material/Print";
// import ShareIcon from "@mui/icons-material/Share";
// import CropIcon from '@mui/icons-material/Crop';

interface ICropDemo {
     src: string;
     aspect: number | undefined;
     isCrop: boolean;
     setisCrop: Dispatch<SetStateAction<boolean>>;
     setImage: Dispatch<SetStateAction<Blob | undefined>>;
}
const CropDemo: FC<ICropDemo> = ({
     src,
     aspect,
     isCrop,
     setisCrop,
     setImage,
}) => {
     const buttonStyle = {
          width: "150px",
          height: "40px",
     };

     // const actions = [
     //      { icon: <FileCopyIcon />, name: "Copy" },
     //      { icon: <SaveIcon />, name: "Save" },
     //      { icon: <PrintIcon />, name: "Print" },
     //      { icon: <ShareIcon />, name: "Share" },
     // ];

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
                    }, "image/jpeg");
               }
          });
     };

     async function handleCrop() {
          if (completedCrop && imgRef.current) {
               const croppedImageBlob = await getCroppedImg(
                    imgRef.current,
                    completedCrop
               );
               setImage(croppedImageBlob);
               setisCrop(false);
          }
     }
     function cancelCrop() {
          setisCrop(false);
     }

     return (
          <>
               <Modal show={isCrop} onClose={() => setisCrop(false)}>
                    <Modal.Header>Image crop</Modal.Header>
                    <Modal.Body>
                         <div className="space-y-6">
                              <ReactCrop
                                   crop={crop}
                                   onChange={(_, percentCrop) =>
                                        setCrop(percentCrop)
                                   }
                                   onComplete={(c) => setCompletedCrop(c)}
                                   aspect={aspect && aspect}
                              >
                                   <img src={src} alt="" ref={imgRef} className="h-96" />
                              </ReactCrop>
                         </div>
                    </Modal.Body>
                    <Modal.Footer>
                         <div className="w-full flex gap-5">
                              <Button
                                   onClick={() => handleCrop()}
                                   style={buttonStyle}
                              >
                                   Crop
                              </Button>
                              <Button
                                   color="gray"
                                   onClick={() => cancelCrop()}
                                   style={buttonStyle}
                              >
                                   Decline
                              </Button>
                              <div className="absolute right-0 bottom-0">
                                   {/* <Box
                                        sx={{
                                             transform: "translateZ(0px)",
                                             flexGrow: 1,
                                        }}
                                        
                                   >
                                        <SpeedDial
                                             ariaLabel="SpeedDial basic example"
                                             sx={{
                                                  position: "absolute",
                                                  bottom: 16,
                                                  right: 16,
                                             }}
                                             icon={<CropIcon />}
                                        >
                                             {actions.map((action) => (
                                                  <SpeedDialAction
                                                       key={action.name}
                                                       icon={action.icon}
                                                       tooltipTitle={
                                                            action.name
                                                       }
                                                  />
                                             ))}
                                        </SpeedDial>
                                   </Box> */}
                              </div>
                         </div>
                    </Modal.Footer>
               </Modal>
          </>
     );
};

export default CropDemo;
