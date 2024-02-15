import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resetStory } from "../../features/story/storySlice";
import { addStory } from "../../services/storyService";
import "./CreateStory.css";

export default function CreateTextStory() {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const [story, setStory] = useState("");
     const [background, setBackground] = useState("bg-slate-50");
     const [color, setColor] = useState("black");
     const [visibility, setVisibility] = useState("PUBLIC");
     const { userProfile } = useAppSelector((state) => state.user);
     const [error, setError] = useState("");
     const { isSuccess, isError, errorMessage } = useAppSelector(
          (state) => state.story
     );
     function handleSubmit() {
          setError("");
          if (story.length === 0) setError("story cannot be empty");
          else if (story.length > 50)
               setError("Story should be less than 50 characters");
          else {
               dispatch(
                    addStory({
                         story_type: "TEXT",
                         content: story,
                         visibility: visibility,
                         background,
                         color,
                    })
               );
          }
     }

     useEffect(() => {
          dispatch(resetStory());
          if (isSuccess) {
               toast("Success");
               navigate("/");
          }
          if (isError) {
               toast.error(errorMessage);
          }
     }, [dispatch, errorMessage, isSuccess, isError, navigate]);

     return (
          <section className="p-5 create-story">
               <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item
                         onClick={() => navigate("/")}
                         icon={HiHome}
                    >
                         Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate("/add-story")}>
                         Add Story
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Create Story</Breadcrumb.Item>
               </Breadcrumb>
               <div className="py-5 h-full grid grid-cols-12">
                    <section className="form-area shadow-md p-5 col-span-12 md:col-span-4">
                         <h1 className="text-xl font-medium mb-5">
                              Create Story
                         </h1>
                         {error && (
                              <span className="text-red-600 text-sm">
                                   {error}
                              </span>
                         )}
                         <textarea
                              className="w-full rounded-md h-32 bg-gray-800"
                              onChange={(e) => setStory(e.target.value)}
                         />
                         <div className="flex flex-col my-3">
                              <label htmlFor="">Visibility</label>
                              <select
                                   name=""
                                   id=""
                                   className="rounded-md bg-gray-800"
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

                         <div className="p-3 border mb-3 rounded-md">
                              <h1 className="font-light mb-3">Text Color</h1>
                              <div className="flex gap-3">
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-black"
                                        onClick={() => setColor("black")}
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-white"
                                        onClick={() => setColor("white")}
                                   ></div>
                                   <div
                                        className="color rounded-full cursor-pointer border h-8 w-8 bg-red-500"
                                        onClick={() => setColor("red-500")}
                                   ></div>
                              </div>
                         </div>
                         <div className="sm:flex">
                              <button
                                   className="bg-red-500 py-2 px-3 rounded-md text-white max-w-56"
                                   onClick={() => navigate("/add-story")}
                              >
                                   Discard
                              </button>
                              <button
                                   className="bg-primary py-2 px-3 rounded-md text-white ms-3 max-w-56"
                                   onClick={() => handleSubmit()}
                              >
                                   Add to story
                              </button>
                         </div>
                    </section>
                    <section className="preview col-span-12 md:col-span-8 flex justify-center">
                         <div
                              className={`preview-story flex items-center justify-center w-2/5 h-full border rounded-md shadow-md ${background}`}
                         >
                              <h1 className={`text-2xl text-${color}`}>
                                   {story}
                              </h1>
                         </div>
                    </section>
               </div>
          </section>
     );
}
