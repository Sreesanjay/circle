import { useEffect, useState } from "react";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { userList } from "../../types";
export default function CloseFriends() {
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
     });
     return (
          <div className="flex gap-3">
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
