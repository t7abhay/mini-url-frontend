import { useState } from "react";
import { createShortUrl } from "../api";

const ShortUrlForm = ({ onShortened }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!originalUrl.trim()) {
        setError("Please enter a valid URL");
        return;
      }

      const response = await createShortUrl(originalUrl);
      
      if (response.data) {
        onShortened(response.data);
        setOriginalUrl("");
      } else {
        setError("No data received from server");
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError(err.response?.data?.message || "Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="url"
          placeholder="Enter URL to shorten"
          className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ShortUrlForm;
