import { useState } from "react";
import Signup from "../../components/Signup/Signup";
import Loader from "../../components/Loader/Loader";

export default function SignupPage() {
     const [isLoading, setIsLoading] = useState<boolean>(false);

     return (
          <>   
               {
                    isLoading ? 
                    <Loader/> 
                    :
                    <Signup setIsLoading={setIsLoading} />
               }
          </>
     );
}
