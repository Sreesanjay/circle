import { useEffect, useState, useContext } from "react";
import {
     CloseCircleIcon,
     CloseXIcon,
     HomeIcon,
     Notification,
     ProfileIconWithText,
} from "../../assets/Icons";
import ProfileIcon from "../../assets/ProfileIcon";
import SearchBox from "../SearchBox/SearchBox";
import "./UserHeader.css";
import UserHeaderProfile from "./UserHeaderProfile";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { resetCurrentChat } from "../../features/Socket/SocketSlice";
import { Drawer } from "@mui/material";
import { INotification } from "../../types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "../../api";
import { SocketContext } from "../../App";

export default function UserHeader() {
     const navigate = useNavigate()
     const dispatch = useAppDispatch();
     const socket = useContext(SocketContext);
     const location = useLocation();
     const [openDrawer, setOpenDrawer] = useState(false);
     const [notifications, setNotifications] = useState<INotification[] | []>(
          []
     );
     const [isProfileToggle, setisProfileToggle] = useState(false);

     useEffect(() => {
          socket?.current?.on("recieve-notification", (doc) => {
               setNotifications((current) => [doc, ...current]);
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [socket?.current]);

     //for handling currentChat persist between reloads
     useEffect(() => {
          if (location.pathname !== "/messages") {
               dispatch(resetCurrentChat());
          }
     }, [location, dispatch]);

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/notifications", {
                         withCredentials: true,
                    });
                    if (response.data.notifications) {
                         setNotifications(response.data.notifications);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.response?.data.message);
               }
          })();
     }, []);

     async function handleReadNotification(id: string) {
          try {
               const response = await API.put(
                    `/notifications/${id}`,
                    {},
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setNotifications(
                         notifications.filter((item) => item._id !== id)
                    );
               } else {
                    throw new Error("Internal server error");
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.response?.data.message);
          }
     }

     return (
          <section className="user-header px-6 grid grid-cols-6 items-center sticky shadow-sm bg-gray-900">
               <div className="logo col-span-1">
                    <button onClick={()=>navigate('/')}>
                         <h1 className="text-4xl md:text-5xl text-primary">
                              Circle
                         </h1>
                    </button>
               </div>
               <div className="right-nav flex justify-end gap-5 col-span-5 md:col-span-5 items-center">
                    <div className="grow hidden sm:flex justify-end">
                         <SearchBox />
                    </div>
                    <Link to="/">
                         <HomeIcon />
                    </Link>
                    <div
                         onClick={() => setOpenDrawer(!openDrawer)}
                         className="relative"
                    >
                         {notifications.length > 0 && (
                              <div className="notification-counter absolute right-0 bg-primary rounded-full px-2">
                                   {notifications.length}
                              </div>
                         )}
                         <Notification />
                    </div>
                    <div
                         className="user-proifle relative"
                         onClick={() =>
                              setisProfileToggle(
                                   (currentState) => !currentState
                              )
                         }
                    >
                         <div className="cursor-pointer">
                              <ProfileIcon size="medium" />
                         </div>
                         <div className="profile-dropdown cursor-context-menu absolute right-0">
                              {isProfileToggle && <UserHeaderProfile />}
                         </div>
                    </div>
               </div>
               <Drawer
                    anchor={"right"}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
               >
                    <div className="notification-drawer bg-gray-700 h-full overflow-y-scroll flex flex-col items-center px-5 pt-16">
                         <div className="header w-full flex items-center justify-between">
                              <h1 className="text-white text-xl">
                                   Notifications
                              </h1>
                              <div
                                   className="close-icon"
                                   onClick={() => setOpenDrawer(false)}
                              >
                                   <CloseXIcon size={25} />
                              </div>
                         </div>
                         <div className="notifications w-full mt-5">
                              {notifications &&
                                   notifications.map((notification, index) => {
                                        return (
                                             <div
                                                  className="notification-card rounded-md flex justify-between items-center p-1 bg-gray-900 gap-2 mb-3"
                                                  key={index}
                                             >
                                                  <div className="profile-img rounded-md overflow-hidden">
                                                       {notification.userProfile
                                                            .profile_img ? (
                                                            <img
                                                                 src={
                                                                      notification
                                                                           .userProfile
                                                                           .profile_img
                                                                 }
                                                                 alt=""
                                                                 className="w-14 h-14 object-contain"
                                                            />
                                                       ) : (
                                                            <ProfileIconWithText
                                                                 email={
                                                                      notification
                                                                           .userProfile
                                                                           .email
                                                                 }
                                                                 size={"small"}
                                                            />
                                                       )}
                                                  </div>
                                                  <h3 className="text-lg text-wrap text-gray-500">
                                                       {notification.message}
                                                  </h3>
                                                  <div
                                                       className="read-button"
                                                       onClick={() =>
                                                            handleReadNotification(
                                                                 notification._id
                                                            )
                                                       }
                                                  >
                                                       <CloseCircleIcon
                                                            size={25}
                                                       />
                                                  </div>
                                             </div>
                                        );
                                   })}
                         </div>
                    </div>
               </Drawer>
          </section>
     );
}
