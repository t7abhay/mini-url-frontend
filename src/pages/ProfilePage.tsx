/* import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
 */

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../config/axios/axiosInstance";
import { successToast, errorToast } from "../utils/notifications/Toasts";
export default function ProfilePage() {
  const { user, logout: authLogout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (user) {
      setIsLoggingOut(true);
      axiosInstance
        .post("/logout", {}, { withCredentials: true })
        .then((response) => {
          setIsLoggingOut(false);
          authLogout();
          successToast(response.data.message);
          navigate("/login");
        })
        .catch(() => {
          setIsLoggingOut(false);
          errorToast("Logout failed. Please try again.");
        });
    }
  };

  return (
    <>
      <div className="flex flex-col gap2">
        <h4>{user?.username}</h4>
        <h4>{user?.email}</h4>
        <h4>{user?.roleName}</h4>
        {user && location.pathname === "/profiles" && (
          <Link
            to="/logout"
            className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-all ${
              isLoggingOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Link>
        )}
      </div>
    </>
  );
}
