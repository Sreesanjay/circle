import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function IsAuthenticated() {
     const navigate = useNavigate();
     const user = localStorage.getItem("user");

     useEffect(() => {
          if (user) {
               navigate("/");
          }
     }, [user, navigate]);

     return <>{!user ? <Outlet /> : null}</>;
}
