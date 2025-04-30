import Form from "../components/Form";
import { Link } from "react-router-dom";

export default function RegisterPage({ mode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Create Your Account
      </h1>

      <div className="w-full max-w-md">
        <Form mode={mode} />
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-600 transition-colors underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
