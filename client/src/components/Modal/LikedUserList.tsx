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
import SkeletonLoader from "../Loader/Skeleton";
import { useNavigate } from "react-router-dom";
import { userList } from "../../types";
export default function LikedUserList({
     openModal,
     setOpenModal,
     post_id,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     post_id: string;
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
               const url = `/posts/liked-user-list/${post_id}?search=${searchKey}&page=${pagination.current}`;
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
          [post_id]
     );

     useEffect(() => {
          if (openModal) {
               pagination.current = 0;
               fetchUserList("");
          }
     }, [openModal, fetchUserList]);

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
                    <div className="space-y-6 text-center mb-3">Likes</div>
               </Modal.Header>
               <div
                    className="h-96 overflow-y-scroll userList"
                    ref={scrollRef as React.RefObject<HTMLDivElement>}
               >
                    <Modal.Body>
                         <div className="users-list">
                              <input
                                   type="text"
                                   className="rounded-md w-full"
                                   onChange={(e) => {
                                        isSearch.current = true;
                                        pagination.current = 0;
                                        fetchUserList(e.target.value);
                                   }}
                              />
                              {users &&
                                   users.map((user: userList, index) => {
                                        return (
                                             <div
                                                  className="user-card my-4 bg-gray-100 p-2 rounded-md flex items-center gap-3 justify-between"
                                                  key={index}
                                                  onClick={() =>
                                                       navigate(
                                                            `/view-profile/${user.user_id}`
                                                       )
                                                  }
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
