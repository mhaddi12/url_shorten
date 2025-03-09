import { useState, useEffect } from "react";
import { FiLogOut, FiLink } from "react-icons/fi";
import TextField from "../components/TextField.jsx";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const token = localStorage.getItem("token");

  const fetchShortUrls = async () => {
    try {
      const response = await fetch("http://localhost:3000/urls/list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }

      const data = await response.json();
      setShortUrls(data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  useEffect(() => {
    fetchShortUrls();
  }, []);

  const handlePost = async () => {
    if (!url.trim()) return alert("Please enter a valid URL");

    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      await response.json();
      setUrl("");
      fetchShortUrls();
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 p-6 w-full">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">
          URL Shortener
        </h1>
        <p className="text-gray-500 mb-4">
          Shorten your long URLs in one click!
        </p>

        <TextField
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Shorten URL
        </button>
      </div>

      {/* Shortened URLs List */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg mt-6">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-3">
          Your Shortened Links
        </h2>

        {shortUrls.length === 0 ? (
          <p className="text-center text-gray-500">No shortened URLs yet.</p>
        ) : (
          <ul className="space-y-3">
            {shortUrls.map((url) => (
              <li
                key={url.urlId}
                className="flex flex-col sm:flex-row justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <FiLink className="text-blue-600" />
                  <p className="text-sm text-gray-600 truncate w-48">
                    {url.originalUrl}
                  </p>
                </div>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium underline break-all"
                >
                  {url.shortUrl}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
