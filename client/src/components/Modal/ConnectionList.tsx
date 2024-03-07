import { Modal } from "flowbite-react";
import {
     Dispatch,
     SetStateAction,
     useCallback,
     useEffect,
     useRef,
     useState,
} from "react";
import "./Connection.css";
import API from "../../api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { userList } from "../../types";
import SkeletonLoader from "../Loader/Skeleton";
import { useNavigate } from "react-router-dom";
import { debaunce } from "../../util/debounce";

export default function ConnectionList({
     openModal,
     setOpenModal,
     title,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     title: string;
}) {
     const [users, setUsers] = useState<userList[]>([]);
     const navigate = useNavigate();
     const isSearch = useRef(false);
     const [isLoading, setIsLoading] = useState(false);
     const pagination = useRef(0);
     const scrollRef = useBottomScrollListener(() => fetchUserList(""));

     const fetchUserList = useCallback(
          async (searchKey: string) => {
               setIsLoading(true);
               const url =
                    title === "Following"
                         ? `/users/following?search=${searchKey}&page=${pagination.current}`
                         : `/users/followers?search=${searchKey}&page=${pagination.current}`;
               try {
                    const response = await API.get(url, {
                         withCredentials: true,
                    });
                    if (response.data) {
                         pagination.current = pagination.current + 1;
                         if (isSearch.current) {
                              isSearch.current = false;
                              setUsers(response.data.userList);
                         } else {
                              setUsers((current) => [
                                   ...current,
                                   ...response.data.userList,
                              ]);
                         }
                    }
                    setIsLoading(false);
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
                    setIsLoading(false);
               }
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [title]
     );

     async function unfollowUser(id: string) {
          setIsLoading(true);
          try {
               const response = await API.post(
                    "/users/unfollow",
                    { id },
                    {
                         withCredentials: true,
                    }
               );
               if (response.data) {
                    setUsers((current) =>
                         current.filter((item) => item.user_id !== id)
                    );
               }
               setIsLoading(false);
          } catch (error) {
               const err = error as AxiosError<{
                    message?: string;
                    status?: string;
               }>;
               toast.error(err.message);
               setIsLoading(false);
          }
     }

     useEffect(() => {
          if (openModal) {
               pagination.current = 0;
               fetchUserList("");
          }
     }, [openModal, fetchUserList]);

     const debounceSearch = debaunce((value: string) => {
          fetchUserList(value);
     },500);

     return (
          <Modal
               show={openModal}
               size="md"
               onClose={() => {
                    setUsers([]);
                    setOpenModal(false);
               }}
          >
               <Modal.Header>
                    <div className="space-y-6 text-center">{title}</div>
               </Modal.Header>
               <div
                    className="h-screen overflow-y-scroll userList"
                    ref={scrollRef as React.RefObject<HTMLDivElement>}
               >
                    <Modal.Body>
                         <input
                              type="text"
                              className="rounded-md w-full"
                              onChange={(e) => {
                                   isSearch.current = true;
                                   pagination.current = 0;
                                   debounceSearch(e.target.value);
                              }}
                         />
                         <div className="users-list">
                              {users &&
                                   users.map((user: userList, index) => {
                                        return (
                                             <div
                                                  className="user-card my-4 bg-gray-100 p-2 rounded-md flex items-center gap-3 justify-between"
                                                  key={index}
                                             >
                                                  <div
                                                       className="left flex gap-3"
                                                       onClick={() =>
                                                            navigate(
                                                                 `/view-profile/${user.user_id}`
                                                            )
                                                       }
                                                  >
                                                       {user.profile_img ? (
                                                            <img
                                                                 src={
                                                                      user.profile_img
                                                                 }
                                                                 alt=""
                                                                 className="w-10 rounded-md"
                                                            />
                                                       ) : (
                                                            <h1 className="p-2 px-4 rounded-md bg-gray-400">
                                                                 {user.email[0].toUpperCase()}
                                                            </h1>
                                                       )}
                                                       <div className="name">
                                                            <h1>
                                                                 {user.username}
                                                            </h1>
                                                            <p className="text-sm text-gray-600">
                                                                 {user.fullname}
                                                            </p>
                                                       </div>
                                                  </div>
                                                  {title === "Following" && (
                                                       <button
                                                            className="bg-primary hover:bg-primary-hover px-2 py-1 rounded-md text-white"
                                                            onClick={() =>
                                                                 unfollowUser(
                                                                      user.user_id
                                                                 )
                                                            }
                                                       >
                                                            Unfollow
                                                       </button>
                                                  )}
                                             </div>
                                        );
                                   })}
                         </div>
                         {isLoading && <SkeletonLoader />}
                    </Modal.Body>
               </div>
          </Modal>
     );
}
