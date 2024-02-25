import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CommunityCard from "./CommunityCard";
import { getMyCommunity } from "../../services/communityService";
import { resetCommunity } from "../../features/community/communitySlice";

export default function YourCommunity() {
     const dispatch = useAppDispatch();
     const { myCommunity, isSuccess, isError } = useAppSelector(
          (state) => state.community
     );
     useEffect(() => {
          dispatch(getMyCommunity());
     }, [dispatch]);
     useEffect(() => {
          dispatch(resetCommunity());
     }, [isSuccess, isError, dispatch]);

     return (
          <section className="your-community flex p-5 flex-wrap gap-5 justify-evenly bg-gray-800 min-h-full">
               {myCommunity.map((item, index) => {
                    return (
                         <CommunityCard
                              key={index}
                              community={item}
                              type={"my_community"}
                         />
                    );
               })}
          </section>
     );
}
