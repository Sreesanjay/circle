import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { joinCommunity } from "../../services/communityService";
import { ICommunity } from "../../types";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({
     community,
     type,
}: {
     community: ICommunity;
     type: string;
}) {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const { user } = useAppSelector((state) => state.auth);
     const [members, setMembers] = useState<string[]>([]);
     const [pendings, setPendings] = useState<string[]>([]);
     useEffect(() => {
          if (community?.members.length) {
               setMembers(
                    community?.members
                         ?.filter((item) => item.status === "active")
                         .map((item) => item.user_id)
               );
               setPendings(
                    community?.members
                         ?.filter((item) => item.status === "pending")
                         .map((item) => item.user_id)
               );
          }
     }, [community.members]);

     return (
          <div className="community-card  rounded-md w-72 h-min bg-gray-900 shadow-lg">
               <div className="icon  w-full h-min">
                    {community.icon ? (
                         <img
                              src={community.icon}
                              alt=""
                              className="w-full h-28 object-cover"
                         />
                    ) : (
                         <div className="icon-with-text h-full flex items-center justify-center bg-gray-700">
                              <h1 className="text-6xl w-full h-28 rounded-full  text-center flex justify-center items-center">
                                   {typeof community?.community_name ===
                                        "string" &&
                                        community.community_name[0]?.toUpperCase()}
                              </h1>
                         </div>
                    )}
               </div>
               <div className="body bg-gray-900 py-3 px-2 h-44 flex flex-col justify-between">
                    <h1 className="title text-wrap text-lg font-medium text-center">
                         {community.community_name}
                    </h1>
                    <div className="stat">
                         <h1 className="text-center text-sm text-slate-400">
                              {members?.length} Members
                         </h1>
                    </div>
                    {type === "my_community" ||
                    members.includes(user?._id as string) ? (
                         <button
                              className="view-community w-full py-2 rounded-md bg-primary hover:bg-primary"
                              onClick={() =>
                                   navigate(`/community/view/${community._id}`)
                              }
                         >
                              View
                         </button>
                    ) : pendings.includes(user?._id as string) ? (
                         <button className="view-community w-full py-2 rounded-md bg-primary">
                              Pending
                         </button>
                    ) : (
                         <button
                              className="view-community w-full py-2 rounded-md bg-primary hover:bg-primary"
                              onClick={() =>
                                   dispatch(joinCommunity(community._id))
                              }
                         >
                              Join
                         </button>
                    )}
               </div>
          </div>
     );
}
