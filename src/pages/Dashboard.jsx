import { useState } from "react";
import axios from "../config/axiosConfig";

const ShortUrlForm = ({ onShortened }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setError("");
    setLoading(true);

    try {
      if (!originalUrl.trim()) {
        setError("Please enter a valid URL.");
        setLoading(false);
        return;
      }

      const res = await axios.post("/shorten-url", { url: originalUrl });

      if (res.data?.data?.shortenedUrl) {
        console.log("Shortened URL:", res.data.data.shortenedUrl);
        onShortened(res.data.data); // pass full object if needed
        setOriginalUrl("");
      } else {
        setError("No shortened URL returned");
      }
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
      console.error("Axios error:", err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Enter URL to shorten"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ShortUrlForm;
