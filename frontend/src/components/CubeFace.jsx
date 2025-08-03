import React from "react";
import FACE_COLORS from "../constants/colors";

function CubeFace({ faceData, size, label }) {
  return (
    <div style={{ margin: 10 }}>
      <div style={{ textAlign: "center", fontWeight: 600 }}>{label}</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: `${size * 30}px`
        }}
      >
        {faceData.flat().map((fc, i) => (
          <div
            key={i}
            style={{
              width: 26,
              height: 26,
              background: FACE_COLORS[fc] || "#ff00ff",
              border: "1px solid #222",
              borderRadius: 3,
              margin: 1
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CubeFace;
