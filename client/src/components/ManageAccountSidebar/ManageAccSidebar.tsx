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
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineInterests } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ManageAccSidebar() {
     return (
          <Sidebar
               className="manage-acc-sidebar"
               aria-label="Sidebar with content separator example"
          >
               <Sidebar.Items className="sidebar">
                    <Sidebar.ItemGroup>
                         <Sidebar.Item icon={FaRegUserCircle}>
                              Edit Profile
                         </Sidebar.Item>
                         <Sidebar.Item icon={MdOutlineSecurity}>
                              Password & Security
                         </Sidebar.Item>
                         <Sidebar.Item icon={MdOutlineInterests}>
                              <Link to="/manage-account/preference">
                                   Preferences
                              </Link>
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiUser}>
                              Account
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiShoppingBag}>
                              Blocked Users
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiArrowSmRight}>
                              Sign In
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiTable}>
                              Sign Up
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                         <Sidebar.Item href="#" icon={HiChartPie}>
                              Upgrade to Pro
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={HiViewBoards}>
                              Documentation
                         </Sidebar.Item>
                         <Sidebar.Item href="#" icon={BiBuoy}>
                              Help
                         </Sidebar.Item>
                    </Sidebar.ItemGroup>
               </Sidebar.Items>
          </Sidebar>
     );
}
