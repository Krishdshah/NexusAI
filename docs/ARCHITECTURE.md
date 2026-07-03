# NexusAI Architecture

## High-Level Architecture
NexusAI is split into three primary tiers:
1. **Frontend (Next.js 15)**: The user interface.
2. **Backend (FastAPI)**: The orchestration and tool execution layer.
3. **Data & AI Layer (PostgreSQL, Redis, Ollama)**: Data persistence, caching, and local inference.

## The Agentic Pipeline
The backend implements the Agent logic in strict stages:

1. **User Request** -> `Parser Module` -> Structured JSON (Constraints, Entity, Goal)
2. **Planner Module** -> Identifies required tools and sequence.
3. **Tool Executor** -> Invokes Python tools (e.g., `search_entities()`).
4. **Database (PostgreSQL)** -> Returns deterministic, real data via SQLAlchemy.
5. **Scorer Module** -> Ranks results deterministically (not by LLM).
6. **Validator Module** -> Cross-checks results against the structured JSON constraints.
   - *If invalid*: Feeds failure reason back to Planner -> Retries (Max 3).
   - *If valid*: Proceeds.
7. **Outreach/Action Drafter (LLM)** -> Prepares the final summary and proposed action (e.g., draft email).
8. **Human Approval** -> Pauses execution until frontend confirms the action.

## Tool Isolation Architecture
The LLM never generates SQL. It outputs JSON tool calls. The FastAPI backend maps these JSON calls to strictly typed Python functions that use SQLAlchemy repositories.

```
[LLM (Qwen3)] <--- JSON (Tool Name + Args) ---> [Tool Router] <---> [Python Repository] <---> [PostgreSQL]
```

## Deployment
Docker Compose manages the full stack. The `docker-compose.yml` spins up:
- `frontend` (Port 3000)
- `backend` (Port 8000)
- `db` (Port 5432)
- `redis` (Port 6379)
- `ollama` (Port 11434)
