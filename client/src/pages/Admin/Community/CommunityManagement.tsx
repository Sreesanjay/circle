import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import {
     getAllCommunity,
     getAnalytics,
     removeCommunity,
     undoRemoveCommunity,
} from "../../../services/adminCommunityService";
import { Breadcrumb, Pagination, Table } from "flowbite-react";
import "./Community.css";
import { ICommunity } from "../../../types";
import { toast } from "react-toastify";
import { FormControl, NativeSelect } from "@mui/material";
import ViewReports from "../../Reports/ViewReports";

export default function CommunityManagement() {
     const [analytics, setAnalytics] = useState({
          total_community: 0,
          todays_community: 0,
          thismonth_community: 0,
          this_year_community: 0,
     });
     const [sort, setSort] = useState("RECENTLTY_CREATED");
     const [page, setPage] = useState(1);
     const [communityList, setCommunityList] = useState<ICommunity[] | []>([]);
     const [reportedId, setReportId] = useState<string | null>(null);
     const [openReport, setOpenReport] = useState(false);

     //fetching the analytics for community
     useEffect(() => {
          (async () => {
               const response = await getAnalytics();
               if (response.analytics) {
                    setAnalytics(response.analytics);
               }
          })();
     }, []);

     //fetching communities
     useEffect(() => {
          (async () => {
               const response = await getAllCommunity(page, sort);
               if (response.communityList) {
                    setCommunityList(response.communityList);
               }
          })();
     }, [page, sort]);

     async function deleteCommunity(id: string) {
          const response = await removeCommunity(id);
          if (response.community) {
               toast.success("community removed");
               setCommunityList((current) => {
                    return current.map((item) => {
                         if (item._id === id) {
                              item.is_delete = true;
                         }
                         return item;
                    });
               });
          }
     }
     async function undoDelete(id: string) {
          const response = await undoRemoveCommunity(id);
          if (response.community) {
               toast.success("community recovered");
               setCommunityList((current) => {
                    return current.map((item) => {
                         if (item._id === id) {
                              item.is_delete = false;
                         }
                         return item;
                    });
               });
          }
     }

     return (
          <div>
               <div className="community-management">
                    <AdminSidebar />
                    <section className="body md:ms-80 py-5">
                         <Breadcrumb aria-label="Default breadcrumb example">
                              <Breadcrumb.Item href="#">
                                   Post Management
                              </Breadcrumb.Item>
                         </Breadcrumb>
                         <section className="analytics flex justify-around gap-2 flex-wrap mt-5">
                              <div className="analytics-card ">
                                   <h1>Total Communities</h1>
                                   <h1 className="text-4xl">
                                        {analytics.total_community}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community(Today)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.todays_community}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community(This Month)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.thismonth_community}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community (This Year)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.this_year_community}
                                   </h1>
                              </div>
                         </section>
                         <section className="filter flex items-center justify-between my-5 px-5">
                              <div className="sort">
                                   <FormControl fullWidth>
                                        <label htmlFor="uncontrolled-native">
                                             Sort
                                        </label>
                                        <NativeSelect
                                             defaultValue={sort}
                                             inputProps={{
                                                  name: "sort",
                                                  id: "uncontrolled-native",
                                             }}
                                             onChange={(e) =>
                                                  setSort(e.target.value)
                                             }
                                        >
                                             <option
                                                  value={"RECENTLTY_CREATED"}
                                             >
                                                  Recently Created
                                             </option>
                                             <option value={"OLDEST_COMMUNITY"}>
                                                  Oldest Posts
                                             </option>
                                             <option value={"REPORTS"}>
                                                  Reports
                                             </option>
                                        </NativeSelect>
                                   </FormControl>
                              </div>
                              <div className="search">
                                   <input
                                        type="text"
                                        placeholder="Search Communities"
                                        className="rounded-md text-black"
                                   />
                              </div>
                         </section>
                         <section className="community-list py-5 pe-5 overflow-x-scroll">
                              <Table hoverable>
                                   <Table.Head>
                                        <Table.HeadCell>Si. No</Table.HeadCell>
                                        <Table.HeadCell>
                                             Community name
                                        </Table.HeadCell>
                                        <Table.HeadCell>Privacy</Table.HeadCell>
                                        <Table.HeadCell>
                                             Total members
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                           
                                        </Table.HeadCell>
                                        <Table.HeadCell>Reports</Table.HeadCell>
                                        <Table.HeadCell>
                                             <span className="sr-only">
                                                  Block
                                             </span>
                                        </Table.HeadCell>
                                   </Table.Head>
                                   <Table.Body className="divide-y">
                                        {communityList?.map(
                                             (community: ICommunity, index) => {
                                                  return (
                                                       <Table.Row
                                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                            key={index}
                                                       >
                                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                 {index}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {
                                                                      community.community_name
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {
                                                                      community.privacy
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {
                                                                      community
                                                                           .members
                                                                           .length
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 <button
                                                                      onClick={() => {
                                                                           setReportId(
                                                                                community._id
                                                                           );
                                                                           setOpenReport(
                                                                                true
                                                                           );
                                                                      }}
                                                                 >
                                                                      View
                                                                 </button>
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {
                                                                      community
                                                                           .reports
                                                                           ?.length
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {community.is_delete ? (
                                                                      <button
                                                                           onClick={() =>
                                                                                undoDelete(
                                                                                     community._id
                                                                                )
                                                                           }
                                                                      >
                                                                           Undo
                                                                      </button>
                                                                 ) : (
                                                                      <button
                                                                           onClick={() =>
                                                                                deleteCommunity(
                                                                                     community._id
                                                                                )
                                                                           }
                                                                           className="text-red-600"
                                                                      >
                                                                           Delete
                                                                      </button>
                                                                 )}
                                                            </Table.Cell>
                                                       </Table.Row>
                                                  );
                                             }
                                        )}
                                   </Table.Body>
                              </Table>
                              <div className="pagination mt-5">
                                   <Pagination
                                        currentPage={page}
                                        totalPages={Math.ceil(
                                             analytics.total_community / 10
                                        )}
                                        onPageChange={(newpage: number) =>
                                             setPage(newpage)
                                        }
                                   />
                              </div>
                         </section>
                    </section>
               </div>
               <ViewReports
                    reportedId={reportedId}
                    openModal={openReport}
                    setOpenModal={setOpenReport}
               />
          </div>
     );
}
