import { Breadcrumb } from "flowbite-react";
import { MdOutlineInterests } from "react-icons/md";
import API from "../../api";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import "./Preference.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Loader from "../../components/Loader/Loader";
import { useAppSelector } from "../../app/hooks";
import MyInterest from "../../components/MyInterest/MyInterest";
import { IInterest } from "../../types";
import { AddIcon } from "../../assets/Icons";
//preference page
export default function Preference() {
     const [myInterest, setmyInterest] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const { userProfile } = useAppSelector((state) => state.user);
     //fetching all the interests
     useEffect(() => {
          (async () => {
               try {
                    setIsLoading(true);
                    const response = await API.post(
                         `/manage-account/interest`,
                         { interest: userProfile?.interest },
                         {
                              withCredentials: true,
                         }
                    );
                    setIsLoading(false);
                    if (response.data) {
                         setmyInterest(response.data.interest);
                    }
               } catch (error) {
                    setIsLoading(false);
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, [userProfile]);

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="preference-container">
                         <ManageAccSidebar />
                         <div className="preference p-5">
                              <Breadcrumb aria-label="Default breadcrumb example">
                                   <Breadcrumb.Item
                                        href="#"
                                        icon={MdOutlineInterests}
                                   >
                                        Preference
                                   </Breadcrumb.Item>
                              </Breadcrumb>

                              <div className="text-lg my-5 font-medium flex items-center justify-between">
                                   My Interest
                                   <div>
                                        <AddIcon size={58} />
                                   </div>
                              </div>
                              <section className="my-interest">
                                   {myInterest.map((item: IInterest) => {
                                        if (item) {
                                             return (
                                                  <MyInterest interest={item} />
                                             );
                                        }
                                   })}
                              </section>
                         </div>
                    </section>
               )}
          </>
     );
}
