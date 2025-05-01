import { successToast, errorToast } from "../utils/notifications/Toasts";
import { deleteUrl } from "../services/provider/apis/urlService";

export default function UrlTable({ urlList, refreshUrls }) {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText("minuri.vercel.app/r/" + text);
      successToast("📝 Copied");
    } catch (error) {
      errorToast("Failed to copy! 😶");
    }
  };

  const handleUrlDelete = async (shortId) => {
    await deleteUrl(shortId)
      .then(() => {
        successToast("🧨 Url deleted");
        refreshUrls();
      })
      .catch((error) => {
        errorToast(error.response?.data?.message);
      });
  };

  const urlFormatter = (url) => {
    return url.length > 31 ? url.slice(0, 31) + "..." : url;
  };

  return (
    <>
      <div className="w-full max-h-[500px] overflow-y-auto overflow-x-auto">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-500 text-white text-sm">
                <th className="w-1/3 text-center px-4 py-2 border border-gray-300 bg-amber-700">
                  Original URL
                </th>
                <th className="w-1/3 text-center px-4 py-2 border border-gray-300 bg-blue-800">
                  Short URL
                </th>
                <th className="w-1/3 text-center px-4 py-2 border border-gray-300 bg-fuchsia-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {urlList.toReversed().map((url) => (
                <tr
                  key={url._id}
                  className="border-b hover:bg-gray-700 transition-colors duration-200"
                >
                  <td
                    className="w-1/3 px-4 py-2 truncate"
                    title={url.originalUrl}
                  >
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {urlFormatter(url.originalUrl)}.....
                    </a>
                  </td>
                  <td className="w-1/3 px-4 py-2 truncate">
                    minuri.vercel.app/{url.shortenedUrl}
                  </td>
                  <td className="w-1/3 px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleUrlDelete(url.shortenedUrl)}
                      className="w-20 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => copyToClipboard(url.shortenedUrl)}
                      className="w-1/3 text-blue-500 hover:text-blue-700"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
