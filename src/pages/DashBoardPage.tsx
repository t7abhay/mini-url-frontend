import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  successToast,
  errorToast,
  infoToast,
  warnToast,
} from "../utils/notifications/Toasts";
import { isValidUrl } from "../utils/urlValidator";
import {
  createShortUrl,
  getAllUrls,
} from "../services/provider/apis/urlService";
import UrlTable from "../components/UrlTable";

export default function DashBoard() {
  const [longUrl, setLongUrl] = useState("");
  const [urlList, setUrlList] = useState([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const fetchUrls = () => {
    getAllUrls()
      .then((response) => {
        const urls = response?.data?.data || [];
        setUrlList(urls);
      })
      .catch((error) => {
        errorToast(error.response?.data?.message || "Failed to fetch URLs");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidUrl(longUrl)) {
      warnToast("😡 Provide a valid Url");
      setLongUrl("");
      return;
    }

    await createShortUrl({ originalUrl: longUrl })
      .then(() => {
        successToast("😉 Created a tini tiny Url ");
        setLongUrl("");
        fetchUrls();
      })
      .catch((error) => {
        if (error.response?.data?.message === "No valid URL provided") {
          warnToast("😡 Provide a valid Url");
        } else if (error.response?.status === 302) {
          infoToast("🙄 A short Url for this one already exists");
          setLongUrl("");
        } else {
          errorToast(`😐 ${error?.response?.data?.message}`);
        }
      });
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (user) {
      fetchUrls();
    }
  }, [loading, user, navigate]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (user) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow w-full flex flex-col items-center px-4 py-10">
          <h2 className="text-5xl sm:text-6xl text-emerald-500 font-bold mb-10 text-center">
            Mini Url
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full max-w-2xl"
          >
            <input
              type="url"
              placeholder="Enter your long URL"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="flex-1 px-4 py-2 border border-gray-700 rounded text-purple-400 placeholder-green-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-sky-500 text-white rounded hover:bg-purple-500"
            >
              Submit
            </button>
          </form>

          <div className="w-full max-w-5xl">
            <UrlTable urlList={urlList} refreshUrls={fetchUrls} />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 w-full py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p className="max-w-2xl mx-auto px-4">
            🧹 Because this is an open-source project (and we’re not Google),
            your short URLs are <strong>gracefully erased after 3 days</strong>.
            You know, to keep things tidy.
          </p>
        </footer>
      </div>
    );
  }

  return null;
}
