import { Breadcrumb } from "flowbite-react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { BarChart } from "@mui/x-charts/BarChart";

import "./Dashboard.css";
import { useEffect, useRef, useState } from "react";
import {
     getDashboardAnalytics,
     getUserReport,
} from "../../../services/adminDashboard";
export default function Dashboard() {
     const [analytics, setAnalytics] = useState({
          total_users: 0,
          total_posts: 0,
          total_community: 0,
          total_discussions: 0,
     });
     const [yearRange, setYearRange] = useState<number[]>([]);
     const [userReport, setUserReport] = useState({
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
     });
     const containerRef = useRef<HTMLOptionElement | null>(null);
     const [year, setYear] = useState<number>(1111);
     // const [date, setDate] = useState<number>(1111);
     useEffect(() => {
          const date = new Date();
          // setDate(date.getFullYear());
          setYear(date.getFullYear());
          const arr = [];
          for (
               let yearCount = date.getFullYear();
               yearCount >= 2020;
               yearCount--
          ) {
               arr.push(yearCount);
          }
          setYearRange(arr);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     useEffect(() => {
          (async () => {
               const response = await getDashboardAnalytics();
               if (response.analytics) {
                    setAnalytics(response.analytics);
               }
          })();
     }, []);

     useEffect(() => {
          (async () => {
               if (year > 1111) {
                    const response = await getUserReport(year);
                    if (response.userCount) {
                         setUserReport(response.userCount);
                    }
               }
          })();
     }, [year]);

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
                              <h1 className="text-4xl">
                                   {analytics.total_users}
                              </h1>
                         </div>
                         <div className="analytics-card">
                              <h1>Total Posts</h1>
                              <h1 className="text-4xl">
                                   {analytics.total_posts}
                              </h1>
                         </div>
                         <div className="analytics-card">
                              <h1>Total Community</h1>
                              <h1 className="text-4xl">
                                   {analytics.total_community}
                              </h1>
                         </div>
                         <div className="analytics-card">
                              <h1>Total Discussions</h1>
                              <h1 className="text-4xl">
                                   {analytics.total_discussions}
                              </h1>
                         </div>
                    </section>
                    <section className="chart-header p-5 flex justify-between">
                         <h1 className="text-xl">New Users</h1>
                         <select
                              className="border h-min w-36 rounded-md bg-gray-700"
                              value={year}
                              onChange={(e) => setYear(Number(e.target.value))}
                         >
                              {yearRange &&
                                   yearRange.map((currentYear, index) => {
                                        return (
                                             <option
                                                  value={currentYear}
                                                  key={index}
                                             >
                                                  {currentYear}
                                             </option>
                                        );
                                   })}
                              {/* <option value={date}>{date}</option>
                              <option value={date - 1}>{date - 1}</option>
                              <option value={date - 2}>{date - 2}</option>
                              <option value={date - 3}>{date - 3}</option> */}
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
                                             userReport.January,
                                             userReport.February,
                                             userReport.March,
                                             userReport.April,
                                             userReport.May,
                                             userReport.June,
                                             userReport.July,
                                             userReport.August,
                                             userReport.September,
                                             userReport.October,
                                             userReport.November,
                                             userReport.December,
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
