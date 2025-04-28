import { axiosInstance } from "../../../config/axios/axiosInstance";

interface CreateShortUrlRequest {
  originalUrl: string;
}
interface DeleteUrlRequest {
  shortId: string;
}

interface RedirectRequest {
  shortId: string;
}

export const createShortUrl = async (data: CreateShortUrlRequest) => {
  try {
    const response = await axiosInstance.post("/shorten-url", data);

    return response;
  } catch (error) {
    return error;
  }
};

export const getAllUrls = async () => {
  try {
    const response = await axiosInstance.get("/all-urls");

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUrl = async (shortId: DeleteUrlRequest) => {
  try {
    const response = await axiosInstance.delete(`/delete-url/${shortId}`);

    return response;
  } catch (error) {
    return error;
  }
};

export const redirectToOriginal = async (shortId: RedirectRequest) => {
  try {
    const response = await axiosInstance.get(`/s/${shortId}`);

    return response;
  } catch (error) {
    return error;
  }
};
