// cubeUtils.js

export const getSolvedCube = (size) => {
  const face = Array(size).fill().map(() => Array(size).fill('U'));
  return {
    U: JSON.parse(JSON.stringify(face)),
    D: JSON.parse(JSON.stringify(face)).map(row => row.fill('D')),
    F: JSON.parse(JSON.stringify(face)).map(row => row.fill('F')),
    B: JSON.parse(JSON.stringify(face)).map(row => row.fill('B')),
    R: JSON.parse(JSON.stringify(face)).map(row => row.fill('R')),
    L: JSON.parse(JSON.stringify(face)).map(row => row.fill('L'))
  };
};

export const generateScramble = (length = 20) => {
  const faces = ['U', 'D', 'F', 'B', 'R', 'L'];
  const modifiers = ['', "'", '2'];
  const scramble = [];
  
  let lastFace = '';
  
  for (let i = 0; i < length; i++) {
    let availableFaces = faces.filter(f => f !== lastFace);
    const face = availableFaces[Math.floor(Math.random() * availableFaces.length)];
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    
    scramble.push(`${face}${modifier}`);
    lastFace = face;
  }
  
  return scramble;
};

// Rotates a 2D array clockwise
const rotateClockwise = (matrix) => {
  const N = matrix.length;
  const result = new Array(N).fill().map(() => new Array(N));
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result[j][N - 1 - i] = matrix[i][j];
    }
  }
  
  return result;
};

// Rotates a 2D array counter-clockwise
const rotateCounterClockwise = (matrix) => {
  const N = matrix.length;
  const result = new Array(N).fill().map(() => new Array(N));
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result[N - 1 - j][i] = matrix[i][j];
    }
  }
  
  return result;
};

export const applyMove = (cube, move, size) => {
  const newCube = JSON.parse(JSON.stringify(cube));
  const face = move[0];
  const modifier = move.slice(1);
  
  // Rotate the face itself
  if (face === 'U' || face === 'D' || face === 'F' || face === 'B' || face === 'R' || face === 'L') {
    if (modifier === "'") {
      // Counter-clockwise
      newCube[face] = rotateCounterClockwise(newCube[face]);
    } else if (modifier === '2') {
      // 180 degrees (rotate twice)
      newCube[face] = rotateClockwise(rotateClockwise(newCube[face]));
    } else {
      // Clockwise (default)
      newCube[face] = rotateClockwise(newCube[face]);
    }
  }
  
  // Rotate adjacent edges (simplified for 3x3 cube)
  if (size === 3) {
    if (face === 'U') {
      // Rotate top layer
      if (modifier === "'") {
        // Counter-clockwise
        const temp = [...newCube.F[0]];
        newCube.F[0] = [...newCube.L[0]];
        newCube.L[0] = [...newCube.B[0]];
        newCube.B[0] = [...newCube.R[0]];
        newCube.R[0] = temp;
      } else {
        // Clockwise (default or '2')
        const temp = [...newCube.F[0]];
        newCube.F[0] = [...newCube.R[0]];
        newCube.R[0] = [...newCube.B[0]];
        newCube.B[0] = [...newCube.L[0]];
        newCube.L[0] = temp;
      }
    }
    // Add similar logic for other faces (D, F, B, R, L)
  }
  
  return newCube;
};