import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { useNavigate } from "react-router-dom";
import "./AddStory.css";
import MediaStory from "../../components/Modal/MeidaStory";
import { useState } from "react";

export default function AddStory() {
     const navigate = useNavigate();
     const [openFileUpload, setOpenFileUpload] = useState(false)
     return (
          <>
          <MediaStory openModal={openFileUpload} setOpenModal={setOpenFileUpload}/>
          <section className="p-5 h-screen">
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
                    <div className="story-type w-72 flex flex-col items-center justify-center bg-slate-300 rounded-md cursor-pointer" onClick={()=>setOpenFileUpload(true)}>
                         <div className="bg-slate-50 p-3 rounded-full mb-3">
                              <InsertPhotoIcon />
                         </div>
                         <h1 className="text-white">Create a Photo Story</h1>
                    </div>
                    <div className="story-type bg-slate-300 w-72 flex flex-col items-center justify-center rounded-md cursor-pointer">
                         <div
                              className="bg-slate-50 p-3 rounded-full mb-3"
                              onClick={() =>
                                   navigate("/add-story/create-text-story")
                              }
                         >
                              <FormatColorTextIcon className="" />
                         </div>
                         <h1 className="text-white">Create a Text Story</h1>
                    </div>
               </div>
          </section>
          </>
     );
}
