import { useState } from "react";
import TextField from "../components/TextField.jsx";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const token = localStorage.getItem("token");

  const handlePost = async () => {
    if (!url) return alert("Please enter a valid URL");

    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adding token
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrls((prev) => [
          ...prev,
          { id: prev.length + 1, original: url, short: data.shortUrl },
        ]);
        console.log(data);

        setUrl(""); // Clear input field after success
      } else {
        console.error("Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">
          URL Shortener
        </h1>

        <TextField
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Shorten URL
        </button>

        <div className="mt-6 p-3 bg-gray-200 rounded-lg text-center cursor-pointer hover:bg-gray-300 transition">
          <span
            className="font-medium text-blue-600"
            onClick={() => console.log("clicked")}
          >
            Goto Shorten
          </span>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-3">
          Your Shortened Links
        </h2>

        <ul className="space-y-3">
          {shortUrls.map((url) => (
            <li key={url.id} className="p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 truncate">
                🔗 {url.original}
              </p>
              <a
                href={url.short}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline"
              >
                {url.short}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
