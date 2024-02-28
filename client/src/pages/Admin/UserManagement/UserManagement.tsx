import { Breadcrumb, Pagination, Table } from "flowbite-react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import "./UserManagement.css";
import { IUserList } from "../../../types";
import API from "../../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import ViewReports from "../../Reports/ViewReports";

export default function UserManagement() {
     const [analytics, setAnalytics] = useState({
          total_users: 0,
          todays_users: 0,
          thismonth_users: 0,
          this_year_users: 0,
     });
     const [sort, setSort] = useState("RECENTLTY_JOINED");
     const [page, setPage] = useState(1);
     const [isLoading, setIsLoading] = useState(false);
     const [userList, setUserList] = useState<IUserList[]>([]);
     const [reportedId, setReportId] = useState<string | null>(null);
     const [openReport, setOpenReport] = useState(false);
     useEffect(() => {
          (async () => {
               try {
                    setIsLoading(true);
                    const response = await API.get(
                         `/admin/user-management/userlist?page=${page}&&sort=${sort}`,
                         {
                              withCredentials: true,
                         }
                    );
                    if (response.data) {
                         setUserList(response.data.userList);
                         setIsLoading(false);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    setIsLoading(false);
                    toast.error(err.message);
               }
          })();
     }, [page, sort]);

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         "/admin/user-management/analytics",
                         {
                              withCredentials: true,
                         }
                    );
                    if (response.data) {
                         setAnalytics(response.data.analytics);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, []);

     async function blockUser(id: string) {
          try {
               const response = await API.put(
                    `/admin/user-management/block/${id}`,
                    {},
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setUserList((current: IUserList[]) => {
                         return current.map((item) => {
                              if (item._id === id) {
                                   item.is_blocked = true;
                              }
                              return item;
                         });
                    });
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }
     async function unblockUser(id: string) {
          try {
               const response = await API.put(
                    `/admin/user-management/unblock/${id}`,
                    {},
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setUserList((current: IUserList[]) => {
                         return current.map((item) => {
                              if (item._id === id) {
                                   item.is_blocked = false;
                              }
                              return item;
                         });
                    });
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
          }
     }

     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <section className="user-management">
                         <AdminSidebar />
                         <section className="body md:ms-80 py-5">
                              <Breadcrumb aria-label="Default breadcrumb example">
                                   <Breadcrumb.Item href="#" icon={CiUser}>
                                        User Management
                                   </Breadcrumb.Item>
                              </Breadcrumb>
                              <div className="analytics flex justify-around gap-2 flex-wrap mt-5">
                                   <div className="analytics-card">
                                        <h1>Total Users</h1>
                                        <h1 className="text-4xl">
                                             {analytics.total_users}
                                        </h1>
                                   </div>
                                   <div className="analytics-card">
                                        <h1>New Users(Today)</h1>
                                        <h1 className="text-4xl">
                                             {analytics.todays_users}
                                        </h1>
                                   </div>
                                   <div className="analytics-card">
                                        <h1>New Users(This Month)</h1>
                                        <h1 className="text-4xl">
                                             {analytics.thismonth_users}
                                        </h1>
                                   </div>
                                   <div className="analytics-card">
                                        <h1>New Users (This Year)</h1>
                                        <h1 className="text-4xl">
                                             {analytics.this_year_users}
                                        </h1>
                                   </div>
                              </div>
                              <div className="user-list pe-5 text-white">
                                   <h1 className="my-10">User Management</h1>
                                   <section className="filter flex justify-between my-5">
                                        <div className="sort">
                                             <FormControl fullWidth>
                                                  <InputLabel
                                                       variant="standard"
                                                       htmlFor="uncontrolled-native"
                                                  >
                                                       Sort
                                                  </InputLabel>
                                                  <NativeSelect
                                                       defaultValue={sort}
                                                       inputProps={{
                                                            name: "sort",
                                                            id: "uncontrolled-native",
                                                       }}
                                                       onChange={(e) =>
                                                            setSort(
                                                                 e.target.value
                                                            )
                                                       }
                                                  >
                                                       <option
                                                            value={
                                                                 "RECENTLTY_JOINED"
                                                            }
                                                       >
                                                            Recently Joined
                                                       </option>
                                                       <option
                                                            value={
                                                                 "OLDEST_MEMBERS"
                                                            }
                                                       >
                                                            Oldest Members
                                                       </option>
                                                       <option
                                                            value={"REPORTS"}
                                                       >
                                                            Reports
                                                       </option>
                                                       <option
                                                            value={"USERNAME"}
                                                       >
                                                            Username
                                                       </option>
                                                  </NativeSelect>
                                             </FormControl>
                                        </div>
                                        <div className="search">
                                             <input
                                                  type="text"
                                                  placeholder="Search account"
                                                  className="rounded-md text-black"
                                             />
                                        </div>
                                   </section>
                                   <Table hoverable>
                                        <Table.Head>
                                             <Table.HeadCell>
                                                  Si. No
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  Username
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  Email
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  Reports
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  View
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  <span className="sr-only">
                                                       Block
                                                  </span>
                                             </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                             {userList?.map(
                                                  (user: IUserList, index) => {
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
                                                                           user.username
                                                                      }
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      {
                                                                           user.email
                                                                      }
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      {
                                                                           user
                                                                                .reports
                                                                                .length
                                                                      }
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      <button
                                                                           className="text-primary"
                                                                           onClick={() => {
                                                                                setReportId(
                                                                                     user._id
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
                                                                      {user.is_blocked ? (
                                                                           <button
                                                                                onClick={() =>
                                                                                     unblockUser(
                                                                                          user._id
                                                                                     )
                                                                                }
                                                                           >
                                                                                Unblock
                                                                           </button>
                                                                      ) : (
                                                                           <button
                                                                                onClick={() =>
                                                                                     blockUser(
                                                                                          user._id
                                                                                     )
                                                                                }
                                                                           >
                                                                                Block
                                                                           </button>
                                                                      )}
                                                                 </Table.Cell>
                                                            </Table.Row>
                                                       );
                                                  }
                                             )}
                                        </Table.Body>
                                   </Table>
                                   <div className="pagination">
                                        <Pagination
                                             currentPage={page}
                                             totalPages={
                                                  analytics.total_users / 10
                                             }
                                             onPageChange={(newpage: number) =>
                                                  setPage(newpage)
                                             }
                                        />
                                   </div>
                              </div>
                         </section>
                         <ViewReports
                              reportedId={reportedId}
                              openModal={openReport}
                              setOpenModal={setOpenReport}
                         />
                    </section>
               )}
          </>
     );
}
