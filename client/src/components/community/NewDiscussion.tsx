import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { ICommunity, IDiscussion } from "../../types";
import { createDiscussion } from "../../services/communityService";
import { toast } from "react-toastify";

export default function NewDiscussion({
     openModal,
     setOpenModal,
     community,
     setDiscussion,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     community: ICommunity | null;
     setDiscussion: Dispatch<SetStateAction<IDiscussion[]>>;
}) {
     const { user } = useAppSelector((state) => state.auth);
     const [content, setContent] = useState("");
     async function onSubmit() {
          if (content && user && community) {
               const payload = {
                    user_id: user?._id,
                    community_id: community?._id,
                    content,
                    content_type: "TEXT",
               };
               const response = await createDiscussion(payload);
               if (response.discussion) {
                    toast.success("new discussion added");
                    setDiscussion((current) => [
                         response.discussion,
                         ...current,
                    ]);
                    setContent("");
                    setOpenModal(false);
               }
          }
     }
     return (
          <Modal
               show={openModal}
               size="xl"
               onClose={() => setOpenModal(false)}
               popup
          >
               <Modal.Body className="bg-gray-800 border text-white">
                    <Modal.Header />
                    <h1 className="text-xl font-medium">New Discussion</h1>
                    <textarea
                         name="content"
                         id=""
                         cols={60}
                         rows={5}
                         className="rounded-md bg-gray-700 my-5 text-sm"
                         onChange={(e) => setContent(e.target.value)}
                         value={content}
                    ></textarea>
                    <div className="btn-group flex gap-3">
                         <button
                              className="btn px-3 py-1 bg-red-600 hover:bg-red-800 rounded-md"
                              onClick={() => setContent("")}
                         >
                              Clear
                         </button>
                         <button
                              className="btn px-3 py-1 bg-primary hover:bg-primary-hover rounded-md"
                              onClick={() => onSubmit()}
                         >
                              Submit
                         </button>
                    </div>
               </Modal.Body>
          </Modal>
     );
}
