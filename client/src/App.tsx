import { Route, Routes } from "react-router-dom";
import {Suspense, lazy} from "react"
import Loader from "./components/Loader/Loader";

const SignupPage = lazy(() => import("./pages/user/SignupPage"))
const SigninPage = lazy(() => import("./pages/user/SigninPage"))

function App() {
     return (
          <>
          <Suspense fallback={<Loader/>}>
            <Routes >
               <Route path='/signup' element={<SignupPage/>}/>
               <Route path='/login' element={<SigninPage/>}/>    
            </Routes>
          </Suspense>
          </>
     );
}

export default App;
