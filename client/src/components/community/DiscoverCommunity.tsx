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
          <section className="your-community flex p-5 flex-wrap gap-5 justify-evenly bg-gray-800 min-h-full">
               {community.map((item, index) => {
                    const members = item.members
                         .filter((member) => member.status !== "active")
                         .map((com) => com.user_id);
                    if (members.includes(user?._id as string)) {
                         return (
                              <CommunityCard
                                   key={index}
                                   community={item}
                                   type={"discover"}
                              />
                         );
                    }
               })}
          </section>
     );
}
