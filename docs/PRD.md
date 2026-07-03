# NexusAI - Product Requirements Document (PRD)

## 1. Product Vision
NexusAI is a production-grade, agentic AI platform that enables businesses to discover and verify suppliers, professionals, and opportunities across an enterprise dataset. It transforms natural language requirements into strict, deterministic database queries, validates all matches, and drafts outreach—all while enforcing human-in-the-loop approval.

## 2. Target Audience
- Procurement Officers
- Supply Chain Managers
- HR / Talent Acquisition
- Project Managers

## 3. Core Capabilities (The "Must Haves")
1. **Natural Language Requirement Parsing**: The LLM extracts structured data (entity type, hard constraints, soft preferences).
2. **Deterministic Search & Ranking**: The system queries a PostgreSQL database strictly based on parsed constraints. Ranking uses fixed weights (e.g., Relevance 30%, Location 20%, Constraints 25%, Availability 15%, Reputation 10%).
3. **Automated Validation Loop**: Before showing recommendations, a deterministic engine verifies the data. If constraints are violated, the agent attempts to fix the query (max 3 retries).
4. **Human-in-the-Loop (HitL)**: The agent proposes actions (e.g., email drafts), but requires a human click to "Approve" or "Reject".
5. **Execution Transparency**: Users can view the internal reasoning steps, tool calls, and validation logs in the UI (LangSmith-style trace).

## 4. Non-Functional Requirements
- **Local-First / Private**: Relies on Ollama (Qwen3:4B) to ensure data privacy.
- **Containerized**: Must run via a single `docker compose up --build`.
- **Reliability**: No LLM direct access to the database to prevent hallucinations and SQL injections. All access is via deterministic Python tools.

## 5. Success Metrics
- 100% adherence to Hard Constraints (no hallucinated suppliers).
- Zero automated, irreversible actions without human approval.
- High trace visibility for every search query.
