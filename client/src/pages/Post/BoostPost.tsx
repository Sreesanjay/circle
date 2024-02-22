import { useEffect, useState } from "react";
import { IPlan } from "../../types";
import { getPlans } from "../../services/postService";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

export default function BoostPost() {
     const [plans, setPlans] = useState<IPlan[]>([]);
     const { id } = useParams();
     const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
     const [action, setAction] = useState<string>("PROFILE_VISIT");
     useEffect(() => {
          //   toast(action);
     }, [action]);

     useEffect(() => {
          (async () => {
               const response = await getPlans();
               if (response.plan) {
                    setPlans(response.plan);
               }
          })();
     }, []);

     return (
          <section className="post-boos p-10 grid grid-cols-3">
               <div className="plan-selection col-span-3 md:col-span-2">
                    <div className="header mb-10">
                         <h1 className="text-2xl mb-3">Boost Post</h1>
                         <p className="text-sm w-3/4">
                              Boost this post into an ad to increase your reach.
                              We’ll automatically format it for different
                              placements across Circle and run it wherever it’s
                              likely to perform best.
                         </p>
                    </div>

                    <label htmlFor="" className="text-lg">
                         What do you want people to do when they see your ad?
                    </label>
                    <div className="action py-5 flex flex-col gap-3">
                         <div className="list-group w-1/2 flex justify-between">
                              <label htmlFor="">Visit Your Profile</label>
                              <input
                                   type="radio"
                                   value="PROFILE_VISIT"
                                   defaultChecked
                                   name="action"
                                   id=""
                                   onChange={(e) => setAction(e.target.value)}
                              />
                         </div>
                         <div className="list-group w-1/2 flex justify-between">
                              <label htmlFor="">Visit Your Website</label>
                              <input
                                   type="radio"
                                   value="WEBSITE"
                                   name="action"
                                   id=""
                                   onChange={(e) => setAction(e.target.value)}
                              />
                         </div>
                         <div className="list-group w-1/2 flex justify-between">
                              <label htmlFor="">Message You</label>
                              <input
                                   type="radio"
                                   value="MESSAGE"
                                   name="action"
                                   id=""
                                   onChange={(e) => setAction(e.target.value)}
                              />
                         </div>
                    </div>
                    <div className="select-plan my-5">
                         <h1 className="text-lg">Select a plan</h1>
                         <div className="plans-container flex gap-5 mt-3 flex-wrap">
                              {plans.map((plan, index) => {
                                   return (
                                        <div
                                             className={`w-48 h-48 bg-gray-900 rounded-md flex flex-col items-center p-3 shadow-lg ${
                                                  selectedPlan?._id ===
                                                       plan._id && "border"
                                             }`}
                                             key={index}
                                             onClick={() =>
                                                  setSelectedPlan(plan)
                                             }
                                        >
                                             <h1 className="text-4xl">
                                                  ₹{plan.amount}{" "}
                                             </h1>
                                             <p>
                                                  For{" "}
                                                  {Math.floor(
                                                       plan.duration / 30
                                                  )}{" "}
                                                  Month
                                             </p>
                                             <small className="text-center mt-5">
                                                  {plan.discription}
                                             </small>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>
               </div>
               <section className="payment-summary col-span-3 md:col-span-1">
                    <h1 className="text-xl">Boost Summary</h1>

                    <div className="summary mt-5">
                         <ul className="flex flex-col gap-3">
                              <li>
                                   <div className="grid grid-cols-2">
                                        <h1 className="cols-span-1">
                                             Objective
                                        </h1>
                                        <h1 className="col-span-1">
                                             {action === "PROFILE_VISIT"
                                                  ? "Visit Profile"
                                                  : action === "MESSAGE"
                                                  ? "Message You"
                                                  : action === "WEBSITE"
                                                  ? "Visit your Website"
                                                  : null}
                                        </h1>
                                   </div>
                              </li>
                              <li>
                                   <div className="grid grid-cols-2">
                                        <h1 className="col-span-1">Plan</h1>
                                        {selectedPlan && (
                                             <h1 className="col-span-1">
                                                  ₹{selectedPlan?.amount} For{" "}
                                                  {selectedPlan?.duration &&
                                                       selectedPlan?.duration /
                                                            30}{" "}
                                                  Month
                                             </h1>
                                        )}
                                   </div>
                              </li>
                         </ul>
                         <div className="button py-8">
                              <button className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-md">Cancel</button>
                              <button className="pay-button px-3 py-2 ms-5 bg-primary hover:bg-primary-hover rounded-md">
                                   Proceed to play
                              </button>
                         </div>
                    </div>
               </section>
          </section>
     );
}
