import React, { useState } from "react";

export default function CubeSolver() {
  const [scramble, setScramble] = useState("");
  const [solution, setSolution] = useState([]);

  function handleSolve() {
    fetch("http://localhost:8000/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scramble }),  // send the scramble as JSON
    })
      .then(res => res.json())
      .then(data => setSolution(data.moves || []))
      .catch((err) => alert("Error: " + err));
  }

  return (
    <div>
      <input
        type="text"
        value={scramble}
        onChange={e => setScramble(e.target.value)}
        placeholder="Type scramble here"
        style={{ width: 300 }}
      />
      <button onClick={handleSolve}>Solve Cube</button>
      <h3>Solution Moves:</h3>
      <ol>
        {solution.map((move, idx) => <li key={idx}>{move}</li>)}
      </ol>
    </div>
  );
}
