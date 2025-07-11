"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") {
        console.log(parsed.pathname.slice(1));
        return parsed.pathname.slice(1); // e.g. youtu.be/abc123
      } else if (
        parsed.hostname === "www.youtube.com" ||
        parsed.hostname === "youtube.com"
      ) {
        return parsed.searchParams.get("v"); // e.g. youtube.com/watch?v=abc123
      }
    } catch (err) {
      return null;
    }
  };

  const analyzeComments = async () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/analyze/${videoId}`
      );
      console.log(res.data);
      setResults(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze comments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 700, margin: "auto", padding: "2rem" }}>
      <h1>YouTube Comment Analyzer</h1>

      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste YouTube video URL here"
        style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
      />

      <button onClick={analyzeComments} style={{ padding: "10px 20px" }}>
        Analyze
      </button>

      {loading && <p>Analyzing comments...</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Analysis Results</h2>
          <ul>
            {results.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "1rem" }}>
                <strong>Comment:</strong> {item.comment.return}
                <br />
                <strong>Prediction:</strong>{" "}
                {typeof item.prediction === "string"
                  ? item.prediction
                  : JSON.stringify(item.prediction || item.error)}
                <br />
                <strong>Confidence:</strong>{" "}
                {item.confidence
                  ? (item.confidence * 100).toFixed(2) + "%"
                  : "—"}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
