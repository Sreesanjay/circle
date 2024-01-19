import { Breadcrumb } from "flowbite-react";
import { MdOutlineInterests } from "react-icons/md";
import API from "../../api";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import "./Preference.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Loader from "../../components/Loader/Loader";

export default function Preference() {
     const [interest, setInterest] = useState();
     const [isLoading, setIsLoading] = useState(false);
     //fetching all the interests
     useEffect(() => {
          (async () => {
               try {
                    setIsLoading(true);
                    const response = await API.get(`/manage-account/interest`, {
                         withCredentials: true,
                    });
                    setIsLoading(false);
                    if (response.data) {
                         setInterest(response.data);
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
     }, []);
     return (
          <>
               {
                isLoading ? <Loader/> :
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

                              <h1 className="text-lg my-5 font-medium">
                                   My Interest
                              </h1>
                         </div>
                    </section>
               }
          </>
     );
}
