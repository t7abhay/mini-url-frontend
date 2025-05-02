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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-4">Redirecting...</h2>
      <iframe
        src="https://tenor.com/embed/13010053790556437914"
        width="300"
        height="300"
        frameBorder="0"
        allowFullScreen
        title="Nyan Cat Meme GIF"
      ></iframe>
    </div>
  );
}
