import React from "react";

const FACE_NAMES = ["U", "D", "F", "B", "R", "L"];

function Face({ name, face }) {
  return (
    <div style={{ padding: 10, margin: 10 }}>
      <h5>{name}</h5>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 40px)" }}>
        {face.flat().map((color, i) => (
          <div
            key={i}
            style={{ width: 40, height: 40, backgroundColor: color, border: "1px solid black" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function RubiksCube({ cubeState }) {
  if (!cubeState) return <div>Loading cube...</div>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 600 }}>
      {cubeState.map((face, idx) => (
        <Face key={idx} name={FACE_NAMES[idx]} face={face} />
      ))}
    </div>
  );
}
