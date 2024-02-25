import {
     ChangeEvent,
     Dispatch,
     SetStateAction,
     useEffect,
     useState,
} from "react";
import API from "../../api";
import { IInterest } from "../../types";
import { Button, Label, Modal, Select } from "flowbite-react";
import { DeleteBin } from "../../assets/Icons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
export default function AddInterest({
     openModal,
     setOpenModal,
     myInterest,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     myInterest: IInterest[];
}) {
     type IId = string;
     const dispatch = useAppDispatch();
     const [interest, setInterest] = useState<IInterest[]>();
     const [choosedInterest, setChoosedInterest] = useState<IInterest[]>([]);
     const [choosedId, setChoosedId] = useState<IId[]>([]);
     const buttonStyle = {
          width: "100%",
          height: "40px",
     };
     useEffect(() => {
          (async () => {
               try {
                    if (openModal) {
                         const response = await API.get(
                              "/manage-account/interest",
                              {
                                   withCredentials: true,
                              }
                         );
                         if (response.data) {
                              setInterest(response.data.interest);
                              setInterest(
                                   response.data.interest.filter(
                                        (item: IInterest) => {
                                             const interest = myInterest.find(
                                                  (int) => int._id === item._id
                                             );
                                             if (!interest) return item;
                                        }
                                   )
                              );
                         }
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.response?.data.message);
               }
          })();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [openModal]);

     function handleChange(e: ChangeEvent<HTMLSelectElement>) {
          const item = interest?.find((item) => item._id === e.target.value);
          if (item) {
               if (!choosedId?.includes(item._id as string)) {
                    setChoosedId((prev) => [...prev, e.target.value]);
                    setChoosedInterest((prev) => [...prev, item]);
               }
          }
     }
     function deleteChoosed(id: string) {
          setChoosedId((prev) => {
               return prev.filter((item) => item !== id);
          });
          setChoosedInterest((prev) => {
               return prev.filter((item) => item._id !== id);
          });
     }

     async function handleSubmit() {
          try {
               if (choosedId.length > 0) {
                    const response = await API.post(
                         "/manage-account/interest/add-interest",
                         { choosedId },
                         { withCredentials: true }
                    );
                    if (response.data) {
                         dispatch(getUserProfile());
                         toast(response.data.message);
                         setOpenModal(false);
                    }
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
               onClose={() => setOpenModal(false)}
               popup
          >
               <Modal.Header />
               <Modal.Body>
                    <div className="space-y-6">
                         <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                              Add Interest
                         </h3>
                         <div>
                              <div className="mb-2 block">
                                   <Label
                                        htmlFor="email"
                                        value="Added interest"
                                   />
                                   {
                                        // const setArray = Array.from(choosedInterest);
                                        choosedInterest?.map((item) => {
                                             return (
                                                  <div className=" flex items-baseline">
                                                       <h1>{item.interest}</h1>
                                                       <div
                                                            onClick={() =>
                                                                 deleteChoosed(
                                                                      item._id as string
                                                                 )
                                                            }
                                                       >
                                                            <DeleteBin
                                                                 size={15}
                                                            />
                                                       </div>
                                                  </div>
                                             );
                                        })
                                   }
                              </div>
                              <div className="mb-2 block">
                                   <Label
                                        htmlFor="email"
                                        value="Choose interest"
                                   />
                              </div>
                              <div>
                                   <Select
                                        id="countries"
                                        required
                                        style={buttonStyle}
                                        onChange={handleChange}
                                        value=""
                                   >
                                        <option>choose your interest</option>
                                        {interest?.map((item) => {
                                             return (
                                                  <>
                                                       <option value={item._id}>
                                                            {item.interest}
                                                       </option>
                                                  </>
                                             );
                                        })}
                                   </Select>
                              </div>
                         </div>

                         <div className="w-full">
                              <Button
                                   style={buttonStyle}
                                   onClick={handleSubmit}
                              >
                                   Update
                              </Button>
                         </div>
                    </div>
               </Modal.Body>
          </Modal>
     );
}
