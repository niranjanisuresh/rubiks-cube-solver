import React, { useRef } from "react";
import { Box, useFrame } from "@react-three/drei"; // make sure useFrame is also available from @react-three/fiber

export default function AnimatedCubelet({
  position,
  faceColors,
  rotationAxis = null,
  rotationAngle = 0,
  isRotating = false,
  onAnimationComplete = () => {},
}) {
  const meshRef = useRef();

  // Animate the cubelet if needed
  useFrame(() => {
    if (isRotating && rotationAxis && meshRef.current) {
      const curr = meshRef.current.rotation[rotationAxis];
      if (Math.abs(curr) < Math.abs(rotationAngle)) {
        meshRef.current.rotation[rotationAxis] += 0.05 * Math.sign(rotationAngle);
      } else {
        meshRef.current.rotation[rotationAxis] = rotationAngle;
        onAnimationComplete(); // Let parent component know we're done
      }
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.95, 0.95, 0.95]}>
      {faceColors &&
        faceColors.map((color, idx) => (
          <meshStandardMaterial
            attachArray="material"
            key={idx}
            color={color || "gray"}
            transparent
            opacity={color ? 1 : 0.05}
          />
        ))}
    </Box>
  );
}
