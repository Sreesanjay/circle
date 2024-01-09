import { useState } from "react";
import Signup from "../../components/Signup/Signup";

export default function SignupPage() {
     const [isLoading, setIsLoading] = useState(false);

     return (
          <>   
               {
                    isLoading ? 
                    <h1>loading</h1>
                    :
                    <Signup props={setIsLoading} />
               }
          </>
     );
}
