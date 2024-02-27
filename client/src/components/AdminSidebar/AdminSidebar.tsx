import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiTable, HiUser } from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import { CgCommunity } from "react-icons/cg";
import { GiDiscussion } from "react-icons/gi";
import "./AdminSidebar.css";
import { useNavigate } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { logout } from "../../features/auth/AuthSlice";
import { SiApostrophe } from "react-icons/si";
//admin sidebar
export default function AdminSidebar() {
     const [showSidebar, setShowSidebar] = useState("hidden");
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     return (
          <div className="admin-sidebar md:h-screen md:fixed">
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
                         <div className="sidebarLogo-text pe-9 text-primary">
                              <h1>Circle</h1>
                         </div>
                    </Sidebar.Logo>
                    <Sidebar.Items className="sidebar-itmes ">
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
                              className={`${showSidebar} md:block `}
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
                                   className="cursor-pointer list-nav-item"
                                   onClick={() => navigate("/admin")}
                              >
                                   Dashboard
                              </Sidebar.Item>
                              <Sidebar.Item
                                   icon={HiInbox}
                                   className="cursor-pointer list-nav-item"
                                   onClick={() => navigate("/admin/interest")}
                              >
                                   Interest
                              </Sidebar.Item>

                              <Sidebar.Item
                                   icon={HiUser}
                                   className="cursor-pointer list-nav-item"
                                   onClick={() =>
                                        navigate("/admin/user-management")
                                   }
                              >
                                   User Management
                              </Sidebar.Item>

                              <Sidebar.Item
                                   icon={SiApostrophe}
                                   className="cursor-pointer list-nav-item"
                                   onClick={() =>
                                        navigate("/admin/post-management")
                                   }
                              >
                                   Post Management
                              </Sidebar.Item>
                              <Sidebar.Item
                                   icon={CgCommunity}
                                   className="cursor-pointer list-nav-item"
                                   onClick={() =>
                                        navigate("/admin/community-management")
                                   }
                              >
                                   Community Management
                              </Sidebar.Item>
                              <Sidebar.Item
                                   icon={GiDiscussion}
                                   className="cursor-pointer list-nav-item"
                                   onClick={() =>
                                        navigate("/admin/discussion-management")
                                   }
                              >
                                   Discussion Management
                              </Sidebar.Item>
                              <Sidebar.Item
                                   icon={IoIosChatbubbles}
                                   className="cursor-pointer list-nav-item"
                                   onClick={() =>
                                        navigate("/admin/chat-management")
                                   }
                              >
                                   Chat Management
                              </Sidebar.Item>

                              <Sidebar.Item
                                   className="cursor-pointer list-nav-item"
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
