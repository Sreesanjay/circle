import { useEffect, useState } from "react";
import { HomeIcon, Notification } from "../../assets/Icons";
import ProfileIcon from "../../assets/ProfileIcon";
import SearchBox from "../SearchBox/SearchBox";
import "./UserHeader.css";
import UserHeaderProfile from "./UserHeaderProfile";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { resetCurrentChat } from "../../features/Socket/SocketSlice";

export default function UserHeader() {
     const dispatch = useAppDispatch();
     const location = useLocation();
     //for handling currentChat persist in messages 
     useEffect(() => {
          if (location.pathname !== "/messages") {
               dispatch(resetCurrentChat());
          }
     }, [location, dispatch]);

     const [isProfileToggle, setisProfileToggle] = useState(false);
     return (
          <section className="user-header px-6 grid grid-cols-6 items-center sticky shadow-sm bg-gray-900">
               <div className="logo col-span-1">
                    <h1 className="text-4xl md:text-5xl text-primary">
                         Circle
                    </h1>
               </div>
               <div className="right-nav flex justify-end gap-5 col-span-5 md:col-span-5 items-center">
                    <div className="grow hidden sm:flex justify-end">
                         <SearchBox />
                    </div>
                    <Link to="/">
                         <HomeIcon />
                    </Link>
                    <Notification />
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
          </section>
     );
}
