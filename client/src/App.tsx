import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import IsAuthenticated from "./components/Route/IsAuthenticated";
import Header from "./pages/user/Header";
import EditProfile from "./pages/EditProfile/EditProfile";
import HomePage from "./pages/HomePage/HomePage";
const UserProfilePage =lazy(() => import("./pages/userProfile/UserProfilePage"));
const SignupPage = lazy(() => import("./pages/user/SignupPage"));
const SigninPage = lazy(() => import("./pages/user/SigninPage"));

function App() {
     console.log("reloaded");
     return (
          <>   
               <Header/>
               <Suspense fallback={<Loader />}>
                    <Routes>
                         <Route element={<IsAuthenticated />}>
                              <Route path="/signup" element={<SignupPage />} />
                              <Route path="/login" element={<SigninPage />} />
                         </Route>
                         <Route element={<ProtectedRoute allowedRole={"USER"} />}>
                              <Route path="/" element={<HomePage/>} />
                              <Route path="/profile" element={<UserProfilePage/>}/>
                              <Route path="/profile/manage-account">
                                   <Route path="/profile/manage-account"  element={<EditProfile/>}/>
                              </Route>
                         </Route>
                    </Routes>
               </Suspense>

               <ToastContainer />
          </>
     );
}

export default App;
