import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { Breadcrumb, Pagination, Table } from "flowbite-react";
import "./Discussion.css";
import { IDiscussion } from "../../../types";
import { toast } from "react-toastify";
import { FormControl, NativeSelect } from "@mui/material";
import {
     getAllDiscussions,
     getAnalytics,
     removeDiscussion,
     undoRemoveDiscussion,
} from "../../../services/adminDiscussionService";
import ViewReports from "../../Reports/ViewReports";

export default function DiscussionManagement() {
     const [analytics, setAnalytics] = useState({
          total_discussion: 0,
          todays_discussion: 0,
          thismonth_discussion: 0,
          this_year_discussion: 0,
     });
     const [sort, setSort] = useState("RECENTLTY_CREATED");
     const [page, setPage] = useState(1);
     const [discussionList, setDiscussionList] = useState<IDiscussion[] | []>(
          []
     );
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
               const response = await getAllDiscussions(page, sort);
               if (response.discussionList) {
                    setDiscussionList(response.discussionList);
               }
          })();
     }, [page, sort]);

     async function deleteCommunity(id: string) {
          const response = await removeDiscussion(id);
          if (response.deletedDiscussion) {
               toast.success("discussion removed");
               setDiscussionList((current) => {
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
          const response = await undoRemoveDiscussion(id);
          if (response.discussion) {
               toast.success("discussion recovered");
               setDiscussionList((current) => {
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
                                        {analytics.total_discussion}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community(Today)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.todays_discussion}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community(This Month)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.thismonth_discussion}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community (This Year)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.this_year_discussion}
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
                                             Discussion
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                             username
                                        </Table.HeadCell>
                                        <Table.HeadCell>Likes</Table.HeadCell>
                                        <Table.HeadCell>Reports</Table.HeadCell>
                                        <Table.HeadCell>
                                             <span className="sr-only">
                                                  Block
                                             </span>
                                        </Table.HeadCell>
                                   </Table.Head>
                                   <Table.Body className="divide-y">
                                        {discussionList?.map(
                                             (
                                                  discussion: IDiscussion,
                                                  index
                                             ) => {
                                                  return (
                                                       <Table.Row
                                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                            key={index}
                                                       >
                                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                 {index}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {discussion.content_type ===
                                                                 "TEXT" ? (
                                                                      <p className="max-w-80 text-wrap">
                                                                           {
                                                                                discussion.content
                                                                           }
                                                                      </p>
                                                                 ) : (
                                                                      <img
                                                                           src={
                                                                                discussion.content
                                                                           }
                                                                           className="w-10 h-10"
                                                                           alt=""
                                                                      />
                                                                 )}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {
                                                                      discussion
                                                                           .userProfile
                                                                           .username
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {
                                                                      discussion
                                                                           .likes
                                                                           .length
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 <button
                                                                      onClick={() => {
                                                                           setReportId(
                                                                                discussion._id
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
                                                                      discussion
                                                                           .reports
                                                                           ?.length
                                                                 }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                 {discussion.is_delete ? (
                                                                      <button
                                                                           onClick={() =>
                                                                                undoDelete(
                                                                                     discussion._id
                                                                                )
                                                                           }
                                                                      >
                                                                           Undo
                                                                      </button>
                                                                 ) : (
                                                                      <button
                                                                           onClick={() =>
                                                                                deleteCommunity(
                                                                                     discussion._id
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
                                             analytics.total_discussion / 10
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
