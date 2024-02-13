import { Modal } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import { createGroup } from "../../services/chatService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addChat, setCurrentChat } from "../../features/Socket/SocketSlice";
import { Socket } from "socket.io-client";

export default function CreateGroup({
     openModal,
     setOpenModal,
     socket
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     socket: RefObject<Socket> 
}) {
     const dispatch = useAppDispatch();
     const [search, setSearch] = useState("");
     const { user } = useAppSelector((state) => state.auth);
     const [chat_name, setChatName] = useState("");
     const [error, setError] = useState("");
     const [selectedUser, setselectedUser] = useState<
          {
               user_id: string;
               username: string;
          }[]
     >([]);
     const [userData, setUserData] = useState<
          | {
                 user_id: string;
                 username: string;
                 fullname: string;
                 profile_img: string;
            }[]
          | []
     >([]);
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/users/user-search?search=${search}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setUserData(response.data.userData);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.response?.data.message);
               }
          })();
     }, [search]);

     async function handleSubmit() {
          if (!chat_name) {
               setError("chat name required");
          } else if (selectedUser.length === 0) {
               setError("Minimum 2 members required");
          } else {
               const data = {
                    chat_name,
                    members: selectedUser.map((item) => item.user_id),
               };
               const response = await createGroup(data);
               if (response.chat) {
                    dispatch(addChat(response.chat));
                    dispatch(setCurrentChat(response.chat));
                    socket?.current?.emit("new-chat", response.chat);
                    setOpenModal(false);
               }
          }
     }
     return (
          <Modal
               show={openModal}
               size="md"
               onClose={() => {
                    setselectedUser([]);
                    setOpenModal(false);
               }}
          >
               <Modal.Header>Create group</Modal.Header>
               <Modal.Body>
                    {error && <span className="text-red-500">{error}</span>}
                    <div className="form-controle flex flex-col mb-3">
                         <label htmlFor="">Group name</label>
                         <input
                              type="text"
                              className="rounded-md"
                              onChange={(e) => setChatName(e.target.value)}
                         />
                    </div>
                    <div className="selected-users flex flex-wrap gap-3 mb-5 my-5">
                         {selectedUser &&
                              selectedUser.map((item) => {
                                   return (
                                        <div className="user-badge bg-slate-100 px-2 rounded-md relative">
                                             <h1>{item.username}</h1>
                                             <div
                                                  className="absolute right-0 bottom-3"
                                                  onClick={() =>
                                                       setselectedUser(
                                                            (current) =>
                                                                 current.filter(
                                                                      (item) =>
                                                                           item.user_id !==
                                                                           item.user_id
                                                                 )
                                                       )
                                                  }
                                             >
                                                  <CancelIcon className="text-red-600" />
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
                    <input
                         type="text"
                         className="search rounded-md w-full"
                         placeholder="Search user"
                         value={search}
                         onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="user-details mt-2 max-h-80 overflow-y-scroll">
                         {userData &&
                              userData.map((userProfile, index) => {
                                   if (user?._id !== userProfile.user_id) {
                                        return (
                                             <div
                                                  className="user h-12 flex px-3 gap-3 items-center mb-2"
                                                  key={index}
                                                  onClick={() => {
                                                       setSearch("");
                                                       setselectedUser(
                                                            (current) => {
                                                                 const exist =
                                                                      current.find(
                                                                           (
                                                                                item
                                                                           ) =>
                                                                                item.user_id ===
                                                                                userProfile.user_id
                                                                      );
                                                                 if (exist)
                                                                      return current;
                                                                 else
                                                                      return [
                                                                           ...current,
                                                                           {
                                                                                user_id: userProfile.user_id,
                                                                                username:
                                                                                     userProfile.username,
                                                                           },
                                                                      ];
                                                            }
                                                       );
                                                  }}
                                             >
                                                  <img
                                                       src={
                                                            userProfile.profile_img
                                                       }
                                                       alt=""
                                                       className="w-11 shadow rounded-md"
                                                  />
                                                  <div className="name leading-none">
                                                       <h1>
                                                            {
                                                                 userProfile.username
                                                            }
                                                       </h1>
                                                       <small>
                                                            {
                                                                 userProfile.fullname
                                                            }
                                                       </small>
                                                  </div>
                                             </div>
                                        );
                                   }
                              })}
                         <button
                              type="button"
                              className="px-4 py-1 bg-primary  hover:bg-primary-hover rounded-md"
                              onClick={handleSubmit}
                         >
                              Create
                         </button>
                    </div>
               </Modal.Body>
          </Modal>
     );
}
