import { useEffect, useState } from "react";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import ConnectionList from "../Modal/ConnectionList";

export default function FriendList() {
     const [connections, setConnections] = useState<{
          followers: number;
          following: number;
     }>();
     const [title, setTitle] = useState("");
     const [openConnection, setOpenConnection] = useState(false);

     //fetch connection count;
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         "/profile/connection-count",
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setConnections({
                              followers:
                                   response.data.connectionCount.followers,
                              following:
                                   response.data.connectionCount.following,
                         });
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast(err.message);
               }
          })();
     }, []);
     return (
          <div className="friend-list flex w-full justify-around sm-pe-7">
               <ConnectionList
                    openModal={openConnection}
                    setOpenModal={setOpenConnection}
                    title={title}
               />
               <div
                    className="wrapper flex flex-col items-center"
                    onClick={() => {
                         setTitle("Following");
                         setOpenConnection(true);
                    }}
               >
                    <h1>{connections?.following}</h1>
                    <h3>Following</h3>
               </div>
               <div
                    className="wrapper flex flex-col items-center"
                    onClick={() => {
                         setTitle("Followers");
                         setOpenConnection(true);
                    }}
               >
                    <h1>{connections?.followers}</h1>
                    <h3>Followers</h3>
               </div>
          </div>
     );
}
