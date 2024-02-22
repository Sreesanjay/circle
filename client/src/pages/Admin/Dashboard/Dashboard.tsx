import { Breadcrumb } from "flowbite-react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { BarChart } from "@mui/x-charts/BarChart";

import "./Dashboard.css";
import { useEffect, useRef, useState } from "react";
export default function Dashboard() {
     const containerRef = useRef<HTMLOptionElement | null>(null);
     const [year, setYear] = useState<number>(1111);
     const [date, setDate] = useState<number>(1111);
     useEffect(() => {
          const date = new Date();
          setDate(date.getFullYear());
          setYear(date.getFullYear());
     }, []);

     useEffect(()=>{
         
     },[year])

     useEffect(() => {
          const handleResize = () => {
               if (containerRef.current) {
                    const width = containerRef.current?.clientWidth - 20;
                    const height = width * 0.5;

                    // Update state with the new dimensions
                    setDimensions({ width, height });
               }
          };
          // Attach resize event listener
          window.addEventListener("resize", handleResize);
          // Initial call to set dimensions
          handleResize();
          // Cleanup on component unmount
          return () => window.removeEventListener("resize", handleResize);
     }, []);

     const [dimensions, setDimensions] = useState({
          width: 500,
          height: 300,
     });
     return (
          <div>
               <AdminSidebar />
               <section className="body md:ms-80 py-5">
                    <Breadcrumb aria-label="Default breadcrumb example">
                         <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <section className="analytics flex w-full justify-around mt-5 gap-2">
                         <div className="analytics-card">
                              <h1>Total Users</h1>
                              <h1 className="text-4xl">52</h1>
                         </div>
                         <div className="analytics-card">
                              <h1>Total Users</h1>
                              <h1 className="text-4xl">32</h1>
                         </div>
                         <div className="analytics-card">
                              <h1>Total Users</h1>
                              <h1 className="text-4xl">13</h1>
                         </div>
                         <div className="analytics-card">
                              <h1>Total Users</h1>
                              <h1 className="text-4xl">51</h1>
                         </div>
                    </section>
                    <section className="chart-header p-5 flex justify-between">
                         <h1 className="text-xl">New Users</h1>
                         <select
                              className="border h-min w-36 rounded-md bg-gray-700"
                              value={year}
                              onChange={(e) => setYear(Number(e.target.value))}
                         >
                              <option value={date}>{date}</option>
                              <option value={date - 1}>{date - 1}</option>
                              <option value={date - 2}>{date - 2}</option>
                              <option value={date - 3}>{date - 3}</option>
                         </select>
                    </section>
                    <section
                         className="main-diagram "
                         ref={containerRef}
                         style={{ width: "100%", height: "100%" }}
                    >
                         <BarChart
                              xAxis={[
                                   {
                                        id: "barCategories",
                                        data: [
                                             "January",
                                             "February",
                                             "March",
                                             "April",
                                             "May",
                                             "June",
                                             "July",
                                             "Augest",
                                             "September",
                                             "October",
                                             "November",
                                             "December",
                                        ],
                                        scaleType: "band",
                                   },
                              ]}
                              series={[
                                   {
                                        data: [
                                             2, 5, 3, 5, 3, 5, 2, 3, 2, 3, 5, 6,
                                        ],
                                   },
                              ]}
                              width={dimensions.width}
                              height={dimensions.height}
                         />
                    </section>
               </section>
          </div>
     );
}
