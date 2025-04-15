import { useAuth } from "../../hooks/useAuth";
import { logout as logoutApi } from ".././API/api.js";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, we still want to log out locally
      logout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    >
      Logout
    </button>
  );
};

export default Logout;
