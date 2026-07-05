# NexusAI

NexusAI is a local-first, agentic AI platform designed for enterprise business discovery and verification. Built with a robust, provider-agnostic agent runtime, it transforms natural language requirements into strict, deterministic database queries, validates all matches, and enforces human-in-the-loop approval.

## 🚀 Core Features

- **Enterprise-Grade Agent Runtime**: Centralized `AgentState` management, dynamic `ToolRegistry`, and `AgentContext`.
- **Provider-Agnostic LLM Interface**: Seamlessly switch between Ollama (Qwen3:4B), OpenAI, Gemini, or Claude using a simple `LLMClient` adapter pattern.
- **Deterministic Validation Loop**: Strictly enforces hard constraints and executes autonomous correction loops (up to 3 retries) on failure.
- **Human-in-the-Loop**: Never executes irreversible business actions (like sending outreach) without explicit UI approval.
- **Multi-Schema PostgreSQL Architecture**: Highly normalized databases separated by `business`, `agent` lifecycle tracking, and `analytics` for execution traces and match scores.

## 📁 Architecture Overview

The system is designed **Inside-Out**, ensuring the LLM is just a reasoning engine attached to a solid deterministic foundation.

- **`frontend/`**: Next.js 15 UI with execution timelines (LangSmith-style).
- **`backend/`**: FastAPI orchestration, Tool Executor, Validation Engine, and LLM providers.
- **`docs/`**: Comprehensive specifications for DB schemas, API contracts, prompt design, and ER diagrams.
- **`scripts/`**: Synthetic dataset generation for seeding realistic business scenarios, including intentional constraints and prompt injection tests.

## 🛠️ Setup and Installation

You can run NexusAI entirely in Docker, or run the frontend and backend locally while relying on Docker for PostgreSQL and Ollama.

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- Python (v3.11+)

### Option 1: Full Docker Compose (Recommended)

1. Start all services in the background:
   ```bash
   docker-compose up -d --build
   ```
2. Pull the required Qwen model into the Ollama container (this may take a few minutes):
   ```bash
   docker exec nexusai-ollama-1 ollama pull qwen
   ```
3. The dashboard will be available at `http://localhost:3000`.

### Option 2: Local Development Setup

If you want to run the frontend and backend locally with hot-reloading:

1. **Start the Infrastructure (Database, Redis, Ollama)**
   ```bash
   # Stop frontend and backend containers if they are running
   docker-compose stop frontend backend
   
   # Start the necessary infrastructure
   docker-compose up -d db redis ollama
   
   # Pull the Ollama model (if not already done)
   docker exec nexusai-ollama-1 ollama pull qwen
   ```

2. **Run the Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Initialize the database schemas and tables
   python init_db.py
   
   # Start the FastAPI server
   python -m uvicorn app.main:app --reload
   ```

3. **Run the Frontend**
   ```bash
   # In a new terminal window
   cd frontend
   npm install
   
   # Start the Next.js development server
   npm run dev
   ```
   Access the dashboard at `http://localhost:3000`.

## 📖 Documentation

Please refer to the `docs/` folder for detailed design artifacts:
- `ARCHITECTURE.md`
- `DATABASE.md`
- `ER_DIAGRAM.md`
- `AGENT_FLOW.md`
- `API_CONTRACT.md`
- `PROMPTS.md`
- `TEST_PLAN.md`

See [limitations.md](./limitations.md) for known platform limitations.
