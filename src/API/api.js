import axiosInstance from "../config/axiosConfig";

export const register = async (userData) => {
  const response = await axiosInstance.post("/register", userData);
  return response;
};

export const login = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response;
};

export const logout = async () => {
  const response = await axiosInstance.post("/logout");
  return response;
};

export const getUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await axiosInstance.post("/update-password", passwordData);
  return response;
};

export const createShortUrl = async (originalUrl) => {
  const response = await axiosInstance.post("/shorten-url", { originalUrl });
  return response;
};

export const getUserUrls = async () => {
  const response = await axiosInstance.get("/user-urls");
  return response.data;
};
