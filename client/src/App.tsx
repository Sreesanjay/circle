import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/user/SignupPage";
import SigninPage from "./pages/user/SigninPage";

function App() {
     return (
          <>
            <Routes >
               <Route path='/signup' element={<SignupPage/>}/>
               <Route path='/login' element={<SigninPage/>}/>    
            </Routes>
          </>
     );
}

export default App;
