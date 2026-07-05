from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import agent
from app.api import endpoints

app = FastAPI(title="NexusAI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(agent.router, prefix="/api/agent", tags=["agent"])
app.include_router(endpoints.router, prefix="/api", tags=["data"])
