import { useState } from "react";
import axios from "../config/axiosConfig";

const ShortUrlForm = ({ onShortened }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Optional: for UX

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!originalUrl.trim()) {
        setError("Please enter a valid URL.");
        setLoading(false);
        return;
      }

      console.log("Submitting URL:", originalUrl);

      const res = await axios.post("/shorten-url", { originalUrl });

      if (res.data) {
        console.log("Shortened URL data:", res.data);
        onShortened(res.data);
        setOriginalUrl("");
      } else {
        setError("No data received.");
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
