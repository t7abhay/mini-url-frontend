import React, { useState, useEffect } from "react";
import URLInput from "../components/URLShortener/URLInput";
import URLList from "../components/URLShortener/URLList";
import { getUserUrls } from ".././API/api.js";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await getUserUrls();
        setUrls(data);
      } catch (err) {
        console.error("Error fetching URLs:", err);
        setError("Failed to load your shortened URLs");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleNewUrl = (newUrl) => {
    setUrls([newUrl, ...urls]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        URL Shortener Dashboard
      </h1>

      <URLInput onUrlShortened={handleNewUrl} />

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md text-red-800 dark:text-red-200 text-center">
          {error}
        </div>
      ) : (
        <URLList urls={urls} />
      )}
    </div>
  );
};

export default Dashboard;
