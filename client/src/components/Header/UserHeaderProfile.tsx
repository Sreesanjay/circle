import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {IconSetting, UserIcon} from "../../assets/Icons";
import ProfileIcon from "../../assets/ProfileIcon";
import { logout } from "../../features/auth/AuthSlice";
import "./UserHeader.css";

export default function UserHeaderProfile() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state)=>state.auth)
        return (
          <div className="dropdown p-3 mt-3">
               <div className="profile-details mb-5 flex">
                    <ProfileIcon size="medium" />
                    <div className="right-area ms-3">
                        <h3>{user?.username}</h3>
                        <p className="text-xs">{user?.email}</p>
                    </div>
               </div>
               <hr />
               <div className="value mt-3" onClick={()=>navigate('/profile')}>
                    <UserIcon size={25} />
                    My profile
               </div>
              
               <div className="value mt-3" onClick={()=>navigate('/profile/manage-account')}>
                    <IconSetting size={25} />
                    Manage Account
               </div>

               <button className="value mt-1 p-3" onClick={()=>dispatch(logout())}>
                Logout
               </button>
          </div>
     );
}
