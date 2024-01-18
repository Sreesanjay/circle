import { Breadcrumb } from "flowbite-react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { MdOutlineInterests } from "react-icons/md";
import "./Interest.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import NewInterest from "../../../components/Modal/NewInterest";
export default function Interest() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="">
               <NewInterest showModal={showModal} setShowModal={setShowModal}/>
               <AdminSidebar />
               <div className="interest ms-64 p-5">
                    <Breadcrumb aria-label="Default breadcrumb example">
                         <Breadcrumb.Item icon={MdOutlineInterests}>
                              <Link to="/admin/interest">Interest</Link>
                         </Breadcrumb.Item>
                    </Breadcrumb>
                    <header className="header py-5 flex justify-between">
                         <h1 className="text-xl font-medium">Interest</h1>
                         <button className="button bg-primary px-3 py-2 rounded-sm font-medium" onClick={()=>setShowModal(true)}>New Interest</button>
                    </header>
                    <div className="interest-container w-full h-48 bg-slate-100 rounded-lg p-2 grid grid-cols-12">
                         <img
                              src="https://www.shutterstock.com/shutterstock/photos/2165603207/display_1500/stock-vector-happy-world-music-day-and-musical-instruments-with-blue-background-vector-illustration-design-2165603207.jpg"
                              alt=""
                              className="w-44 h-44 rounded-lg col-span-2"
                         />
                         <div className="col-span-3">
                              <h1 className="text-4xl mb-3">Music</h1>
                              <p className="text-sm">
                                   tenetur error, harum nesciunt ipsum debitis
                                   quas aliquid. Reprehenderit, quia. Quo neque
                                   error repudiandae fuga? Ipsa laudantium
                              </p>
                         </div>
                         <div className="col-span-2 flex flex-col items-center">
                              <h1 className="font-medium mb-10 mt-5">Total Users</h1>
                              <h1 className="text-5xl">123</h1>
                         </div>
                         <div className="col-span-2 flex flex-col items-center">
                              <h1 className="font-medium mb-10 mt-5">Total Communities</h1>
                              <h1 className="text-5xl">123</h1>
                         </div>
                         <div className="col-span-2 flex flex-col items-center">
                              <h1 className="font-medium mb-10 mt-5">Total Posts</h1>
                              <h1 className="text-5xl">123</h1>
                         </div>
                         <div className="col-span-1 flex flex-col items-center">
                              <h1>edit</h1>
                         </div>
                         
                    </div>
               </div>
          </div>
     );
}
