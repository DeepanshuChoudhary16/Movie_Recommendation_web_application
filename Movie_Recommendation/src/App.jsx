import { useState } from "react";
import axios from "axios";

function App() {
  const [preference, setPreference] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMovies = async (e) => {
    e.preventDefault();
    if (!preference.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await axios.post(
        "https://movie-recommendation-web-application-1.onrender.com",
        { preference },
        { headers: { "Content-Type": "application/json" } }
      );

      setMovies(res.data.recommendations);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Server Error");
      } else {
        setError("Cannot reach server");
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", fontFamily: "sans-serif" }}>
      <h1>🎬 Movie Recommender AI</h1>

      <form onSubmit={getMovies} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Type movie preference (e.g. sci-fi drama)"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Thinking..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {movies.length > 0 && (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
