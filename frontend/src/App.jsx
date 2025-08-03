import React, { useState, useEffect } from "react";
import CubeController from "./components/CubeController";

export default function App() {
  const [size, setSize] = useState(3);
  const [scramble, setScramble] = useState("");
  const [inputScramble, setInputScramble] = useState("");
  const [solutionMoves, setSolutionMoves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchScramble = () => {
    setLoading(true);
    setError("");

    if (!inputScramble.trim()) {
      fetch(`http://localhost:8000/scramble?size=${size}`)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP error! ${r.status}`);
          return r.json();
        })
        .then((data) => setScramble(data.scramble.trim()))
        .catch(() => setError("Failed to fetch scramble"))
        .finally(() => setLoading(false));
    } else {
      setScramble(inputScramble.trim());
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!scramble) return;

    setLoading(true);
    setError("");

    fetch("http://localhost:8000/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scramble, size }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP error! ${r.status}`);
        return r.json();
      })
      .then((data) => setSolutionMoves(data.moves))
      .catch(() => setError("Failed to solve cube"))
      .finally(() => setLoading(false));
  }, [scramble, size]);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 1100,
        margin: "auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontWeight: 700, color: "#353485", marginBottom: 20 }}>
        Rubik's Cube Solver
      </h1>

      <label>
        Cube Size:&nbsp;
        <select
          disabled={loading}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ padding: 6, borderRadius: 6, borderColor: "#ccc" }}
        >
          {[2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} x {n}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: 14, marginBottom: 14 }}>
        <input
          type="text"
          disabled={loading}
          placeholder="Enter scramble or leave blank"
          style={{
            width: 300,
            padding: 8,
            borderRadius: 6,
            borderColor: "#ccc",
            marginRight: 10,
          }}
          value={inputScramble}
          onChange={(e) => setInputScramble(e.target.value)}
        />
        <button
          onClick={fetchScramble}
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            backgroundColor: "#3c5ef8",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Please wait..." : "Solve"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", fontWeight: 600, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <CubeController
        solutionMoves={solutionMoves}
        scramble={scramble}
        size={size}
      />
    </div>
  );
}
