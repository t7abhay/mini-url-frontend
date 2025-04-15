import { useState } from "react";
import { createShortUrl } from "../../API/api.js";

const URLInput = ({ onUrlShortened }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    setLoading(true);

    try {
      const response = await createShortUrl(url);
      onUrlShortened(response.data);
      setUrl("");
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Shorten a URL
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter a long URL to shorten"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default URLInput;
