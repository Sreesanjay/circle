import { useAppSelector } from "../../app/hooks";
import UserHeader from "../../components/Header/UserHeader";

export default function Header() {
     const { user } = useAppSelector((state) => state.auth);

     return <>{user && (user.role === "USER" ? <UserHeader /> : null)}</>;
}
