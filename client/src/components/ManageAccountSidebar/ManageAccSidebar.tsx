import "./ManageAccSidebar.css";

import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
     HiArrowSmRight,
     HiChartPie,
     HiShoppingBag,
     HiTable,
     HiUser,
     HiViewBoards,
} from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineInterests } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ManageAccSidebar() {
     const [showSidebar, setShowSidebar] = useState("hidden") 
     return (
          <Sidebar
               className="manage-acc-sidebar sm:fixed w-screen sm:w-min"
               aria-label="Sidebar with content separator example"
          >
               <button
                              className="bg-primary p-2 md:hidden rounded-sm mb-3"
                              onClick={() =>
                                   setShowSidebar(
                                        showSidebar === "block"
                                             ? "hidden"
                                             : "block"
                                   )
                              }
                         >
                              <MenuIcon />
                         </button>
               <Sidebar.Items className={`sidebar ${showSidebar} md:block`}>
                    <Sidebar.ItemGroup>
                         <div className="flex items-center p-3 gap-4">
                              <FaRegUserCircle />
                              <Link to="/manage-account">
                              Edit Profile
                              </Link>
                         </div>
                         <div className="flex items-center p-3 gap-4">
                              <MdOutlineSecurity />
                              <Link to="/manage-account/password&security">
                              Password & Security
                              </Link>
                         </div>
                         <div className="flex items-center p-3 gap-4">
                              <MdOutlineInterests />
                              <Link to="/manage-account/preference">
                                   Preferences
                              </Link>
                         </div>
                         <div className="flex items-center p-3 gap-4">
                              <MdOutlineInterests />
                              <Link to="/manage-account/close-friends">
                                   CloseFriends
                              </Link>
                         </div>
                         <Sidebar.Item icon={HiUser}>Account</Sidebar.Item>
                         <Sidebar.Item icon={HiShoppingBag}>
                              Blocked Users
                         </Sidebar.Item>
                         <Sidebar.Item icon={HiArrowSmRight}>
                              Sign In
                         </Sidebar.Item>
                         <Sidebar.Item icon={HiTable}>Sign Up</Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                         <Sidebar.Item href="#" icon={BiBuoy}>
                              Professional Account
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiChartPie}>
                              Subscribers
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiViewBoards}>
                              Insights
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     );
}
