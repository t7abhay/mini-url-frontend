import { useAuth } from "../../hooks/useAuth";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Your Profile
        </h2>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Username
              </h3>
              <p className="mt-1 text-lg text-gray-800 dark:text-white">
                {currentUser.username}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </h3>
              <p className="mt-1 text-lg text-gray-800 dark:text-white">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordForm />
    </div>
  );
};

export default ProfilePage;
