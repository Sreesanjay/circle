import {
     Alert,
     Button,
     FileInput,
     Label,
     Modal,
     TextInput,
     Textarea,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
     ChangeEvent,
     Dispatch,
     SetStateAction,
     useEffect,
     useState,
} from "react";
import validate from "../../util/formValidate";
import { updateInterest } from "../../services/interestService";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { resetInterest } from "../../features/interest/interestSlice";
import { IInterest } from "../../types";

export default function UpdateInterest({
     showModal,
     setShowModal,
     interest,
}: {
     showModal: boolean;
     setShowModal: Dispatch<SetStateAction<boolean>>;
     interest: IInterest;
}) {

     const dispatch = useAppDispatch();
     const { isError, isSuccess, isLoading, errorMessage, status } =
          useAppSelector((state) => state.interest);


     const [formData, setFormData] = useState<IInterest>({
          image: undefined,
          interest: interest.interest,
          discription: interest.discription,
          _id: interest._id,
     });

     const [isSubmit, setIsSubmit] = useState(false);
     const [formError, setFormError] = useState({
          interest: "",
          discription: "",
     });

     function handleChange(
          e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
     ) {
          const { name, value } = e.target;
          if (name == "image" && e.target instanceof HTMLInputElement) {
               setFormData({ ...formData, image: e.target.files?.[0] });
          } else {
               setFormData({ ...formData, [name]: value });
          }
     }

     function handleSubmit() {
          setFormError({
               ...formData,
               interest: validate("interest", formData.interest),
               discription: validate("discription", formData.discription),
          });
          setIsSubmit(true);
     }


     useEffect(() => {
          if (isSubmit) {
               if (!formError.discription && !formError.interest) {
                    dispatch(updateInterest(formData));
                    setIsSubmit(false);
               }
          }
     }, [formError, isSubmit, setShowModal, dispatch, formData]);

     useEffect(() => {
          if (isSuccess) {
               dispatch(resetInterest());
               setShowModal(false);
          } else if (isError && status !== 409) {
               toast(errorMessage);
               dispatch(resetInterest());
          }
     }, [isError, setShowModal, dispatch, isSuccess, errorMessage, status]);
     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <Modal
                         show={showModal}
                         size="md"
                         onClose={() => {
                              setFormData({
                                   image: undefined,
                                   interest: "",
                                   discription: "",
                                   _id:''
                              });

                              setShowModal(false);
                         }}
                         popup
                    >
                         <Modal.Header />
                         <Modal.Body>
                              <div className="space-y-6">
                                   <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Add new interest
                                   </h3>
                                   <div>
                                        {isError && status === 409 ? (
                                             <Alert
                                                  color="failure"
                                                  icon={HiInformationCircle}
                                             >
                                                  <span className="font-medium">
                                                       Alert!
                                                  </span>{" "}
                                                  {errorMessage}
                                             </Alert>
                                        ) : null}
                                        <div className="mb-2 block">
                                             <Label
                                                  htmlFor="file-upload"
                                                  value="Upload file"
                                             />
                                        </div>

                                        <FileInput
                                             id="file-upload"
                                             name="image"
                                             style={{ height: "40px" }}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <div>
                                        <div className="mb-2 block">
                                             <Label
                                                  htmlFor="email1"
                                                  value="Interest"
                                             />
                                        </div>
                                        {formError.interest && (
                                             <span className="text-red-700">
                                                  {formError.interest}
                                             </span>
                                        )}
                                        <TextInput
                                             id="interest"
                                             name="interest"
                                             type="text"
                                             onChange={handleChange}
                                             value={formData.interest}
                                             placeholder="Enter interest name"
                                             style={{ height: "40px" }}
                                             required
                                        />
                                   </div>
                                   <div className="max-w-md">
                                        <div className="mb-2 block">
                                             <Label
                                                  htmlFor="discription"
                                                  value="Discription"
                                             />
                                        </div>
                                        {formError.discription && (
                                             <span className="text-red-700">
                                                  {formError.discription}
                                             </span>
                                        )}
                                        <Textarea
                                             id="discription"
                                             name="discription"
                                             value={formData.discription}
                                             onChange={handleChange}
                                             placeholder="Enter small discription about it"
                                             required
                                             rows={4}
                                        />
                                   </div>

                                   <div className="w-full flex">
                                        <Button
                                             style={{
                                                  height: "40px",
                                                  width: "100px",
                                             }}
                                             className="bg-red-600"
                                             onClick={() => {
                                                  setFormData({
                                                       image: undefined,
                                                       interest: "",
                                                       discription: "",
                                                       _id:''
                                                  });
                                                  setShowModal(false);
                                             }}
                                        >
                                             Cancel
                                        </Button>
                                        <Button
                                             style={{
                                                  height: "40px",
                                                  width: "100px",
                                             }}
                                             className="ms-3 bg-primary"
                                             onClick={handleSubmit}
                                        >
                                             Add
                                        </Button>
                                   </div>
                                   <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300"></div>
                              </div>
                         </Modal.Body>
                    </Modal>
               )}
          </>
     );
}
