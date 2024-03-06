import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { Breadcrumb, Pagination, Table } from "flowbite-react";
import "./Chat.css";
import { IChat } from "../../../types";
import { toast } from "react-toastify";
import { FormControl, NativeSelect } from "@mui/material";
import {
     getAllGroups,
     getAnalytics,
     removeChat,
     undoRemoveChat,
} from "../../../services/adminChat";
import ViewReports from "../../Reports/ViewReports";

export default function ChatManagement() {
     const [analytics, setAnalytics] = useState({
          total_chat: 0,
          todays_chat: 0,
          thismonth_chat: 0,
          this_year_chat: 0,
     });
     const [sort, setSort] = useState("RECENTLTY_CREATED");
     const [page, setPage] = useState(1);
     const [chatList, setChatList] = useState<IChat[] | []>([]);
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
               const response = await getAllGroups(page, sort);
               if (response.groups) {
                    setChatList(response.groups);
               }
          })();
     }, [page, sort]);

     async function deleteChat(id: string) {
          const response = await removeChat(id);
          if (response.chat) {
               setChatList((current) => {
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
          const response = await undoRemoveChat(id);
          if (response.chat) {
               toast.success("chat recovered");
               setChatList((current) => {
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
                                        {analytics.total_chat}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community(Today)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.todays_chat}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community(This Month)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.thismonth_chat}
                                   </h1>
                              </div>
                              <div className="analytics-card">
                                   <h1>New community (This Year)</h1>
                                   <h1 className="text-4xl">
                                        {analytics.this_year_chat}
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
                                             <option value={"OLDEST_CHAT"}>
                                                  Oldest Chats
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
                                             Chat Name
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                             Total Members
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                             Created On
                                        </Table.HeadCell>
                                        <Table.HeadCell>View</Table.HeadCell>
                                        <Table.HeadCell>Reports</Table.HeadCell>
                                        <Table.HeadCell>
                                             <span className="sr-only">
                                                  Delete
                                             </span>
                                        </Table.HeadCell>
                                   </Table.Head>
                                   <Table.Body className="divide-y">
                                        {chatList?.map((chat: IChat, index) => {
                                             return (
                                                  <Table.Row
                                                       className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                       key={index}
                                                  >
                                                       <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            {index}
                                                       </Table.Cell>
                                                       <Table.Cell>
                                                            {chat.is_groupchat
                                                                 ? chat.chat_name
                                                                 : "Personal chat"}
                                                       </Table.Cell>
                                                       <Table.Cell>
                                                            {
                                                                 chat.members
                                                                      .length
                                                            }
                                                       </Table.Cell>
                                                       <Table.Cell>
                                                            {new Date(
                                                                 chat.createdAt
                                                            ).getDay()}{" "}
                                                            /{" "}
                                                            {new Date(
                                                                 chat.createdAt
                                                            ).getMonth()}
                                                            /
                                                            {new Date(
                                                                 chat.createdAt
                                                            ).getFullYear()}
                                                       </Table.Cell>
                                                       <Table.Cell>
                                                            <button
                                                                 onClick={() => {
                                                                      setReportId(
                                                                           chat._id
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
                                                                 chat.reports
                                                                      ?.length
                                                            }
                                                       </Table.Cell>
                                                       <Table.Cell>
                                                            {chat.is_delete ? (
                                                                 <button
                                                                      onClick={() =>
                                                                           undoDelete(
                                                                                chat._id
                                                                           )
                                                                      }
                                                                 >
                                                                      Undo
                                                                 </button>
                                                            ) : (
                                                                 <button
                                                                      onClick={() =>
                                                                           deleteChat(
                                                                                chat._id
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
                                        })}
                                   </Table.Body>
                              </Table>
                              <div className="pagination mt-5">
                                   <Pagination
                                        currentPage={page}
                                        totalPages={Math.ceil(
                                             analytics.total_chat / 10
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
