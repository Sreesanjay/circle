import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { userList } from "../../types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import API from "../../api";

export default function AddCloseFriends({
     openModal,
     setOpenModal,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
     const [userList, setUserList] = useState<userList[]>();
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get("/users/get-following", {
                         withCredentials: true,
                    });
                    if (response.data) {
                         setUserList(response.data.userList);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, [openModal]);

     async function addToCloseFriends(id: string) {
          try {
               const response = await API.post(
                    "/users/add-closefriend",
                    { id },
                    { withCredentials: true }
               );
               if(response.data){
                toast(response.data.message)
                setUserList((current)=>{
                    return current?.filter((item)=>item.user_id !== id);
                })
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }
     return (
          <Modal
               show={openModal}
               size="md"
               onClose={() => {
                    setUserList([]);
                    setOpenModal(false);
               }}
          >
               <Modal.Header>Add Close Friends</Modal.Header>
               <Modal.Body>
                <h1 className="mb-7">Your followings</h1>
                    {userList?.map((user) => {
                         return (
                              <div className="mb-5 flex justify-between" key={user.user_id}>
                                   <div className="left flex gap-3">
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
                                        <div className="name">
                                             <h1>{user.username}</h1>
                                             <p className="text-sm text-gray-600">
                                                  {user.fullname}
                                             </p>
                                        </div>
                                   </div>
                                   <div className="button">
                                        <button
                                             className="bg-primary hover:bg-primary-hover p-1 px-5 rounded-md"
                                             onClick={() =>
                                                  addToCloseFriends(
                                                       user.user_id
                                                  )
                                             }
                                        >
                                             Add
                                        </button>
                                   </div>
                              </div>
                         );
                    })}
               </Modal.Body>
          </Modal>
     );
}
