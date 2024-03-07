import { useNavigate } from "react-router-dom";
import { userList } from "../../types";
import "./UserProfileCard.css";

export default function CloseFriendCard({
     user,
     removeCloseFriend,
}: {
     user: userList;
     removeCloseFriend: (id: string) => void;
}) {
     const navigate = useNavigate()
     return (
          <div
               className="user-profile-card shadow-md "
               style={{ width: "230px" }}
          >
               <div className="close-friend-card bg-gray-900 rounded-md flex flex-col items-center w-56 shadow-md p-3">
                    <div
                         className="header w-32 rounded-md mb-3 hover:scale-105"
                         onClick={() =>
                              navigate(`/view-profile/${user.user_id}`)
                         }
                    >
                         {user.profile_img ? (
                              <img
                                   src={user.profile_img}
                                   alt=""
                                   className="rounded-lg"
                              />
                         ) : (
                              <h1 className="text-9xl text-center absolute bottom-20 left-16">
                                   {user.email[0]}
                              </h1>
                         )}
                    </div>
                    <h1 className="mb-5">{user.username}</h1>
                    <button
                         className="bg-white text-primary px-5 py-1 rounded-md hover:bg-slate-100"
                         onClick={() => removeCloseFriend(user.user_id)}
                    >
                         Remove
                    </button>
               </div>
          </div>
     );
}
