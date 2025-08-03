import React, { useState, useEffect, useCallback } from "react";
import RubiksCube3D from "./RubiksCube3D";
import { getSolvedCube, applyMove, generateScramble } from "../utils/cubeUtils";

function convertCubeObjectToArray(cubeObj) {
  return ['U', 'D', 'F', 'B', 'R', 'L'].map(face => cubeObj[face]);
}

export default function CubeController({ solutionMoves = [], scramble = "", size = 3 }) {
  const [cubeState, setCubeState] = useState(convertCubeObjectToArray(getSolvedCube(size)));
  const [moveIndex, setMoveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [scrambleMoves, setScrambleMoves] = useState([]);

  // Reset function
  const resetCube = useCallback(() => {
    setCubeState(convertCubeObjectToArray(getSolvedCube(size)));
    setMoveIndex(0);
    setAutoPlay(false);
  }, [size]);

  // Scramble function
  const scrambleCube = useCallback(() => {
    const newScramble = generateScramble(20);
    setScrambleMoves(newScramble);
    
    let scrambledCube = getSolvedCube(size);
    newScramble.forEach(move => {
      scrambledCube = applyMove(scrambledCube, move, size);
    });
    
    setCubeState(convertCubeObjectToArray(scrambledCube));
    setMoveIndex(0);
    setAutoPlay(false);
  }, [size]);

  // Solve function
  const solveCube = useCallback(() => {
    setCubeState(convertCubeObjectToArray(getSolvedCube(size)));
    setMoveIndex(0);
    setAutoPlay(false);
    setScrambleMoves([]);
  }, [size]);

  // Move navigation
  const nextMove = useCallback(() => {
    if (moveIndex < solutionMoves.length) {
      const newState = applyMove(getSolvedCube(size), solutionMoves.slice(0, moveIndex + 1), size);
      setCubeState(convertCubeObjectToArray(newState));
      setMoveIndex(mi => mi + 1);
    } else {
      setAutoPlay(false);
    }
  }, [moveIndex, solutionMoves, size]);

  const prevMove = useCallback(() => {
    if (moveIndex > 0) {
      const newState = applyMove(getSolvedCube(size), solutionMoves.slice(0, moveIndex - 1), size);
      setCubeState(convertCubeObjectToArray(newState));
      setMoveIndex(moveIndex - 1);
    }
  }, [moveIndex, solutionMoves, size]);
  
  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || moveIndex >= solutionMoves.length) return;
    const timer = setTimeout(() => nextMove(), 600);
    return () => clearTimeout(timer);
  }, [autoPlay, moveIndex, nextMove, solutionMoves.length]);

  // Initialize on mount
  useEffect(() => {
    resetCube();
  }, [resetCube, scramble, size, solutionMoves]);

  return (
    <div style={{ display: "flex", height: "80vh", gap: 20 }}>
      <div style={{ flex: 1, border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
        <RubiksCube3D cubeState={cubeState} size={size} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 10,
          justifyContent: "flex-start",
          border: "1px solid #ddd",
          borderRadius: 8,
          backgroundColor: "#fbf7f7ff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Controls</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={solveCube}>✅ Solve</button>
          <button onClick={scrambleCube}>🔀 Scramble</button>
          <button onClick={resetCube}>🔄 Reset</button>
          <button onClick={prevMove} disabled={moveIndex <= 0}>⏮ Prev Move</button>
          <button onClick={nextMove} disabled={moveIndex >= solutionMoves.length}>Next Move ⏭</button>
          <button onClick={() => setAutoPlay(!autoPlay)} disabled={solutionMoves.length === 0}>
            {autoPlay ? "⏸ Pause" : "▶️ Auto Play"}
          </button>
        </div>
        
        {scrambleMoves.length > 0 && (
          <div>
            <h3>Scramble ({scrambleMoves.length} moves):</h3>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap",
              gap: 4,
              maxHeight: 100,
              overflowY: "auto"
            }}>
              {scrambleMoves.map((move, i) => (
                <span key={i} style={{
                  padding: "2px 6px",
                  background: "#eee",
                  borderRadius: 4
                }}>
                  {move}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3>Solution Moves ({solutionMoves.length}):</h3>
          <p>
            Move {moveIndex} of {solutionMoves.length} —{" "}
            <strong>{solutionMoves[moveIndex - 1] || "-"}</strong>
          </p>
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            <ol style={{ marginLeft: 12 }}>
              {solutionMoves.map((move, i) => (
                <li key={i} style={{ fontWeight: i === moveIndex - 1 ? "bold" : "normal" }}>
                  {move}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}