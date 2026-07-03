# NexusAI

NexusAI is a local-first, agentic AI platform designed for enterprise business discovery and verification.

## Features
- **Deterministic Search**: Powered by PostgreSQL and structured JSON generation.
- **Validation Engine**: Strictly enforces hard constraints and retries upon failure.
- **Human-in-the-Loop**: Halts execution for human approval before taking action.
- **Local Inference**: Uses Ollama and Qwen3:4B.

## Quickstart

Run the entire stack locally:
```bash
docker compose up --build
```

Access the dashboard at `http://localhost:3000`.

## Documentation
Please refer to the `docs/` folder for comprehensive architecture, database schemas, and API contracts.
