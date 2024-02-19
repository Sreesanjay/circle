import AddCircle from "@mui/icons-material/AddCircle";
import "./Community.css";
import { useState } from "react";
import NewCommunity from "../../components/Modal/NewCommunity";
import YourCommunity from "../../components/community/YourCommunity";
import DiscoverCommunity from "../../components/community/DiscoverCommunity";
import { useNavigate, useParams } from "react-router-dom";

export default function Communities() {
     const { tab } = useParams();
     const navigate = useNavigate();
     const [currentTab, setCurrentTab] = useState<string>(
          (tab as string).toUpperCase()
     );
     const [showNewCommunity, setShowNewCommunity] = useState(false);
     return (
          <div className="grid grid-cols-12">
               <NewCommunity
                    showModal={showNewCommunity}
                    setShowModal={setShowNewCommunity}
               />
               <section className="sidebar col-span-3 bg-gray-900 flex flex-col p-5 py-8">
                    <h1 className="text-2xl">Community</h1>
                    <div className="search my-5">
                         <input
                              type="text"
                              placeholder="search communities"
                              className="bg-gray-800 rounded-md w-full"
                         />
                    </div>
                    <div className="nav flex flex-col gap-3">
                         <div
                              className={`item hover:bg-gray-800 ${
                                   currentTab === "RECENT_DISCUSSIONS" &&
                                   "bg-gray-800"
                              }  rounded-md p-5 py-3`}
                              onClick={() => {
                                   setCurrentTab("RECENT_DISCUSSIONS");
                                   navigate("/community/recent_discussions");
                              }}
                         >
                              <h2 className="text-lg">Recent Discussions</h2>
                         </div>
                         <div
                              className={`item hover:bg-gray-800 ${
                                   currentTab === "DISCOVER" && "bg-gray-800"
                              }  rounded-md p-5 py-3`}
                              onClick={() => {
                                   setCurrentTab("DISCOVER");
                                   navigate("/community/discover");
                              }}
                         >
                              <h2 className="text-lg">Discover</h2>
                         </div>
                         <div
                              className={`item hover:bg-gray-800 ${
                                   currentTab === "YOUR_COMMUNITY" &&
                                   "bg-gray-800"
                              }  rounded-md p-5 py-3`}
                              onClick={() => {
                                   setCurrentTab("YOUR_COMMUNITY");
                                   navigate("/community/your_community");
                              }}
                         >
                              <h2 className="text-lg">Your Community</h2>
                         </div>
                    </div>
                    <div className="new-community mt-7 px-5 py-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-md">
                         <button
                              className="text-lg flex gap-3"
                              onClick={() => setShowNewCommunity(true)}
                         >
                              <div className="text-primary">
                                   <AddCircle />
                              </div>
                              Community
                         </button>
                    </div>
               </section>
               <section className="feeds col-span-9 bg-blue-700">
                    {currentTab === "RECENT_DISCUSSIONS" ? (
                         <h1>Recent discussion</h1>
                    ) : currentTab === "DISCOVER" ? (
                         <DiscoverCommunity />
                    ) : currentTab === "YOUR_COMMUNITY" ? (
                         <YourCommunity />
                    ) : null}
               </section>
          </div>
     );
}
