import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  register,
  userLogin,
  changePassword,
} from "../services/provider/apis/userService";
import {
  successToast,
  errorToast,
  infoToast,
} from "../utils/notifications/Toasts";
import { validateConfirmPassword } from "../utils/passwordConfirm";
import { isValidEmail } from "../utils/emailValidation";

type FormMode = "login" | "register" | "changePassword";

interface FormProps {
  mode: FormMode;
}

export default function Form({ mode }: FormProps) {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    currentPassword: "",
    confirmPassword: "",
    newPassword: "",
  });

  if (!["login", "register", "changePassword"].includes(mode)) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Invalid Form Mode
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        if (!isValidEmail(formData.email)) {
          errorToast(`👻 Provide a valid email`);
          setLoading(false);
          return;
        }

        const payLoad = { email: formData.email, password: formData.password };
        await userLogin(payLoad)
          .then((res) => {
            login(res.data.data.user);
            successToast("🙂 Login Successful!");
            navigate("/dashboard");
          })
          .catch((err) => {
            errorToast(`${err.response?.data?.message}`);
          });
      }

      if (mode === "register") {
        if (!isValidEmail(formData.email)) {
          errorToast(`👻 Provide a valid email`);
          setLoading(false);
          return;
        }

        const payLoad = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
        await register(payLoad)
          .then((res) => {
            successToast(res.data.data.message);
            navigate("/login");
          })
          .catch((err) => {
            errorToast(`${err.response?.data?.message}`);
          });
      }

      if (mode === "changePassword") {
        if (
          !validateConfirmPassword(
            formData.confirmPassword,
            formData.newPassword
          )
        ) {
          infoToast("🐱‍👤 Confirm and New password do not match");
          setLoading(false);
          return;
        }
        const payLoad = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        };

        await changePassword(payLoad)
          .then((res) => {
            successToast(res.data?.message);

            logout();
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            errorToast(`${err.response?.data?.message}`);
          });
      }
    } catch (err) {
      errorToast("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
        {mode === "login"
          ? "Login to MiniUrl"
          : mode === "register"
          ? "Register for MiniUrl"
          : "Change Password"}
      </h3>

      {mode === "register" && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </>
      )}

      {(mode === "register" || mode === "login") && (
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      {(mode === "register" || mode === "login") && (
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      {mode === "changePassword" && (
        <>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 text-white rounded transition-all ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading
          ? "Submitting..."
          : mode === "login"
          ? "Login"
          : mode === "register"
          ? "Register"
          : "Change Password"}
      </button>
    </form>
  );
}
