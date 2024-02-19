import { Drawer } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ICommunity } from "../../types";

export default function CommunityDrawer({
     openDrawer,
     setOpenDrawer,
     community,
}: {
     openDrawer: boolean;
     setOpenDrawer: Dispatch<SetStateAction<boolean>>;
     community: ICommunity | null;
}) {
     return (
          <div>
               <Drawer
                    anchor={"right"}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
               >
                    <div className="container bg-gray-900 w-96 h-screen p-5 flex flex-col items-center">
                         <div className="icon h-28 w-28 bg-gray-700 rounded-full flex items-center justify-center">
                              {community?.icon ? (
                                   <img src={community.icon} alt="" />
                              ) : (
                                   <h1 className="text-5xl text-white">
                                        {community?.community_name[0].toUpperCase()}
                                   </h1>
                              )}
                         </div>
                         <h1 className="text-2xl text-white mt-5">{community?.community_name}</h1>
                    </div>
               </Drawer>
          </div>
     );
}
