import "./ManageAccSidebar.css";
import { Sidebar } from "flowbite-react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { HiShoppingBag } from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import { FaRegUserCircle } from "react-icons/fa";
import {
     MdOutlineSecurity,
     MdOutlineInterests,
     MdOutlineManageAccounts,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ManageAccSidebar() {
     const [showSidebar, setShowSidebar] = useState("hidden");
     return (
          <Sidebar
               className="manage-acc-sidebar sm:fixed w-screen sm:w-min"
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
                    className={`sidebar ${showSidebar} md:block bg-gray-900 w-max`}
               >
                    <Sidebar.ItemGroup>
                         <div className="flex items-center p-3 gap-4">
                              <FaRegUserCircle />
                              <Link to="/manage-account">Edit Profile</Link>
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
                              <LiaUserFriendsSolid />
                              <Link to="/manage-account/close-friends">
                                   CloseFriends
                              </Link>
                         </div>
                         <div className="flex items-center p-3 gap-4">
                              <MdOutlineManageAccounts />
                              <Link to="/manage-account/account">Account</Link>
                         </div>
                         <div className="flex items-center p-3 gap-4">
                              <HiShoppingBag />
                              <Link to="/manage-account/blocked-users">
                                   Blocked Users
                              </Link>
                         </div>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     );
}
