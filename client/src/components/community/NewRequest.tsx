import { Drawer } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICommunity } from "../../types";
import API from "../../api";
import AddCircle from "@mui/icons-material/AddCircle";
import { useAppDispatch } from "../../app/hooks";
import { acceptJoinRequest } from "../../services/communityService";

export default function NewRequest({
     openDrawer,
     setOpenDrawer,
     community,
}: {
     openDrawer: boolean;
     setOpenDrawer: Dispatch<SetStateAction<boolean>>;
     community: ICommunity | null;
}) {
     const dispatch = useAppDispatch();
     const [userList, setUserList] = useState<
          | {
                 community_id: string;
                 user_id: string;
                 status: string;
                 is_admin: boolean;
                 userProfile: {
                      username: string;
                      verified: boolean;
                      user_id: string;
                      fullname: string;
                      profile_img: string;
                      email: string;
                 };
            }[]
          | []
     >([]);

     useEffect(() => {
          if (community) {
               (async () => {
                    try {
                         const response = await API.get(
                              `/community/pending-request/${community._id}`
                         );
                         if (response.data.userList) {
                              setUserList(response.data.userList);
                         }
                    } catch (error) {
                         console.log(error);
                    }
               })();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [community]);

     function acceptRequest(user_id: string) {
          if (community) {
               dispatch(acceptJoinRequest({ id: community._id, user_id }));
          }
     }

     return (
          <div>
               <Drawer
                    anchor={"right"}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
               >
                    <div className="container bg-gray-900 w-96 h-screen p-5 flex flex-col">
                         <h1 className="text-xl text-white font-medium">
                              New Requests
                         </h1>
                         {userList &&
                              userList.map((item) => {
                                   return (
                                        <div className="member-request-card w-full flex justify-between bg-gray-800 p-2 rounded-md">
                                             <div className="flex gap-3">
                                                  {item.userProfile
                                                       .profile_img ? (
                                                       <img
                                                            src={
                                                                 item
                                                                      .userProfile
                                                                      .profile_img
                                                            }
                                                            alt=""
                                                            className="w-10 h-10 rounded-full"
                                                       />
                                                  ) : (
                                                       <div className="w-10 h-10 bg-gray-900 rounded-full">
                                                            <h1>
                                                                 {
                                                                      item
                                                                           .userProfile
                                                                           .email[0]
                                                                 }
                                                            </h1>
                                                       </div>
                                                  )}
                                                  <h1 className="text-2xl text-slate-400">
                                                       {
                                                            item.userProfile
                                                                 .username
                                                       }
                                                  </h1>
                                             </div>
                                             <div
                                                  className="add-btn text-4xl text-white"
                                                  onClick={() =>
                                                       acceptRequest(
                                                            item.user_id
                                                       )
                                                  }
                                             >
                                                  <AddCircle />
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
               </Drawer>
          </div>
     );
}
