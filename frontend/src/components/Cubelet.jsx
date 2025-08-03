import { Box } from '@react-three/drei';

export default function Cubelet({ position, colors }) {
  return (
    <Box position={position} args={[0.98, 0.98, 0.98]}>
      {colors.map((color, idx) => (
        <meshStandardMaterial attachArray="material" key={idx} color={color} />
      ))}
    </Box>
  );
}
