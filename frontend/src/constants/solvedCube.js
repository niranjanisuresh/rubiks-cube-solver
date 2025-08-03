// src/constants/solvedCube.js
export const FACE = {
  U: 0, D: 1, F: 2, B: 3, R: 4, L: 5
};
// Each face has a single color
const COLORS = ["yellow", "white", "blue", "green", "red", "orange"];
export function getSolvedCube() {
  return Array(6)
    .fill()
    .map((_, f) => Array(3).fill().map(() => Array(3).fill(COLORS[f])));
}
