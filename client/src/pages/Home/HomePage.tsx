import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getUserProfile } from "../../services/userService";
export default function HomePage() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        (async () => {
             dispatch(getUserProfile());
        })();
   }, [dispatch]);
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
