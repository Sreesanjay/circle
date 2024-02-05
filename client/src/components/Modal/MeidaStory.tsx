import { Modal } from "flowbite-react";
import {
     ChangeEvent,
     Dispatch,
     SetStateAction,
     useEffect,
     useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addStory } from "../../services/storyService";
import { useNavigate } from "react-router-dom";
import { resetStory } from "../../features/story/storySlice";
import { toast } from "react-toastify";

export default function MediaStory({
     openModal,
     setOpenModal,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
     const dispatch = useAppDispatch();
     const { isSuccess } = useAppSelector((state) => state.story);
     const navigate = useNavigate();
     const [content, setContent] = useState<Blob | undefined>();
     const { userProfile } = useAppSelector((state) => state.user);
     const [visibility, setVisibility] = useState("PUBLIC");
     const [background, setBackground] = useState("bg-slate-50");

     function handleSubmit() {
          if (content) {
               dispatch(
                    addStory({
                         story_type: "MEDIA",
                         content: content,
                         visibility: visibility,
                         background: background,
                         color: "",
                    })
               );
          }
     }
     useEffect(() => {
          if (isSuccess) {
               dispatch(resetStory());
               toast("New story added");
               navigate("/");
          }
     }, [isSuccess, navigate, dispatch]);

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          if (e.target.files) {
               const file = new Blob([e.target.files[0]], {
                    type: e.target.files[0].type,
               });
               setContent(file);
          }
     }
     return (
          <>
               <Modal
                    show={openModal}
                    size="md"
                    onClose={() => setOpenModal(false)}
                    popup
               >
                    <Modal.Header>Choose a file</Modal.Header>
                    <Modal.Body>
                         <div className="">
                              <h1 className="mb-3">Choose a file</h1>
                              <input
                                   type="file"
                                   accept="image/png, video/*, image/jpeg "
                                   onChange={handleChange}
                              />
                         </div>

                         <div className="flex flex-col my-3">
                              <label htmlFor="">Visibility</label>
                              <select
                                   name=""
                                   id=""
                                   className="rounded-md"
                                   onChange={(e) =>
                                        setVisibility(e.target.value)
                                   }
                              >
                                   <option value="PUBLIC">Public</option>
                                   <option value="CLOSE_FRIENDS">
                                        Close Friends
                                   </option>
                                   {userProfile?.account_type ===
                                        "PROFESSIONAL" && (
                                        <option value="SUBSCRIBER_ONLY">
                                             Subscriber Only
                                        </option>
                                   )}
                              </select>
                         </div>
                         <div className="p-3 border mb-3 rounded-md">
                              <h1 className="font-light mb-3">Backgrounds</h1>
                              <div className="flex gap-3">
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500"
                                        onClick={() =>
                                             setBackground(
                                                  "bg-gradient-to-r from-indigo-500 to-purple-500"
                                             )
                                        }
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                                        onClick={() =>
                                             setBackground(
                                                  "bg-gradient-to-r from-cyan-500 to-blue-500"
                                             )
                                        }
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-gradient-to-r from-cyan-500 to-green-500"
                                        onClick={() =>
                                             setBackground(
                                                  "bg-gradient-to-r from-cyan-500 to-green-500"
                                             )
                                        }
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-slate-700"
                                        onClick={() =>
                                             setBackground("bg-slate-700")
                                        }
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-yellow-500"
                                        onClick={() =>
                                             setBackground("bg-yellow-500")
                                        }
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-slate-50"
                                        onClick={() =>
                                             setBackground("bg-slate-50")
                                        }
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-cyan-500"
                                        onClick={() =>
                                             setBackground("bg-cyan-500")
                                        }
                                   ></div>
                              </div>
                         </div>
                    </Modal.Body>
                    <Modal.Footer>
                         {content && (
                              <>
                                   <button className="px-3 py-1 bg-red-500 rounded-md">
                                        Discard
                                   </button>
                                   <button
                                        className="px-3 py-1 bg-primary rounded-md"
                                        onClick={handleSubmit}
                                   >
                                        Submit
                                   </button>
                              </>
                         )}
                    </Modal.Footer>
               </Modal>
          </>
     );
}
