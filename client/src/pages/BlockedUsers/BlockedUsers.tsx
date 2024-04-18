import { useEffect, useState } from "react";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import { IUserList } from "../../types";
import { MdBlock } from "react-icons/md";
import useHandleError from "../../util/usehandleError";
import { AxiosError } from "axios";
import API from "../../api";
import { Breadcrumb } from "flowbite-react";
import { ProfileIconWithText } from "../../assets/Icons";
export default function BlockedUsers() {
     const [userList, setUserList] = useState<IUserList[]>([]);
     const handleError = useHandleError();

     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         "/manage-account/blocked-users",
                         {
                              withCredentials: true,
                         }
                    );
                    if (response.data) {
                         setUserList(response.data.userList);
                    }
               } catch (error) {
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
     }, []);

     async function unBlockUser(id: string) {
          try {
               const response = await API.get(`/users/unblock-user/${id}`, {
                    withCredentials: true,
               });
               if (response.data) {
                    setUserList((current) => {
                         return current.filter((item) => {
                              return item.user_id !== id;
                         });
                    });
               }
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               if (err) {
                    handleError(err);
               }
          }
     }

     return (
          <div className="flex flex-col">
               <ManageAccSidebar />
               <section className="blocked-users p-5 m-0 sm:ms-64">
                    <Breadcrumb aria-label="Default breadcrumb example">
                         <Breadcrumb.Item href="#" icon={MdBlock}>
                              Blocked Users
                         </Breadcrumb.Item>
                    </Breadcrumb>
                    {userList.length === 0 ? (
                         <div className="w-full h-96 flex flex-col justify-center items-center">
                              <img
                                   src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png"
                                   alt=""
                                   className="w-36"
                              />
                              <h1 className="text-gray-400">
                                   No blocked users
                              </h1>
                         </div>
                    ) : (
                         <div className="user-list mt-5 flex flex-wrap gap-5">
                              {userList &&
                                   userList.map((user) => {
                                        return (
                                             <div className="user-card rounded-md shadow-md  w-40 p-2 flex flex-col items-center justify-center bg-gray-900">
                                                  {user.profile_img ? (
                                                       <img
                                                            src={
                                                                 user.profile_img
                                                            }
                                                            alt=""
                                                            className="rounded-md mb-2"
                                                       />
                                                  ) : (
                                                       <ProfileIconWithText
                                                            email={user.username}
                                                            size="large"
                                                       />
                                                  )}
                                                  <h1>{user.username}</h1>
                                                  <button
                                                       className="mt-5 mb-2 bg-primary hover:bg-primary-hover px-3 py-1 rounded-md text-white"
                                                       onClick={() =>
                                                            unBlockUser(
                                                                 user.user_id
                                                            )
                                                       }
                                                  >
                                                       Unblock
                                                  </button>
                                             </div>
                                        );
                                   })}
                         </div>
                    )}
               </section>
          </div>
     );
}
