import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/user/SignupPage";

function App() {
     return (
          <>
            <Routes >
               <Route path='/signup' element={<SignupPage/>}/>
            </Routes>
          </>
     );
}

export default App;
