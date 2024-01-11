import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

export default function IsAuthenticated() {
    const navigate = useNavigate()
     const { user } = useAppSelector((state) => state.auth);
     useEffect(()=>{
         if(user){
            navigate('/')
        }
     },[user,navigate])
     return (<>
        {!user ? <Outlet/>:null}
     </>)
}
