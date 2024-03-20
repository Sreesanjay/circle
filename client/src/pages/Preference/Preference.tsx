import { Breadcrumb } from "flowbite-react";
import { MdOutlineInterests } from "react-icons/md";
import API from "../../api";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import "./Preference.css";
import { useEffect, useState, lazy } from "react";
// import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Loader from "../../components/Loader/Loader";
import { useAppSelector } from "../../app/hooks";
import MyInterest from "../../components/MyInterest/MyInterest";
import { IInterest } from "../../types";
import { AddIcon } from "../../assets/Icons";
import useHandleError from "../../util/usehandleError";
const AddInterest = lazy(() => import("../../components/Modal/AddInterest"));
//preference page
export default function Preference() {
     const [myInterest, setmyInterest] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const { userProfile } = useAppSelector((state) => state.user);
     const [openAddInterest, setOpenAddInterest] = useState(false);
     const handleError = useHandleError();

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
                    if (err) {
                         handleError(err);
                    }
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userProfile, openAddInterest]);

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="preference-container flex flex-col">
                         <ManageAccSidebar />
                         <div className="preference p-5 m-0 sm:ms-64">
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
                                   <div
                                        onClick={() => setOpenAddInterest(true)}
                                   >
                                        <AddIcon size={58} />
                                   </div>
                                   <AddInterest
                                        openModal={openAddInterest}
                                        setOpenModal={setOpenAddInterest}
                                        myInterest={myInterest}
                                   />
                              </div>
                              {myInterest.length === 0 ? (
                                   <div className="w-full h-96 flex flex-col justify-center items-center">
                                        <img
                                             src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png"
                                             alt=""
                                             className="w-36"
                                        />
                                        <h1 className="text-gray-400">
                                             No Interests found
                                        </h1>
                                   </div>
                              ) : (
                                   <section className="my-interest flex gap-3 flex-wrap">
                                        {myInterest.map((item: IInterest) => {
                                             if (item) {
                                                  return (
                                                       <MyInterest
                                                            interest={item}
                                                            key={item._id}
                                                       />
                                                  );
                                             }
                                        })}
                                   </section>
                              )}
                         </div>
                    </section>
               )}
          </>
     );
}
