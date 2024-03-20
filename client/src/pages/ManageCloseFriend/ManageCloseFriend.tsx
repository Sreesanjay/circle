import { useEffect, useState } from "react";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { userList } from "../../types";
import CloseFriendCard from "../../components/UserProfileCard/CloseFriendCard";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { Breadcrumb } from "flowbite-react";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import AddCloseFriends from "../../components/Modal/AddCloseFriends";
import { AddIcon } from "../../assets/Icons";

export default function ManageCloseFriend() {
     const [users, setUsers] = useState<userList[]>([]);
     const [addCloseFriends, setAddCloseFriends] = useState(false);
     async function removeCloseFriend(id: string) {
          try {
               const response = await API.delete(`/users/close-friend/${id}`, {
                    withCredentials: true,
               });
               if (response.data) {
                    toast(response.data.message);
                    setUsers((current) =>
                         current.filter((item) => item.user_id !== id)
                    );
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }
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
     }, [addCloseFriends]);
     return (
          <div className="flex flex-col">
               <ManageAccSidebar />
               <div className="px-5 sm:ms-64">
                    <div className="header w-full flex justify-between items-center">
                         <Breadcrumb aria-label="Default breadcrumb example">
                              <Breadcrumb.Item icon={LiaUserFriendsSolid}>
                                   Close Friends
                              </Breadcrumb.Item>
                         </Breadcrumb>
                         <div onClick={() => setAddCloseFriends(true)}>
                              <AddIcon size={45} />
                         </div>
                         <AddCloseFriends
                              openModal={addCloseFriends}
                              setOpenModal={setAddCloseFriends}
                         />
                    </div>
                    {users.length === 0 ? (
                         <div className="w-full h-96 flex flex-col justify-center items-center">
                              <img src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png" alt="" className="w-36" />
                              <h1 className="text-gray-400">No close friends found</h1>
                         </div>
                    ) : (
                         <div className="close-friends py-5 flex gap-3 flex-wrap justify-center sm:justify-start">
                              {users &&
                                   users.map((user) => {
                                        return (
                                             <CloseFriendCard
                                                  user={user}
                                                  removeCloseFriend={
                                                       removeCloseFriend
                                                  }
                                             />
                                        );
                                   })}
                         </div>
                    )}
               </div>
          </div>
     );
}
