import { Modal } from "flowbite-react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { userProfile } from "../../features/user/userSlice";
export default function ConnectionList({
     openModal,
     setOpenModal,
     title,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     title: string;
}) {
     type userList = {
          username : string;
          fullName : string;
          user_id : string;
          verified : boolean;
          profile_img : string;
     }
     const [users, setUsers] = useState<userList[]>([]);
     const [searchList, setSearchList] = useState([]);
     useEffect(() => {
          if (openModal) {
               const url =
                    title === "Following"
                         ? "/users/following"
                         : "/users/followers";
               (async () => {
                    try {
                         const response = await API.get(url, {
                              withCredentials: true,
                         });
                         if (response.data) {
                              setUsers(response.data.userList);
                              setSearchList(response.data.userList);
                         }
                    } catch (error) {
                         const err = error as AxiosError<{
                              message?: string;
                              status?: string;
                         }>;
                         toast.error(err.message);
                    }
               })();
          }
     }, [title, openModal]);

     function handleSearch(e:ChangeEvent<HTMLInputElement>) {
          if (users.length > 0) {
               const search = users.filter((item)=>item.username === e.target.value)
               console.log(typeof(search));
               setSearchList(search);
          }
     }
     return (
          <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
               <Modal.Header>
                    <div className="space-y-6 text-center">{title}</div>
               </Modal.Header>
               <Modal.Body>
                    <input type="text" className="rounded-md w-full" onChange={handleSearch} />
                    <div className="users-list">
                         {searchList &&
                              searchList.map((user: userProfile) => {
                                   return (
                                        <div className="user-card my-4 bg-gray-100 p-2 rounded-md flex items-center gap-3 justify-between">
                                             <div className="left flex gap-3">
                                                  <img
                                                       src={user.profile_img}
                                                       alt=""
                                                       className="w-10 rounded-md"
                                                  />
                                                  <div className="name">
                                                       <h1>{user.username}</h1>
                                                       <p className="text-sm text-gray-600">
                                                            {user.fullname}
                                                       </p>
                                                  </div>
                                             </div>
                                             <button className="bg-primary px-2 py-1 rounded-md">
                                                  Remove
                                             </button>
                                        </div>
                                   );
                              })}
                    </div>
               </Modal.Body>
          </Modal>
     );
}
