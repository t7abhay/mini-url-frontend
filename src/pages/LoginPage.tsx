import Form from "../components/Form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function LoginPage({ mode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <Form mode={mode} />
        <p className="mt-4 text-sm text-center">
          Don't have an account ?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-600 transition-colors underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
