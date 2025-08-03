export const FACE = ["U", "D", "F", "B", "R", "L"];

export function getSolvedCube(size) {
  const createFace = (face) =>
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(face));

  return {
    U: createFace("U"),
    D: createFace("D"),
    F: createFace("F"),
    B: createFace("B"),
    R: createFace("R"),
    L: createFace("L"),
  };
}
