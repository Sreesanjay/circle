import { Sidebar } from "flowbite-react";
import { FaUserFriends } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import "./HomeSidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function HomeSidebar() {
     const [showSidebar, setShowSidebar] = useState("hidden");
     const navigate = useNavigate()
     return (
          <Sidebar
               className="home-sidebar sm:fixed w-screen sm:w-min"
               aria-label="Sidebar with content separator example"
          >
               <button
                    className="bg-primary p-2 md:hidden rounded-sm mb-3"
                    onClick={() =>
                         setShowSidebar(
                              showSidebar === "block" ? "hidden" : "block"
                         )
                    }
               >
                    <MenuIcon />
               </button>
               <Sidebar.Items
                    className={`sidebar ${showSidebar} md:block pe-24 py-0 sm:py-14`}
               >
                    <Sidebar.ItemGroup className="h-3/4 flex flex-col justify-around">
                         <Sidebar.Item icon={MdHome} className="text-xl icon">
                              Home
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={FaUserFriends}
                              className="text-xl icon"
                              onClick={()=>navigate('/find-friends')}
                         >
                              Find Friends
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={FaPeopleGroup}
                              className="text-xl icon"
                         >
                              Community
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={MdOutlineMessage}
                              className="text-xl icon"
                         >
                              Message
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={IoIosAddCircle}
                              className="text-xl icon"
                              onClick={()=>navigate('/create-post')}
                         >
                              Create
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     );
}
