# NexusAI Architecture Specification

## Overview
NexusAI is an enterprise-grade autonomous reasoning engine built with an inside-out, deterministic-first philosophy.

## System Components

### 1. Frontend (Next.js 15)
- **Framework**: Next.js App Router (React 19)
- **Styling**: Tailwind CSS v4
- **State**: Server Components with Client-side routing.

### 2. Backend (FastAPI + SQLAlchemy)
- **Framework**: FastAPI (Async)
- **ORM**: SQLAlchemy 2.0
- **Database**: PostgreSQL with Multi-Schema (`business`, `agent`, `analytics`)
- **Validation**: Strict Pydantic models with custom constraint validation.

### 3. Intelligence Layer (Ollama)
- **Provider**: Local Ollama (Qwen2.5)
- **Contracts**: Strict JSON schemas using Pydantic.
- **Workflow**: Parser -> Planner -> Executor -> Validator -> Formatter.
- **Safety**: The LLM acts purely as a reasoning engine. It cannot execute raw SQL or arbitrary code. All tools are registered dynamically and validated via `AgentValidator`.

### 4. Infrastructure
- **Orchestration**: Docker Compose
- **Services**: Backend, Frontend, Postgres, Redis, Ollama.
