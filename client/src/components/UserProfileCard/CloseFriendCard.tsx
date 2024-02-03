import { userList } from "../../types";
import { ChatIcon } from "../../assets/Icons";
import "./UserProfileCard.css";

export default function CloseFriendCard({
     user,
     removeCloseFriend,
}: {
     user: userList;
     removeCloseFriend: (id:string) => void;
}) {
     return (
          <div className="card shadow-md" style={{width:'230px'}}>
               <button className="mail">
                    <ChatIcon size={25} />
               </button>
               <div className="profile-pic">
                    {user.profile_img ?
                    <img src={user.profile_img} alt="" />
                    :
                    <h1 className="text-9xl text-center absolute bottom-20 left-16">{user.email[0]}</h1>
                    }
               </div>
               <div className="bottom bg-primary">
                    <div className="content">
                         <h1 className="name">{user.username}</h1>
                         <span className="text-white text-sm">
                              {user.fullname}
                         </span>
                         <div className="buttons py-5">
                              <button
                                   className="bg-white text-primary px-5 py-1 rounded-md hover:bg-slate-100"
                                   onClick={() =>
                                        removeCloseFriend(user.user_id)
                                   }
                              >
                                   Remove
                              </button>
                         </div>
                    </div>
                    <div className="bottom-bottom">
                         <div className="username w-full flex  justify-center">
                              <h1 className="text-2xl text-white">
                                   {user.username}
                              </h1>
                         </div>
                    </div>
               </div>
          </div>
     );
}
