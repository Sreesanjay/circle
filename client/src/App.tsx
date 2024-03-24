import { Route, Routes } from "react-router-dom";
import {
     Suspense,
     lazy,
     useEffect,
     useRef,
     createContext,
     RefObject,
} from "react";
import { ToastContainer } from "react-toastify";
import { Socket, io } from "socket.io-client";

import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import IsAuthenticated from "./components/Route/IsAuthenticated";
import Header from "./pages/user/Header";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setOnlineUsers } from "./features/Socket/SocketSlice";
import NotFound from "./components/Route/NotFound";

const Messages = lazy(() => import("./pages/Messages/Messages"));
const Communities = lazy(() => import("./pages/Community/Community"));
const ViewCommunity = lazy(() => import("./pages/Community/ViewCommunity"));
const CommunityManagement = lazy(
     () => import("./pages/Admin/Community/CommunityManagement")
);
const DiscussionManagement = lazy(
     () => import("./pages/Admin/Discussion/DiscussionManagement")
);
const ChatManagement = lazy(() => import("./pages/Admin/Chat/ChatManagement"));
const BoostPost = lazy(() => import("./pages/Post/BoostPost"));
const AccountPage = lazy(() => import("./pages/Account/AccountPage"));
const Verification = lazy(() => import("./pages/Account/Verification"));
const PasswordPrivacy = lazy(
     () => import("./pages/PasswordSecurity/PasswordPrivacy")
);
const FindFriends = lazy(() => import("./pages/FindFriends/FindFriends"));
const AddStory = lazy(() => import("./pages/AddStory/AddStory"));
const MyStory = lazy(() => import("./pages/MyStory/MyStory"));
const ManageCloseFriend = lazy(
     () => import("./pages/ManageCloseFriend/ManageCloseFriend")
);
const ProfileView = lazy(() => import("./pages/ProfileView/ProfileView"));
const UserManagement = lazy(
     () => import("./pages/Admin/UserManagement/UserManagement")
);
const BlockedUsers = lazy(() => import("./pages/BlockedUsers/BlockedUsers"));
const CreatePost = lazy(() => import("./pages/CreatePost/CreatePost"));
const PostManagement = lazy(
     () => import("./pages/Admin/PostManagement/PostManagement")
);
const CreateTextStory = lazy(
     () => import("./pages/CreateStory/CreateTextStory")
);
const ViewStory = lazy(() => import("./pages/ViewStory/ViewStory"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard/Dashboard"));
const Interest = lazy(() => import("./pages/Admin/Interest/Interest"));
const Preference = lazy(() => import("./pages/Preference/Preference"));
const UserProfilePage = lazy(
     () => import("./pages/userProfile/UserProfilePage")
);
const SignupPage = lazy(() => import("./pages/user/SignupPage"));
const SigninPage = lazy(() => import("./pages/user/SigninPage"));
//socket context
export const SocketContext = createContext<RefObject<Socket> | null>(null);
const HOST = "https://my-circle.online"
// const HOST = "http://localhost:5000";
function App() {
     const dispatch = useAppDispatch();
     const { user } = useAppSelector((state) => state.auth);
     const { currentChat } = useAppSelector((state) => state.socket);
     const socket = useRef<Socket | null>(null);
     useEffect(() => {
          if (user) {
               socket.current = io(HOST, {
                    transports: ["websocket"],
               });
               socket?.current?.emit("setup", user?._id);
               socket?.current?.on("connected", (users) => {
                    dispatch(setOnlineUsers(users));
               });
               if (currentChat) {
                    socket?.current?.emit("join-room", currentChat?._id);
               }
               return () => {
                    socket?.current?.disconnect();
               };
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [user]);
     return (
          <div className="bg-gray-800 app min-h-screen text-white">
               <SocketContext.Provider value={socket}>
                    <Header />
               </SocketContext.Provider>
               <Suspense fallback={<Loader />}>
                    <Routes>
                         <Route element={<IsAuthenticated />}>
                              <Route path="/signup" element={<SignupPage />} />
                              <Route path="/login" element={<SigninPage />} />
                         </Route>
                         <Route
                              element={<ProtectedRoute allowedRole={"USER"} />}
                         >
                              <Route path="/" element={<HomePage />} />
                              <Route
                                   path="/profile/*"
                                   element={<UserProfilePage />}
                              />
                              <Route
                                   path="/manage-account"
                                   element={<EditProfile />}
                              />
                              <Route
                                   path="/manage-account/preference"
                                   element={<Preference />}
                              />
                              <Route
                                   path="/manage-account/password&security"
                                   element={<PasswordPrivacy />}
                              />
                              <Route
                                   path="/find-friends"
                                   element={<FindFriends />}
                              />
                              <Route path="/add-story" element={<AddStory />} />
                              <Route path="/my-story" element={<MyStory />} />
                              <Route
                                   path="/add-story/create-text-story"
                                   element={<CreateTextStory />}
                              />
                              <Route
                                   path="/view-story/:initialIndex"
                                   element={<ViewStory />}
                              />
                              <Route
                                   path="/manage-account/close-friends"
                                   element={<ManageCloseFriend />}
                              />
                              <Route
                                   path="/manage-account/account"
                                   element={<AccountPage />}
                              />
                              <Route
                                   path="/manage-account/account/verify-account"
                                   element={<Verification />}
                              />
                              <Route
                                   path="/view-profile/:id"
                                   element={
                                        socket && (
                                             <ProfileView socket={socket} />
                                        )
                                   }
                              />
                              <Route
                                   path="/manage-account/blocked-users"
                                   element={<BlockedUsers />}
                              />
                              <Route
                                   path="/create-post"
                                   element={<CreatePost />}
                              />
                              <Route
                                   path="/messages"
                                   element={
                                        socket && <Messages socket={socket} />
                                   }
                              />
                              {/* community */}
                              <Route
                                   path="/community/:tab"
                                   element={<Communities />}
                              />
                              <Route
                                   path="/community/view/:id"
                                   element={<ViewCommunity />}
                              />

                              <Route
                                   path="/posts/boost/:id"
                                   element={<BoostPost />}
                              />
                         </Route>

                         <Route
                              element={<ProtectedRoute allowedRole={"ADMIN"} />}
                         >
                              <Route path="/admin" element={<Dashboard />} />
                              <Route
                                   path="/admin/interest"
                                   element={<Interest />}
                              />
                              <Route
                                   path="/admin/user-management"
                                   element={<UserManagement />}
                              />
                              <Route
                                   path="/admin/post-management"
                                   element={<PostManagement />}
                              />
                              <Route
                                   path="/admin/community-management"
                                   element={<CommunityManagement />}
                              />
                              <Route
                                   path="/admin/discussion-management"
                                   element={<DiscussionManagement />}
                              />
                              <Route
                                   path="/admin/chat-management"
                                   element={<ChatManagement />}
                              />
                         </Route>
                         <Route path="*" element={<NotFound />} />
                    </Routes>
               </Suspense>

               <ToastContainer />
          </div>
     );
}

export default App;
