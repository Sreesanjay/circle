import {GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function GoogleAuth() {
    const responseGoogle = async (response: CredentialResponse): Promise<void> =>{
       console.log(response);
      };                     
    const responseError = async (): Promise<void> => {
       console.log("error occured");
      };
     return (
          <>
               <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={responseError}
               />
          </>
     );
}
