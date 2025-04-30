import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { axiosInstance } from "../config/axios/axiosInstance";
import { successToast, errorToast } from "../utils/notifications/Toasts";
import Form from "../components/Form";

export default function ProfilePage() {
  const { user, logout: authLogout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showChangePassword] = useState(false);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          User Profile
        </h2>

        <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.roleName}
          </p>
        </div>

        {user && location.pathname === "/profiles" && (
          <>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full px-4 py-2 rounded text-white transition-all ${
                isLoggingOut
                  ? "bg-orange-400 cursor-not-allowed opacity-70"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

            <button
              onClick={() => navigate("/change-password")}
              className="mt-4 w-full px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition-all"
            >
              Change Password
            </button>
          </>
        )}

        {showChangePassword && (
          <div className="mt-6 border-t pt-6">
            <Form mode="changePassword" />
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <Link
          to="https://secret-miniurl-message.vercel.app/"
          className="text-xs px-3 py-1 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
        >
          click me
        </Link>
      </div>
    </div>
  );
}
