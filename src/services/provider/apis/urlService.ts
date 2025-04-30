import { axiosInstance } from "../../../config/axios/axiosInstance";

export interface CreateShortUrlRequest {
  originalUrl: string;
}
export interface DeleteUrlRequest {
  shortId: string;
}

interface RedirectRequest {
  shortId: string;
}

export const createShortUrl = async (data: CreateShortUrlRequest) => {
  return axiosInstance.post("/shorten-url", data);
};

export const getAllUrls = async () => {
  return axiosInstance.get("/all-urls");
};

export const deleteUrl = async (shortId: DeleteUrlRequest) => {
  return axiosInstance.delete(`/delete-url/${shortId}`);
};

export const redirectToOriginal = async (shortId: RedirectRequest) => {
  return axiosInstance.get(`/s/${shortId}`);
};
