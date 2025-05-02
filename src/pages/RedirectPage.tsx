import { axiosInstance } from "../config/axios/axiosInstance";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import catGif from "../assets/cat.gif";  

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

    fetchUrlAndRedirect();
  }, [shortId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-4">Redirecting...</h2>
      <img
        src={catGif}  
        alt="Redirecting animation"
        className="w-64 h-auto"
      />
    </div>
  );
}
