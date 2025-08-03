from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import kociemba

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SolveRequest(BaseModel):
    scramble: str

class SolveResponse(BaseModel):
    moves: List[str]

@app.get("/")
def root():
    return {"message": "Rubik's Cube backend is running."}

@app.get("/scramble")
def get_scramble():
    # Example scramble for demo purposes
    return {"scramble": "U F R U' L D F' D' B R' L' F2"}

@app.post("/solve", response_model=SolveResponse)
def solve_cube(req: SolveRequest):
    try:
        # Note: kociemba expects a facelet string, not WCA scramble moves.
        moves_str = kociemba.solve(req.scramble)
        moves = moves_str.split()
    except Exception:
        moves = []
    return SolveResponse(moves=moves)
