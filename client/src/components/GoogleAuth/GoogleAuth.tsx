import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useAppDispatch } from "../../app/hooks";
import { googleAuth } from "../../services/authService";
import { toast } from "react-toastify";
export default function GoogleAuth() {
     const dispatch = useAppDispatch();

     const responseGoogle = async (response: CredentialResponse) => {
          if (response.credential) {
               dispatch(googleAuth(response.credential));
          }
     };
     const responseError = async (): Promise<void> => {
          toast.error("error occured")
     };
     return (
          <>
               <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
                    <GoogleLogin
                         onSuccess={responseGoogle}
                         onError={responseError}
                         width="300"
                    />
               </GoogleOAuthProvider>
          </>
     );
}
