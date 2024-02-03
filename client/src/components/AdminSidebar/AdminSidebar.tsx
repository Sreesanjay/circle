import { Sidebar } from "flowbite-react";
import {
     HiChartPie,
     HiInbox,
     HiTable,
     HiUser,
} from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import "./AdminSidebar.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { logout } from "../../features/auth/AuthSlice";
//admin sidebar
export default function AdminSidebar() {
     const [showSidebar, setShowSidebar] = useState("hidden");
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     return (
          <div className="md:h-screen md:fixed">
               <Sidebar
                    className="admin-sidebar w-full md:w-auto"
                    aria-label="Sidebar with logo branding example"
               >
                    <Sidebar.Logo
                         href="#"
                         img="https://lh3.google.com/u/0/d/1C1DLE7l-yDr2HQ6md3Sd21dcebNHpGdZ"
                         imgAlt=""
                         className="sidebar-logo flex items-center mb-10"
                    >
                         <div className="sidebarLogo-text pe-9">
                              <h1>Circle</h1>
                         </div>
                    </Sidebar.Logo>
                    <Sidebar.Items className="sidebar-itmes">
                         <button
                              className="bg-primary p-2 md:hidden rounded-sm"
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
                         <Sidebar.ItemGroup
                              className={`${showSidebar} md:block`}
                              onClick={() =>
                                   setShowSidebar(
                                        showSidebar === "block"
                                             ? "hidden"
                                             : "block"
                                   )
                              }
                         >
                              <Sidebar.Item
                                   icon={HiChartPie}
                                   className="cursor-pointer"
                                   onClick={() => navigate("/admin")}
                              >
                                   Dashboard
                              </Sidebar.Item>
                              <Sidebar.Item
                                   icon={HiInbox}
                                   className="cursor-pointer"
                                   onClick={() => navigate("/admin/interest")}
                              >
                                   Interest
                              </Sidebar.Item>

                              <Sidebar.Item
                                   icon={HiUser}
                                   className="cursor-pointer"
                                   onClick={() => navigate("/admin/user-management")}
                              >
                                   User Management
                              </Sidebar.Item>

                              <Sidebar.Item
                                   icon={HiUser}
                                   className="cursor-pointer"
                                   onClick={() => navigate("/admin/post-management")}
                              >
                                   Post Management
                              </Sidebar.Item>
                              
                              <Sidebar.Item
                                   className="cursor-pointer"
                                   icon={HiTable}
                                   onClick={() => dispatch(logout())}
                              >
                                   Logout
                              </Sidebar.Item>
                         </Sidebar.ItemGroup>
                    </Sidebar.Items>
               </Sidebar>
          </div>
     );
}
