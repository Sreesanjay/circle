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
          <section className="your-community flex p-5 flex-wrap justify-center sm:justify-start gap-10 bg-gray-800 min-h-full">
               {myCommunity.length === 0 ? (
                    <div className="w-full flex justify-center items-center flex-col">
                         <img
                              src="https://png.pngtree.com/svg/20161030/nodata_800056.png"
                              className="w-40"
                              alt=""
                         />
                         <h1 className="text-gray-400">No Communities Found</h1>
                    </div>
               ) : (
                    myCommunity.map((item, index) => {
                         return (
                              <CommunityCard
                                   key={index}
                                   community={item}
                                   type={"my_community"}
                              />
                         );
                    })
               )}
          </section>
     );
}
