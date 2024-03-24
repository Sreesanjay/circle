import { Sidebar } from "flowbite-react";
import { FaUserFriends } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import "./HomeSidebar.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function HomeSidebar() {
     const [showSidebar, setShowSidebar] = useState("hidden");
     const navigate = useNavigate();
     const location = useLocation();
     useEffect(() => {
          // console.log(location)
     }, [location]);
     return (
          <Sidebar
               className="home-sidebar md:fixed w-full md:w-min bg-gray-900 text-white"
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
                    className={`sidebar ${showSidebar} md:block md:w-72  pe-2 ps-5 py-0 md:py-14 bg-gray-900 rounded-md`}
               >
                    <Sidebar.ItemGroup className="h-3/4 flex flex-col justify-around">
                         <Sidebar.Item
                              icon={MdHome}
                              className={`text-xl icon ${
                                   location.pathname === "/" && "active-path"
                              }`}
                              onClick={() => navigate("/")}
                         >
                              Home
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={FaUserFriends}
                              className={`text-xl icon ${
                                   location.pathname === "/find-friends" && "active-path"
                              }`}
                              onClick={() => navigate("/find-friends")}
                         >
                              Find Friends
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={FaPeopleGroup}
                              className="text-xl icon"
                              onClick={() =>
                                   navigate("/community/recent_discussions")
                              }
                         >
                              Community
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={MdOutlineMessage}
                              className="text-xl icon"
                              onClick={() => navigate("/messages")}
                         >
                              Message
                         </Sidebar.Item>
                         <Sidebar.Item
                              icon={IoIosAddCircle}
                              className={`text-xl icon ${
                                   location.pathname === "/create-post" && "active-path"
                              }`}
                              onClick={() => navigate("/create-post")}
                         >
                              Create
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     );
}
