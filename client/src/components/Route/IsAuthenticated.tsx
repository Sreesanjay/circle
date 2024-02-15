import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function IsAuthenticated() {
     const navigate = useNavigate();
     const user = JSON.parse(localStorage.getItem("user") as string);


     useEffect(() => {
          if (user) {
               user.role === 'USER' ? navigate("/") : navigate("/admin") 
               
          }
     }, [user, navigate]);

     return <>{!user ? <Outlet /> : null}</>;
}
