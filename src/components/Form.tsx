import React, { useState } from "react";
import "./componentsstyles/form.style.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axios/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import {
  successToast,
  errorToast,
  infoToast,
  warnToast,
} from "../utils/notifications/Toasts";
import { validateConfirmPassword } from "../utils/passwordConfirm";
import "react-toastify/dist/ReactToastify.css";

type FormMode = "login" | "register" | "changePassword";

interface FormProps {
  mode: FormMode;
}

export default function Form({ mode }: FormProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
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
      <div className="form_container">
        <h3 id="form_title">Invalid Form Mode</h3>
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        const payload = {
          email: formData.email,
          password: formData.password,
        };

        await axiosInstance
          .post("/login", payload, {
            withCredentials: true,
          })
          .then((response) => {
            login(response.data.data.user);
            successToast("🙂 Login Successfull!");
            navigate("/dashboard");
          })
          .catch((error) => {
            errorToast(`${error.response.data.message}`);
          });
      }

      if (mode === "register") {
        const payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        await axiosInstance
          .post("/register", payload)
          .then((response) => {
            successToast(response.data.data.message);
            navigate("/login");
          })
          .catch((error) => {
            errorToast(`${error.response.data.message}`);
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

        await axiosInstance
          .post("/change-password", {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          })
          .then((response) => {
            successToast(response.data.data.message);
            navigate("/login");
          })
          .catch((error) => {
            errorToast(`${error.response.data.message}`);
          });
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <h3 id="form_title">Register to MiniUrl</h3>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}

          {mode === "login" && (
            <>
              <h3 id="form_title">Login to MiniUrl</h3>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}

          {mode === "changePassword" && (
            <>
              <h3 id="form_title">Change Password</h3>

              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button id="form_submit_button" type="submit" disabled={loading}>
            {loading
              ? "Submitting..."
              : mode === "login"
              ? "Login"
              : mode === "register"
              ? "Register"
              : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
}
