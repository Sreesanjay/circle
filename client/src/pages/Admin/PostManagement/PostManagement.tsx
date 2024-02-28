import { useEffect, useState } from "react";
import { IPost } from "../../../types";
import API from "../../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { Breadcrumb, Pagination, Table } from "flowbite-react";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import "./PostManagement.css";
import ViewReports from "../../Reports/ViewReports";
export default function PostManagement() {
     const [analytics, setAnalytics] = useState({
          total_posts: 0,
          todays_posts: 0,
          thismonth_posts: 0,
          this_year_posts: 0,
     });
     const [sort, setSort] = useState("RECENTLTY_CREATED");
     const [page, setPage] = useState(1);
     const [isLoading, setIsLoading] = useState(false);
     const [postList, setPostList] = useState<IPost[]>([]);
     const [reportedId, setReportId] = useState<string | null>(null);
     const [openReport, setOpenReport] = useState(false);
     useEffect(() => {
          (async () => {
               try {
                    setIsLoading(true);
                    const response = await API.get(
                         `/admin/post-management/postlist?page=${page}&&sort=${sort}`
                    );
                    if (response.data) {
                         setPostList(response.data.postList);
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
                         "/admin/post-management/analytics",
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

     async function deletePost(id: string) {
          try {
               const response = await API.delete(
                    `/admin/post-management/remove/${id}`,
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setPostList((current: IPost[]) => {
                         return current.map((item) => {
                              if (item._id === id) {
                                   item.is_delete = true;
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

     async function undoDelete(id: string) {
          try {
               const response = await API.put(
                    `/admin/post-management/undo-remove/${id}`,
                    {},
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setPostList((current: IPost[]) => {
                         return current.map((item) => {
                              if (item._id === id) {
                                   item.is_delete = false;
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
                                   <Breadcrumb.Item href="#">
                                        Post Management
                                   </Breadcrumb.Item>
                              </Breadcrumb>
                              <div className="analytics flex justify-around gap-2 flex-wrap mt-5">
                                   <div className="analytics-card ">
                                        <h1>Total Posts</h1>
                                        <h1 className="text-4xl">
                                             {analytics.total_posts}
                                        </h1>
                                   </div>
                                   <div className="analytics-card">
                                        <h1>New Posts(Today)</h1>
                                        <h1 className="text-4xl">
                                             {analytics.todays_posts}
                                        </h1>
                                   </div>
                                   <div className="analytics-card">
                                        <h1>New Posts(This Month)</h1>
                                        <h1 className="text-4xl">
                                             {analytics.thismonth_posts}
                                        </h1>
                                   </div>
                                   <div className="analytics-card">
                                        <h1>New Posts (This Year)</h1>
                                        <h1 className="text-4xl">
                                             {analytics.this_year_posts}
                                        </h1>
                                   </div>
                              </div>
                              <div className="post-list pe-5">
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
                                                                 "RECENTLTY_CREATED"
                                                            }
                                                       >
                                                            Recently Created
                                                       </option>
                                                       <option
                                                            value={
                                                                 "OLDEST_POST"
                                                            }
                                                       >
                                                            Oldest Posts
                                                       </option>
                                                       <option
                                                            value={"REPORTS"}
                                                       >
                                                            Reports
                                                       </option>
                                                       <option value={"LIKES"}>
                                                            Likes
                                                       </option>
                                                       <option
                                                            value={
                                                                 "LOWEST_LIKES"
                                                            }
                                                       >
                                                            Lowest Likes
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
                                                  content
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  username
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  likes
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  Reports
                                             </Table.HeadCell>
                                             <Table.HeadCell>
                                                  <span className="sr-only">
                                                       Block
                                                  </span>
                                             </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                             {postList?.map(
                                                  (post: IPost, index) => {
                                                       return (
                                                            <Table.Row
                                                                 className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                                 key={index}
                                                            >
                                                                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                      {index}
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      <a
                                                                           href={
                                                                                post.content
                                                                           }
                                                                           target="_blank"
                                                                      >
                                                                           {
                                                                                post.content
                                                                           }
                                                                      </a>
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      {
                                                                           post
                                                                                .user_details
                                                                                .username
                                                                      }
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      {
                                                                           post
                                                                                .likes
                                                                                .length
                                                                      }
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      <button
                                                                           onClick={() => {
                                                                                setReportId(
                                                                                     post._id
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
                                                                           post
                                                                                .reports
                                                                                .length
                                                                      }
                                                                 </Table.Cell>
                                                                 <Table.Cell>
                                                                      {post.is_delete ? (
                                                                           <button
                                                                                onClick={() =>
                                                                                     undoDelete(
                                                                                          post._id
                                                                                     )
                                                                                }
                                                                           >
                                                                                Undo
                                                                           </button>
                                                                      ) : (
                                                                           <button
                                                                                onClick={() =>
                                                                                     deletePost(
                                                                                          post._id
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
                                   <div className="pagination">
                                        <Pagination
                                             currentPage={page}
                                             totalPages={Math.ceil(
                                                  analytics.total_posts / 10
                                             )}
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
