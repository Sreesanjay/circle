import { useEffect, useState } from "react";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { userList } from "../../types";
import { useNavigate } from "react-router-dom";
export default function CloseFriends() {
     const navigate = useNavigate();
     const [users, setUsers] = useState<userList[]>([]);
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/users/close-friends", {
                         withCredentials: true,
                    });
                    if (response.data) {
                         setUsers(response.data.userList);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, []);
     return (
          <div className="flex gap-3">
               {users.length === 0 && (
                    <div className="flex flex-col gap-5 text-sm w-full pt-5">
                         <h1 className="text-center">You dont have any close friends</h1>
                         <button
                              className="bg-gray-700 py-2 rounded-md"
                              onClick={() =>
                                   navigate("/manage-account/close-friends")
                              }
                         >
                              Add Close friends
                         </button>
                    </div>
               )}
               {users &&
                    users.map((user: userList, index) => {
                         return (
                              <div className="" key={index}>
                                   {user.profile_img ? (
                                        <img
                                             src={user.profile_img}
                                             alt=""
                                             className="w-10 rounded-md"
                                        />
                                   ) : (
                                        <h1 className="p-2 px-4 rounded-md bg-gray-400">
                                             {user.email[0].toUpperCase()}
                                        </h1>
                                   )}
                              </div>
                         );
                    })}
          </div>
     );
}
