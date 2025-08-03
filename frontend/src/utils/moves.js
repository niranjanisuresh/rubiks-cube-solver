import { FACE } from "../constants/cubeState";

function rotateFace(face) {
  const n = face.length;
  const rotated = Array.from({ length: n }, () => Array(n).fill(null));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      rotated[c][n - 1 - r] = face[r][c];
    }
  }
  return rotated;
}

function rotateFaceCounter(face) {
  const n = face.length;
  const rotated = Array.from({ length: n }, () => Array(n).fill(null));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      rotated[n - 1 - c][r] = face[r][c];
    }
  }
  return rotated;
}

export function applyMove(cube, move, size = 3) {
  const newCube = JSON.parse(JSON.stringify(cube));
  switch (move) {
    case "U": {
      newCube[FACE.U] = rotateFace(newCube[FACE.U]);
      const temp = newCube[FACE.F][0].slice();
      newCube[FACE.F][0] = newCube[FACE.R][0].slice();
      newCube[FACE.R][0] = newCube[FACE.B][0].slice();
      newCube[FACE.B][0] = newCube[FACE.L][0].slice();
      newCube[FACE.L][0] = temp;
      break;
    }
    case "U'": {
      newCube[FACE.U] = rotateFaceCounter(newCube[FACE.U]);
      const temp = newCube[FACE.F][0].slice();
      newCube[FACE.F][0] = newCube[FACE.L][0].slice();
      newCube[FACE.L][0] = newCube[FACE.B][0].slice();
      newCube[FACE.B][0] = newCube[FACE.R][0].slice();
      newCube[FACE.R][0] = temp;
      break;
    }
    case "U2": return applyMove(applyMove(newCube, "U", size), "U", size);
    default: break;
  }
  return newCube;
}
