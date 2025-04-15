import { useState } from "react";

const UrlTable = ({ urls }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Original URL</th>
            <th className="py-3 px-6 text-left">Short URL</th>
            <th className="py-3 px-6 text-left">Created</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {urls.map((url) => (
            <tr key={url.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left truncate max-w-xs">
                <a 
                  href={url.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                  title={url.originalUrl}
                >
                  {url.originalUrl}
                </a>
              </td>
              <td className="py-3 px-6 text-left">
                <a 
                  href={url.shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url.shortUrl.replace(/^https?:\/\//, '')}
                </a>
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(url.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => copyToClipboard(url.shortUrl, url.id)}
                  className={`px-4 py-1 rounded text-white ${
                    copiedId === url.id ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {copiedId === url.id ? "Copied!" : "Copy"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
