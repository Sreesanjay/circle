import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import API from "../../api";

export default function IsAuthenticated() {
     const navigate = useNavigate();
     const user = JSON.parse(localStorage.getItem("user") as string);
     const token = Cookies.get("token");
     const refreshToken = JSON.parse(
          localStorage.getItem("refreshToken") as string
     );
     useEffect(() => {
          if (user && refreshToken) {
               if (!token) {
                    (async () => {
                         const response = await API.post("/refresh-token", {
                              refreshToken: refreshToken,
                         });
                         if (response.data) {
                              const { token } = response.data;
                              Cookies.set("token", token, {
                                   expires: (1 / 1440) * 15,
                              });
                              user.role === "USER"
                                   ? navigate("/")
                                   : navigate("/admin");
                         }
                    })();
               } else {
                    user.role === "USER" ? navigate("/") : navigate("/admin");
               }
          }
     }, [user, navigate, refreshToken, token]);

     return <>{!user ? <Outlet /> : null}</>;
}
