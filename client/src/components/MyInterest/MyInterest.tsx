import { IInterest } from "../../types";
import "./MyInterest.css";
import { DeleteBin } from "../../assets/Icons";
import { toast } from "react-toastify";
import API from "../../api";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
// import "./MyInterest.css"

export default function MyInterest({ interest }: { interest: IInterest }) {
     const dispatch = useAppDispatch();
     async function deleteInterest(id: string) {
          try {
               if (id) {
                    const response = await API.delete(
                         `/manage-account/interest/${id}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         dispatch(getUserProfile());
                         toast(response.data);
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
          <div className="card flex shadow-md relative rounded-sm h-min bg-gray-900">
               <img
                    src={interest.image as string}
                    alt=""
                    className="w-32 h-32 object-cover"
               />
               <div className="details ms-3 p-3 ">
                    <h1 className="text-2xl font-medium mb-2">
                         {interest.interest}
                    </h1>
                    <p className="text-sm">{interest.discription}</p>
                    <div
                         className="edit absolute right-0 top-0"
                         onClick={() => deleteInterest(interest._id as string)}
                    >
                         <DeleteBin size={25} />
                    </div>
               </div>
          </div>
     );
}
