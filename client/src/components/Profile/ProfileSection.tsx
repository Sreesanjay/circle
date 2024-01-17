import { useAppSelector } from "../../app/hooks"
import "./ProfileSection.css"

export default function Profile() {
const {user} = useAppSelector((state) => state.auth);
const {userProfile} = useAppSelector((state) => state.user)
  return (
    <div className="md:grid md:grid-cols-6 h-full">
      <div className="profile-section col-span-4">
          <h1 className="font-medium text-lg mb-5">View Profile</h1>
          <div className="wrapper grid grid-cols-2 mb-4">
            <h1 className="key font-medium col-span-1">Full Name</h1>
            <h1 className="value col-span-1">{userProfile?.fullname}</h1>
          </div>
          
          <div className="wrapper grid grid-cols-2 mb-4">
            <h1 className="key font-medium col-span-1">Email</h1>
            <h1 className="value col-span-1">{user?.email}</h1>
          </div>
          
          <div className="wrapper grid grid-cols-2 mb-4">
            <h1 className="key font-medium col-span-1">Username</h1>
            <h1 className="value col-span-1">{user?.username}</h1>
          </div>

          <div className="wrapper grid grid-cols-2 mb-4">
            <h1 className="key font-medium col-span-1">Gender</h1>
            <h1 className="value col-span-1">{userProfile?.gender}</h1>
          </div>
          
          <div className="wrapper mb-4">
            <h1 className="key font-medium mb-2">Bio</h1>
            <h1 className="value">{userProfile?.bio}</h1>
          </div>
          
      </div>
      <div className="recent-activity-section  bg-blue-300 col-span-2">
      </div>
    </div>
  )
}
