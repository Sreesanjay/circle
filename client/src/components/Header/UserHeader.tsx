import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
     HomeIcon,
     Notification
} from "../../assets/Icons";
import ProfileIcon from "../../assets/ProfileIcon";
import SearchBox from "../SearchBox/SearchBox";
import "./UserHeader.css";
import UserHeaderProfile from "./UserHeaderProfile";

export default function UserHeader() {
     const { user } = useAppSelector((state) => state.auth);
     const [isProfileToggle, setisProfileToggle] = useState(false)
     return (
          <section className="user-header px-6 grid grid-cols-6 items-center">
               <div className="logo col-span-1">
                    <h1 className="text-4xl md:text-5xl">Circle</h1>
               </div>
               <div className="welcome-note hidden md:flex font-medium  text-lg col-span-1">
                    <h2 className="ms-3  text-gray-600">Welcome, {user ? user.username : null}</h2>
               </div>
               <div className="right-nav flex justify-end gap-5 col-span-5 md:col-span-4 items-center">
                    <div className="grow hidden sm:flex justify-end">
                        <SearchBox/>
                    </div>
                         <HomeIcon />
                         <Notification />
                    <div className="user-proifle relative">
                         <div className="cursor-pointer" onClick={()=>setisProfileToggle(currentState=>!currentState)}>
                              <ProfileIcon size="medium"/>
                         </div>
                         <div className="profile-dropdown cursor-context-menu absolute right-0">
                         {isProfileToggle &&
                              <UserHeaderProfile/>
                         }
                         </div>
                    </div>
               </div>
          </section>
     );
}
