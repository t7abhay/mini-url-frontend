import axiosInstance from "./config/axiosConfig.js";

export const register = async (userData) => {
  return await axiosInstance.post("/register", userData);
};

export const login = async (userData) => {
  return await axiosInstance.post("/login", userData);
};

export const createShortUrl = async (originalUrl) => {
  return await axiosInstance.post("/create", { originalUrl });
};

export const logout = async () => {
  return await axiosInstance.post("/logout");
};
