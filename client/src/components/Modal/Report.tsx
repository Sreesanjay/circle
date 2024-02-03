import { AxiosError } from "axios";
import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api";

export default function Report({
     openModal,
     setOpenModal,
     id,
     reported_type,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     id: string;
     reported_type: string;
}) {
     const [reason, setReason] = useState("");
     const [error, setError] = useState("");
     async function handleSubmit() {
          if (reason.length === 0) {
               setError("reason should not be empty");
          } else if (setReason.length > 20) {
               setError("reason should be less than 20 characters");
          } else {
               try {
                    const response = await API.post(
                         "/users/report",
                         {
                              id: id,
                              reason: reason,
                              reported_type
                         },
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setOpenModal(false);
                         toast(response.data.message);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          }
     }

     return (
          <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)}>
               <Modal.Header>Report</Modal.Header>
               <Modal.Body>
                    <label htmlFor="">Whats the reason?</label>
                    <br />
                    {error && <span className="text-red-600">{error}</span>}
                    <textarea
                         className="w-full h-32 rounded-md"
                         onChange={(e) => setReason(e.target.value)}
                    />
               </Modal.Body>
               <Modal.Footer>
                    <button
                         className="bg-primary hover:bg-primary-hover px-5 py-1 rounded-md"
                         onClick={() => handleSubmit()}
                    >
                         Report
                    </button>
               </Modal.Footer>
          </Modal>
     );
}
