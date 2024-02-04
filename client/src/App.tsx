import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import IsAuthenticated from "./components/Route/IsAuthenticated";
import Header from "./pages/user/Header";
import PasswordPrivacy from "./pages/PasswordSecurity/PasswordPrivacy";
import FindFriends from "./pages/FindFriends/FindFriends";
import AddStory from "./pages/AddStory/AddStory";
import MyStory from "./pages/MyStory/MyStory";
import ManageCloseFriend from "./pages/ManageCloseFriend/ManageCloseFriend";
import ProfileView from "./pages/ProfileView/ProfileView";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import BlockedUsers from "./pages/BlockedUsers/BlockedUsers";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostManagement from "./pages/Admin/PostManagement/PostManagement";
import CreateTextStory from "./pages/CreateStory/CreateTextStory";
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

function App() {
     return (
          <div>
               <Header />
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
                                   path="/profile"
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
                              <Route path="/add-story/create-text-story" element={<CreateTextStory />} />
                              <Route path="/view-story/:initialIndex" element={<ViewStory />} />
                              <Route
                                   path="/manage-account/close-friends"
                                   element={<ManageCloseFriend />}
                              />
                              <Route
                                   path="/view-profile/:id"
                                   element={<ProfileView />}
                              />
                              <Route
                                   path="/manage-account/blocked-users"
                                   element={<BlockedUsers />}
                              />
                              <Route
                                   path="/create-post"
                                   element={<CreatePost />}
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
                         </Route>
                    </Routes>
               </Suspense>

               <ToastContainer />
          </div>
     );
}

export default App;
