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
            console.log("UserList fetching")
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
          })()
     }, []);
     return (
          <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
               <Modal.Header>Add Close Friends</Modal.Header>
               <Modal.Body>hello this is sreesanjay</Modal.Body>
          </Modal>
     );
}
