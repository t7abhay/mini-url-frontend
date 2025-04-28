import { axiosInstance } from "../../../config/axios/axiosInstance.ts";

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
  confirmPassword: string;
}

export const login = async (data: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const register = async (data: RegisterRequest) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response;
  } catch (error) {
    return error;
  }
};

export const changePassword = async (data: ChangePasswordRequest) => {
  try {
    const response = await axiosInstance.post("/change-password", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const profile = async () => {
  try {
    const response = await axiosInstance.post("/me/profile");
    return response;
  } catch (error) {
    return error;
  }
};
