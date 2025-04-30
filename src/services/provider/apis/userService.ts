import { axiosInstance } from "../../../config/axios/axiosInstance";

interface LoginRequest {
  email: string;
  password: string;
  username?: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const userLogin = async (data: LoginRequest) => {
  return await axiosInstance.post("/login", data, {
    withCredentials: true,
  });
};

export const register = async (data: RegisterRequest) => {
  return axiosInstance.post("/register", data);
};

export const logout = async () => {
  return axiosInstance.post("/logout");
};

export const changePassword = async (data: ChangePasswordRequest) => {
  return axiosInstance.post("/change-password", data, {
    withCredentials: true,
  });
};

export const profile = async () => {
  return axiosInstance.post("/me/profile", {}, { withCredentials: true });
};
