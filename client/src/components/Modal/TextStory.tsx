// import { Modal } from "flowbite-react";
// import { useState, Dispatch, SetStateAction, useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { addStory } from "../../services/storyService";
// import { resetStory } from "../../features/story/storySlice";
// import { toast } from "react-toastify";

// export default function TextStory({
//      openModal,
//      setOpenModal,
// }: {
//      openModal: boolean;
//      setOpenModal: Dispatch<SetStateAction<boolean>>;
// }) {
//      const dispatch = useAppDispatch();
//      const [story, setStory] = useState("");
//      const [visibility, setVisibility] = useState("PUBLIC");
//      const [error, setError] = useState("");
//      const { userProfile } = useAppSelector((state) => state.user);
//      const { isSuccess, isError, errorMessage } = useAppSelector(
//           (state) => state.story
//      );
//      function handleSubmit() {
//           setError("");
//           if (story.length === 0) setError("story cannot be empty");
//           else if (story.length > 100)
//                setError("Story should be less than 100 characters");
//           else {
//                dispatch(
//                     addStory({
//                          story_type: "TEXT",
//                          content: story,
//                          visibility: visibility,
//                     })
//                );
//           }
//      }

//      useEffect(() => {
//          dispatch(resetStory());
//           if (isSuccess) {
//                setOpenModal(false);
//           }
//           if (isError) {
//                toast.error(errorMessage);
//           }
//      }, [dispatch, errorMessage, isSuccess, isError, setOpenModal]);

//      function onCloseModal() {
//           setOpenModal(false);
//      }

//      return (
//           <>
//                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
//                     <Modal.Header />
//                     <Modal.Body>
//                          <h1 className="text-xl font-medium py-3">
//                               Add Your Story
//                          </h1>
//                          {error && (
//                               <span className="text-red-600 text-sm">
//                                    {error}
//                               </span>
//                          )}
//                          <textarea
//                               onChange={(e) => setStory(e.target.value)}
//                               className="input-box rounded-md mb-3"
//                          />
//                          <div className="flex flex-col my-3">
//                               <label htmlFor="">Visibility</label>
//                               <select
//                                    name=""
//                                    id=""
//                                    className="rounded-md"
//                                    onChange={(e) =>
//                                         setVisibility(e.target.value)
//                                    }
//                               >
//                                    <option value="PUBLIC">Public</option>
//                                    <option value="CLOSE_FRIENDS">
//                                         Close Friends
//                                    </option>
//                                    {userProfile?.account_type ===
//                                         "PROFESSIONAL" && (
//                                         <option value="SUBSCRIBER_ONLY">
//                                              Subscriber Only
//                                         </option>
//                                    )}
//                               </select>
//                          </div>
//                          <button className="bg-red-500 py-2 px-3 rounded-md text-white">
//                               Discard
//                          </button>
//                          <button
//                               className="bg-primary py-2 px-3 rounded-md text-white ms-3"
//                               onClick={() => handleSubmit()}
//                          >
//                               Add to story
//                          </button>
//                     </Modal.Body>
//                </Modal>
//           </>
//      );
// }
