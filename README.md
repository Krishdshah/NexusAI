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

## 🛠️ Quickstart

Run the entire containerized stack locally (Frontend, FastAPI, PostgreSQL, Redis, Ollama):

```bash
docker compose up --build
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
