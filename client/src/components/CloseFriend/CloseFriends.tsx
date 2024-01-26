import { useEffect, useState } from "react";
import API from "../../api";
import { userList } from "../../types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function CloseFriends() {
     const [closeFriends, setCloseFriends] = useState<userList[]>([]);
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/users/get-following", {
                         withCredentials: true,
                    });
                    console.log(response.data);
                    if (response.data) {
                         setCloseFriends(response.data.userList);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     },[]);

     return (
          <div className="close-friends w-full flex justify-around flex-wrap gap-1 mb-5">
               {closeFriends.map((user) => {
                    return (
                         <div className="friends-container bg-black w-16 h-16 rounded-lg">
                              <img src={user.profile_img} alt="" />
                         </div>
                    );
               })}
          </div>
     );
}
