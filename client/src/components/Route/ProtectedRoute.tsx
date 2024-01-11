import {FC} from "react"
import Cookies from "js-cookie"
import { useAppSelector } from "../../app/hooks"
import { Navigate, Outlet } from "react-router-dom"
interface Props{
  allowedRole: string
}
const  ProtectedRoute: FC<Props> = ({allowedRole})=> {
const {user} = useAppSelector((state)=>state.auth)
const token = Cookies.get('token')
const isAuth = token && user && user.role === allowedRole;
  return (
    <>
      {isAuth ? <Outlet/> : <Navigate to="/login"/>}
    </>
  )
}
 export default ProtectedRoute