import Signup from "../../components/Signup/Signup";
import Loader from "../../components/Loader/Loader";
import { useAppSelector } from "../../app/hooks";

export default function SignupPage() {
     const {isLoading} = useAppSelector((state)=>state.auth)
     return (
          <>   
               {
                    isLoading ? 
                    <Loader/> 
                    :
                    <Signup/>
               }
          </>
     );
}
