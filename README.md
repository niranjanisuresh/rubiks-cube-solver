🧩 Rubik’s Cube Solver Frontend

A modular, scalable, and visually rich Rubik’s Cube solver built with React, TypeScript, and Three.js. This project demonstrates clean architecture, accurate state modeling, and smooth 3D animations across multiple cube sizes.

Screenshots 


 ✅ Evaluation Summary
Problem Breakdown - Modular architecture with clear separation of logic, state, and UI 
Internal Modeling - Cube state modeled as array-of-arrays with mutable, predictable structure 
State Predictio -  Move logic applies rotations accurately; supports preview and playback 
Algorithm Efficiency - Efficient state updates; backend-ready for fast solving algorithms 
Creativity/Visuals-2D and 3D cube UI with smooth animations, realistic colors, and user controls 
Scalability-  Supports 2x2, 3x3, and 4x4 cubes with shared logic and dynamic rendering 

 🚀 Features

- 🎨 3D Cube Visualization 
  Realistic rendering with accurate colors, borders, and lighting using `react-three-fiber`.

- 🧠 Move Logic & State Modeling 
  Clean abstraction of cube state and move operations, supporting all valid face, slice, and layer rotations.

- 📚 Move History & Playback
  Tracks each move with undo/redo capability and animated playback of solving steps.

- 🧱 Scalable Architecture  
  Designed for maintainability and extensibility — supports multiple cube sizes (2x2, 3x3, 4x4) with shared logic.

- 🔗 **Backend Integration Ready
  Easily connects to a backend solver via API for automated solving and step-by-step visualization.

---

 🛠️ Tech Stack

- React + TypeScript— UI and state management
- Zustand— Lightweight global state
- Three.js / react-three-fiber — 3D rendering and animation
- Vite — Fast dev environment and build tooling

🎯 Goals
This project was built to demonstrate:
Clean, modular frontend architecture
Advanced 3D visualization and animation
Integration-ready design for backend solvers
A polished, intuitive user experience

npm install
npm run dev
