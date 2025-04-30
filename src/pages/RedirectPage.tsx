import { axiosInstance } from "../config/axios/axiosInstance";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();
  const { shortId } = useParams<{ shortId: string }>();

  useEffect(() => {
    const fetchUrlAndRedirect = async () => {
      try {
        const response = await axiosInstance.get(`/r/${shortId}`);
        const originalUrl = response.data.url;
        window.location.href = originalUrl;
      } catch (error) {
        console.error("Failed to redirect:", error);
        navigate("/url-not-found");
      }
    };

    console.log(shortId);
    fetchUrlAndRedirect();
  }, [shortId]);

  return (
    <>
      <div>
        <h2>Redirecting ....... </h2>
      </div>
    </>
  );
}
