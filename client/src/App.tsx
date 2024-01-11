import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/Loader/Loader";
import { useAppSelector } from "./app/hooks";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Demo from "./components/Demo";
import IsAuthenticated from "./components/Route/IsAuthenticated";
const SignupPage = lazy(() => import("./pages/user/SignupPage"));
const SigninPage = lazy(() => import("./pages/user/SigninPage"));

function App() {
     return (
          <>
               <Suspense fallback={<Loader />}>
                    <Routes>
                         <Route element={<IsAuthenticated/>}>
                              <Route path="/signup" element={<SignupPage />} />
                              <Route path="/login" element={<SigninPage />} />
                         </Route>
                         <Route
                              element={<ProtectedRoute allowedRole={"USER"} />}
                         >
                              <Route path="/" element={<Demo />} />
                         </Route>
                    </Routes>
               </Suspense>
          </>
     );
}

export default App;
