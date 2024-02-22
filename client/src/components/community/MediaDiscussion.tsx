import { Modal } from "flowbite-react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { createDiscussion } from "../../services/communityService";
import { toast } from "react-toastify";
import { IDiscussion } from "../../types";

export default function MediaDiscussion({
     showUploadImage,
     setshowUploadImage,
     community,
     setDiscussion,
}: {
     showUploadImage: boolean;
     setshowUploadImage: Dispatch<SetStateAction<boolean>>;
     community: string;
     setDiscussion: Dispatch<SetStateAction<IDiscussion[]>>;
}) {
     const [inputImg, setInputImg] = useState<File | null>(null);
     const [preview, setPreview] = useState<string | null>(null);
     const [caption, setCaption] = useState<string>("");
     const { user } = useAppSelector((state) => state.auth);

     useEffect(() => {
          if (inputImg) {
               setPreview(URL.createObjectURL(inputImg));
          }
     }, [inputImg]);

     function onCloseModal() {
          setInputImg(null);
          setPreview(null);
          setshowUploadImage(false);
     }

     async function handleSubmit() {
          if (inputImg && user && community) {
               const filetype = inputImg.type.includes("image")
                    ? "IMAGE"
                    : "VIDEO";
               const payload = {
                    user_id: user?._id,
                    community_id: community,
                    content: inputImg,
                    caption: caption,
                    content_type: "MEDIA",
                    file_type: filetype,
               };
               const response = await createDiscussion(payload);
               if (response.discussion) {
                    toast.success("new discussion added");
                    setDiscussion((current) => [
                         response.discussion,
                         ...current,
                    ]);
                    setInputImg(null);
                    setPreview(null);
                    setshowUploadImage(false);
               }
          }
     }
     return (
          <>
               <Modal
                    show={showUploadImage}
                    size="lg"
                    onClose={onCloseModal}
                    popup
               >
                    <Modal.Body className="bg-gray-900 border rounded-md">
                         <Modal.Header />
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-white">
                                   Upload a image or video
                              </h3>
                              <div>
                                   <div className="preview p-5">
                                        {preview &&
                                             (inputImg?.type.includes(
                                                  "image"
                                             ) ? (
                                                  <img
                                                       src={preview}
                                                       alt=""
                                                       className="h-56"
                                                  />
                                             ) : (
                                                  <video
                                                       src={preview}
                                                       className="h-56"
                                                       autoPlay
                                                  ></video>
                                             ))}
                                   </div>
                                   <input
                                        type="file"
                                        name="media"
                                        className="bg-gray-700 w-full rounded-md"
                                        onChange={(e) => {
                                             if (e.target.files) {
                                                  setInputImg(
                                                       e.target.files[0]
                                                  );
                                             }
                                        }}
                                   />
                                   <div className="grp my-5">
                                        <label
                                             htmlFor=""
                                             className="text-white"
                                        >
                                             Caption
                                        </label>
                                        <textarea
                                             className="w-full  bg-gray-700 rounded-md my-2 text-white"
                                             onChange={(e) =>
                                                  setCaption(e.target.value)
                                             }
                                        ></textarea>
                                   </div>
                                   <div className="btn-group">
                                        <button
                                             className="clear bg-red-600 px-4 py-2 rounded-md text-white"
                                             onClick={() => {
                                                  setInputImg(null);
                                                  setPreview(null);
                                             }}
                                        >
                                             Clear
                                        </button>
                                        <button
                                             className="clear ms-3 bg-primary px-4 py-2 rounded-md text-white"
                                             onClick={handleSubmit}
                                        >
                                             Submit
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </Modal.Body>
               </Modal>
          </>
     );
}
