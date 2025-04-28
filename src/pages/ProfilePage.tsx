import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
export default function ProfilePage() {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <div className="flex flex-col gap2">
        <h1>Profile page</h1>
      </div>
    </>
  );
}
