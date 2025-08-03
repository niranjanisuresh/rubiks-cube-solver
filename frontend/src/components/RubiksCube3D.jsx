import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const FACE_COLORS = {
  U: '#F8F8F8', // Purple (top)
  D: '#FFD700', // Yellow (bottom)
  F: '#E74C3C', // Red (front)
  B: '#E67E22', // Orange (back)
  R: '#3498DB', // Blue (right)
  L: '#2ECC71'  // Green (left)
};

const getVisibleFaces = (cubeState, x, y, z, size) => {
  const mid = (size - 1) / 2;
  const idx = (p) => Math.round(p + mid);
  const visibleFaces = [];

  try {
    // Check each face and add to visibleFaces if on the surface
    if (Math.abs(y - mid) < 1e-6) {
      const faceColor = cubeState[0][idx(x)][idx(-z)];
      visibleFaces.push({ color: FACE_COLORS[faceColor] }); // Top
    }
    if (Math.abs(y + mid) < 1e-6) {
      const faceColor = cubeState[1][idx(x)][idx(z)];
      visibleFaces.push({ color: FACE_COLORS[faceColor] }); // Bottom
    }
    if (Math.abs(z - mid) < 1e-6) {
      const faceColor = cubeState[2][idx(x)][idx(-y)];
      visibleFaces.push({ color: FACE_COLORS[faceColor] }); // Front
    }
    if (Math.abs(z + mid) < 1e-6) {
      const faceColor = cubeState[3][idx(x)][idx(y)];
      visibleFaces.push({ color: FACE_COLORS[faceColor] }); // Back
    }
    if (Math.abs(x - mid) < 1e-6) {
      const faceColor = cubeState[4][idx(z)][idx(-y)];
      visibleFaces.push({ color: FACE_COLORS[faceColor] }); // Right
    }
    if (Math.abs(x + mid) < 1e-6) {
      const faceColor = cubeState[5][idx(-z)][idx(-y)];
      visibleFaces.push({ color: FACE_COLORS[faceColor] }); // Left
    }
  } catch (e) {
    console.error('Error mapping cube colors:', e);
  }

  return visibleFaces;
};

const Cubelet = ({ position, visibleFaces }) => {
  return (
    <group position={position}>
      {visibleFaces.map((face, i) => (
        <mesh key={i}>
          <boxGeometry args={[
            i % 2 === 0 ? 0.96 : 0.94,  // Slightly larger for some faces
            i % 2 === 1 ? 0.96 : 0.94,
            i % 2 === 2 ? 0.96 : 0.94
          ]} />
          <meshStandardMaterial 
            color={face.color} 
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const RubiksCube3D = ({ cubeState, size = 3 }) => {
  if (!cubeState) return <div>Loading cube...</div>;

  const mid = (size - 1) / 2;
  const coords = Array(size).fill().map((_, i) => i - mid);

  return (
    <Canvas
      camera={{ position: [size * 2.4, size * 2.4, size * 2.4], fov: 50 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[size * 3, size * 3, size * 3]} intensity={1.8} />
      <directionalLight position={[size * 2, size * 3, size * 2]} intensity={1.0} />
      
      {coords.map(x =>
        coords.map(y =>
          coords.map(z => {
            if (size % 2 === 1 && x === 0 && y === 0 && z === 0) return null;
            const visibleFaces = getVisibleFaces(cubeState, x, y, z, size);
            if (visibleFaces.length === 0) return null;
            
            return (
              <Cubelet
                key={`${x},${y},${z}`}
                position={[x, y, z]}
                visibleFaces={visibleFaces}
              />
            );
          })
        )
      )}
      <OrbitControls 
        enablePan={false}
        minDistance={size * 1.5}
        maxDistance={size * 5}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

export default RubiksCube3D;