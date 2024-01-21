import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import IsAuthenticated from "./components/Route/IsAuthenticated";
import Header from "./pages/user/Header";
import PasswordPrivacy from "./pages/PasswordPrivacy/PasswordPrivacy";
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
          <>
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
                         </Route>
                         <Route
                              element={<ProtectedRoute allowedRole={"ADMIN"} />}
                         >
                              <Route path="/admin" element={<Dashboard />} />
                              <Route
                                   path="/admin/interest"
                                   element={<Interest />}
                              />
                         </Route>
                    </Routes>
               </Suspense>

               <ToastContainer />
          </>
     );
}

export default App;
