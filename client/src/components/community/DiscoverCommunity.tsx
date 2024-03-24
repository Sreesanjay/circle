import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CommunityCard from "./CommunityCard";
import { getAllCommunity } from "../../services/communityService";
import { resetCommunity } from "../../features/community/communitySlice";

export default function DiscoverCommunity() {
     const dispatch = useAppDispatch();
     const { community, isSuccess, isError } = useAppSelector(
          (state) => state.community
     );
     const { user } = useAppSelector((state) => state.auth);
     useEffect(() => {
          dispatch(getAllCommunity());
     }, [dispatch]);
     useEffect(() => {
          dispatch(resetCommunity());
     }, [isSuccess, isError, dispatch]);

     return (
          <section className="your-community flex sm:p-5 flex-wrap gap-5 justify-evenly sm:justify-start bg-gray-800 min-h-full">
               {community.length === 0 ? (
                    <div className="w-full flex justify-center items-center flex-col">
                         <img
                              src="https://png.pngtree.com/svg/20161030/nodata_800056.png"
                              className="w-40"
                              alt=""
                         />
                         <h1 className="text-gray-400">No Communities Found</h1>
                    </div>
               ) : (
                    community.map((item, index) => {
                         const members = item.members
                              .filter((member) => member.status === "active")
                              .map((com) => com.user_id);
                         if (!members.includes(user?._id as string)) {
                              return (
                                   <CommunityCard
                                        key={index}
                                        community={item}
                                        type={"discover"}
                                   />
                              );
                         }
                    })
               )}
          </section>
     );
}
