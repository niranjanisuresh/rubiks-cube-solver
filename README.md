# 🧩  3D Rubik’s Cube Solver with Kociemba Algorithm | Scalable React + Three.js Frontend Architecture

A **3D Rubik’s Cube Solver** built with **React, TypeScript, and Three.js**, designed to solve a **standard 3x3 Rubik's Cube from any scrambled state** using real-world move logic. The project showcases robust cube state modeling, efficient solving using the **Kociemba two-phase algorithm**, and interactive 3D visualizations across multiple cube sizes (2x2, 3x3, 4x4).

---

## 🏆 Challenge Goals

This project addresses:

1. **Problem-Solving Approach**: How to deconstruct cube-solving into logical, programmable steps.
2. **Cube State Modeling**: Efficient data structures to represent cube faces and permutations.
3. **State Transition & Prediction**: Accurate simulation of rotations and state predictions after every move.
4. **Algorithm Efficiency**: Backend solving using Kociemba’s optimized algorithm with minimal moves.
5. **Visual Simulation (WOW Factor)**: Interactive, smooth 3D animations mimicking real-world cube rotations.
6. **Scalability**: Architecture designed to extend support for 2x2, 4x4, and larger cubes with shared logic.

---

## 🚀 Key Features

### 🧠 Problem Decomposition & Move Engine

* The cube is **modeled as an array-of-arrays**, representing each face's stickers.
* A **Move Engine** simulates:

  * Face rotations (e.g., U, D, L, R, F, B)
  * Slice moves (M, E, S)
  * Layer rotations for larger cubes (NxN)
* Move logic applies **accurate permutations** to sticker positions, mimicking real cube rotations.

### 📊 Data Structures & State Modeling

* **Cube Representation**: 3D array-based model → `[face][row][col]`.
* Predictable, mutable structure allows:

  * Quick access to any sticker.
  * Efficient simulation of cube transformations.
* **Move Sequences** are tracked as arrays of operations for history, undo/redo, and playback.

### 🔗 Kociemba Solver Integration

* Backend API integration with the **Kociemba two-phase algorithm**:

  * Input: Current cube state.
  * Output: Optimal sequence of moves to solve the cube.
* The frontend visualizes these moves with **animated step-by-step playback**.
* Achieves solving sequences within **20-25 moves** for most scrambled states.

### 🖥️ Interactive 3D Visualization

* Built using **react-three-fiber (Three.js in React)**.
* Realistic cube rendering with:

  * Accurate face colors and borders.
  * Smooth, natural rotation animations.
  * Camera controls for orbiting and zooming.
* Visual playback of solving steps for **educational & demonstration purposes**.

### 🧱 Scalable Architecture

* Modular design supports:

  * Multiple cube sizes (2x2, 3x3, 4x4) via shared core logic.
  * Clean separation of **UI, Cube Logic, Solver API, and State Management**.
* Uses **Zustand** for lightweight global state handling (move history, playback control).

---

## 📊 Algorithm Efficiency

* **Backend Solver (Kociemba Algorithm)**:

  * Time Complexity: O(1) for typical cases (precomputed tables).
  * Guarantees solving within **20 moves (God’s number bound)**.
* **Frontend Move Engine**:

  * Real-time cube state updates with O(1) face rotation operations.
  * Efficient DOM-to-3D rendering updates via React reconciler.

---

## 🏗️ Project Structure

```
src/
 ┣ components/       // UI Components (CubeCanvas, Controls, Playback)
 ┣ hooks/            // Custom hooks (useCubeState, useAnimations)
 ┣ models/           // Cube data structures & transformations logic
 ┣ state/            // Global Zustand store (cube state, move history)
 ┣ services/         // Kociemba Solver API integration logic
 ┣ utils/            // Helper functions for rotations, array manipulations
 ┣ App.tsx           // Root component
 ┗ main.tsx          // Entry point
```

---

## 🛠️ Tech Stack

| Tech                             | Purpose                                 |
| -------------------------------- | --------------------------------------- |
| **React + TypeScript**           | UI components & type-safe architecture  |
| **Zustand**                      | Lightweight global state management     |
| **Three.js + react-three-fiber** | 3D cube rendering & animations          |
| **Vite**                         | Fast development server & build tooling |
| **Kociemba Solver (Backend)**    | Optimized two-phase solving algorithm   |

---

## 🖥️ Local Setup Instructions

```bash
# Clone the repository
git clone https://github.com/niranjanisuresh/rubiks-cube-solver.git

# Navigate to the project directory
cd rubiks-cube-solver

# Install dependencies
npm install

# Start the development server
npm run dev
``
Live demo: https://rubiks-cube-solver-02.vercel.app (rubiks-cube-solver-02.vercel.app)
---

## 📈 Future Enhancements

* Support larger cubes (5x5, 6x6, etc.)
* Implement multiple solving algorithms (Roux, CFOP)
* Mobile-friendly UI with touch gestures
* Timer mode for speed-solving practice
* Analytics dashboard for move counts, solving time, and efficiency

---

## 📸 Screenshots

  <img src="https://github.com/niranjanisuresh/rubiks-cube-solver/blob/6d52ba19cd14c45c78d271ad09b5975146715a03/2x2cube.png.png" width="300"/>
  <img src="https://github.com/niranjanisuresh/rubiks-cube-solver/blob/6d52ba19cd14c45c78d271ad09b5975146715a03/3x3cube.png.png" width="300"/>
  <img src="https://github.com/niranjanisuresh/rubiks-cube-solver/blob/6d52ba19cd14c45c78d271ad09b5975146715a03/4x4cube.png.png" width="300"/>


---

## 📬 Contact

* LinkedIn: [Niranjani S](https://www.linkedin.com/in/niranjani-s-75519b2a6/)
* GitHub: [niranjanisuresh](https://github.com/niranjanisuresh)

---

