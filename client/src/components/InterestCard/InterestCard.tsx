import "./InterestCard.css";
import { DeleteBin, Edit } from "../../assets/Icons";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { deleteInterest } from "../../services/interestService";
import UpdateInterest from "../Modal/UpdateInterest";
import { IInterest } from "../../features/interest/interestSlice";
export default function InterestCard({ interest }: { interest: IInterest }) {
     const dispatch = useAppDispatch();
     const [updateInterest, setUpdateInterest] = useState(false)
     const [openModal, setOpenModal] = useState(false);
     const [isSubmit, setIsSubmit] = useState(false);
     const buttonStyle = {
          width: "150px",
          height: "40px",
     };
     function handleDelete() {
          setOpenModal(true);
     }
     useEffect(() => {
          if (isSubmit) {
               dispatch(deleteInterest(interest._id));
               setIsSubmit(false)
          }
     }, [isSubmit, dispatch, interest]);
     return (
          <div className="interest-container w-full bg-gray-900 shadow-md rounded-lg p-2 flex flex-col items-center sm:items-start sm:grid sm:grid-cols-12 mt-5">
               <img
                    src={interest?.image}
                    alt=""
                    className="rounded-lg col-span-12 sm:col-span-6 lg:col-span-2"
               />
               <div className="col-span-12 sm:col-span-6 lg:col-span-3 ms-4 mt-4">
                    <h1 className="text-4xl mb-3">{interest.interest}</h1>
                    <p className="text-sm">{interest.discription}</p>
               </div>
               <div className="analytic col-span-12 lg:col-span-6  flex justify-around">
                    <div className="flex flex-col items-center">
                         <h1 className="font-medium mb-10 mt-5">Total Users</h1>
                         <h1 className="text-5xl">{interest.total_users}</h1>
                    </div>
                    <div className=" flex flex-col items-center">
                         <h1 className="font-medium mb-10 mt-5">
                              Total Communities
                         </h1>
                         <h1 className="text-5xl">{interest.total_community}</h1>
                    </div>
                    <div className="flex flex-col items-center">
                         <h1 className="font-medium mb-10 mt-5">Total Posts</h1>
                         <h1 className="text-5xl">{interest.total_posts}</h1>
                    </div>
               </div>
               <div className="manage-btn flex absolute right-5">
                    <div onClick={()=>setUpdateInterest(true)}>
                         <Edit size={25} />
                    </div>
                    <div onClick={handleDelete}>
                         <DeleteBin size={25} />
                    </div>
                    <UpdateInterest showModal={updateInterest} setShowModal={setUpdateInterest} interest = { interest }/>
                    <Modal
                         show={openModal}
                         size="md"
                         onClose={() => setOpenModal(false)}
                         popup
                    >
                         <Modal.Header />
                         <Modal.Body>
                              <div className="text-center">
                                   <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                   <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this
                                        Interest
                                   </h3>
                                   <div className="flex justify-center gap-4">
                                        <Button
                                             color="success"
                                             onClick={() => {
                                                  setOpenModal(false);
                                                  setIsSubmit(true);
                                             }}
                                             style={buttonStyle}
                                        >
                                             {"Yes, I'm sure"}
                                        </Button>
                                        <Button
                                             color="failure"
                                             onClick={() => setOpenModal(false)}
                                             style={buttonStyle}
                                        >
                                             No, cancel
                                        </Button>
                                   </div>
                              </div>
                         </Modal.Body>
                    </Modal>
               </div>
          </div>
     );
}
