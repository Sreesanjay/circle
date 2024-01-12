import {GoogleLogin, CredentialResponse} from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleAuth() {
    const responseGoogle = async (response:CredentialResponse) =>{
     const decoded = jwtDecode(response.credential as string);
          
     };                     
    const responseError = async (): Promise<void> => {
       console.log("error occured");
      };
     return (
          <>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>

               <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={responseError}
               />
          </GoogleOAuthProvider>

          </>
     );
}
