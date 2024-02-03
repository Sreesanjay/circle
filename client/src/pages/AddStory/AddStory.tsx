import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { useNavigate } from "react-router-dom";
import "./AddStory.css";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import TextStory from "../../components/Modal/TextStory";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export default function AddStory() {
     const [openTextStory, setOpenTextStory] = useState(false);
     // const [openPhotoStory, setOpenPhotoStory] = useState(true)
     const { myStory, isSuccess } = useAppSelector((state) => state.story);
     const navigate = useNavigate();

     useEffect(() => {
          if (isSuccess) {
               toast("New Story uploaded");
          }
     }, [isSuccess, myStory]);
     return (
          <section className="p-5 h-screen">
               <TextStory
                    openModal={openTextStory}
                    setOpenModal={setOpenTextStory}
               />
               <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item
                         onClick={() => navigate("/")}
                         icon={HiHome}
                    >
                         Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Add Story</Breadcrumb.Item>
               </Breadcrumb>
               <div className="add-story flex justify-center gap-5 items-center">
                    <div className="story-type w-72 flex flex-col items-center justify-center bg-slate-300 rounded-md cursor-pointer">
                         <div className="bg-slate-500 p-3 rounded-full mb-3">
                              <InsertPhotoIcon />
                         </div>
                         <h1>Create a Photo Story</h1>
                    </div>
                    <div className="story-type bg-slate-300 w-72 flex flex-col items-center justify-center rounded-md cursor-pointer">
                         <div
                              className="bg-slate-50 p-3 rounded-full mb-3"
                              onClick={() =>navigate('/add-story/create-text-story')}
                         >
                              <FormatColorTextIcon className=""/>
                         </div>
                         <h1 className="text-white">Create a Text Story</h1>
                    </div>
               </div>
          </section>
     );
}
