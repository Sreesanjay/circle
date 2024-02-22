import { Breadcrumb } from "flowbite-react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { MdOutlineInterests } from "react-icons/md";
import "./Interest.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import NewInterest from "../../../components/Modal/NewInterest";
import { getAllInterests } from "../../../services/interestService";
import Loader from "../../../components/Loader/Loader";
import InterestCard from "../../../components/InterestCard/InterestCard";
import { resetInterest } from "../../../features/interest/interestSlice";
export default function Interest() {
     const [showModal, setShowModal] = useState(false);
     const { interest, isLoading ,isSuccess, isError} = useAppSelector((state) => state.interest);
     const dispatch = useAppDispatch();
     useEffect(() => {
          dispatch(getAllInterests());
     }, [dispatch]);
     
     useEffect(() => {
          if(isSuccess || isError){
               dispatch(resetInterest())
          }
     }, [isSuccess, isError, dispatch]);

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <div className="">
                         <NewInterest
                              showModal={showModal}
                              setShowModal={setShowModal}
                         />
                         <AdminSidebar />
                         <div className="interest md:ms-80 p-5">
                              <Breadcrumb aria-label="Default breadcrumb example">
                                   <Breadcrumb.Item icon={MdOutlineInterests}>
                                        <Link to="/admin/interest">
                                             Interest
                                        </Link>
                                   </Breadcrumb.Item>
                              </Breadcrumb>
                              <header className="header py-5 flex justify-between">
                                   <h1 className="text-xl font-medium">
                                        Interest
                                   </h1>
                                   <button
                                        className="button bg-primary px-3 py-2 rounded-sm font-medium"
                                        onClick={() => setShowModal(true)}
                                   >
                                        New Interest
                                   </button>
                              </header>
                              {interest?.map((item) => {
                                   return <InterestCard interest={item} />;
                              })}
                         </div>
                    </div>
               )}
          </>
     );
}
