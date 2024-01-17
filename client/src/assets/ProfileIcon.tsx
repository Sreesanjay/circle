//profile-image icon with rounded edge
import { useAppSelector } from "../app/hooks";
import { ProfileIconWithText } from "./Icons";
export default function ProfileIcon({size}:{size:string}) {
    const {user} = useAppSelector((state)=>state.auth)

     return (
          <div className="profile-img-icon">
               {user?.profile_img ? (
                    <img src={user?.profile_img} alt="" style={{}} className="w-12 rounded-lg"/>
               ) : (
                    <ProfileIconWithText email={user?.email || ""} size={size} />
               )}
          </div>
     );
}
