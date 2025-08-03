import React from "react";
import CubeFace from "./CubeFace";

// The cubeState is a 6-face array: [U, D, F, B, R, L], each face is a 2D array

export default function CubeNet2D({ cubeState, size }) {
  // Net layout: Up on top, then Left/Front/Right/Back, then Down below
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Up face */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CubeFace faceData={cubeState[0]} size={size} label="U" />
      </div>
      {/* Middle row: L F R B */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CubeFace faceData={cubeState[5]} size={size} label="L" />
        <CubeFace faceData={cubeState[2]} size={size} label="F" />
        <CubeFace faceData={cubeState[4]} size={size} label="R" />
        <CubeFace faceData={cubeState[3]} size={size} label="B" />
      </div>
      {/* Down face */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CubeFace faceData={cubeState[1]} size={size} label="D" />
      </div>
    </div>
  );
}
