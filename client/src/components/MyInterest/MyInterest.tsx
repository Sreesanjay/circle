
import { IInterest } from "../../types";
import "./MyInterest.css"
import { DeleteBin } from "../../assets/Icons";

export default function MyInterest({ interest }: { interest: IInterest }) {
     return (
          <div className="card flex shadow-md relative rounded-sm">
               <img src={interest.image} alt="" className="w-32 h-32 object-cover"/>
               <div className="details ms-3 p-3 ">

                    <h1 className="text-2xl font-medium mb-2">{interest.interest}</h1>
                    <p className="text-sm">{interest.discription}</p>
                    <div className="edit absolute right-0 top-0">
                         <DeleteBin size={25}/>
                    </div>
               </div>
          </div>
     );
}
