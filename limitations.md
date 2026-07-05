# Known Limitations
Although NexusAI demonstrates a complete end-to-end agentic workflow, several areas have been intentionally scoped to fit the assignment timeline and can be further enhanced for production deployment.


## Synthetic Dataset
The platform currently operates on a locally generated synthetic enterprise dataset rather than real-world business data. While it accurately simulates suppliers, businesses, professionals, opportunities, certifications, and interactions, it does not reflect continuously changing real market conditions.


## Local LLM Constraints
The system is optimized for lightweight local inference using an Ollama-hosted open-source language model. Smaller local models provide fast and private execution but may occasionally require clarification for highly complex or ambiguous business requirements compared to significantly larger cloud-hosted models.


## Single-Agent Architecture
NexusAI currently uses a single orchestrating AI agent responsible for requirement parsing, planning, tool invocation, and response generation. Future versions could adopt a multi-agent architecture with specialized Planner, Research, Validation, and Decision agents collaborating independently.


## Rule-Based Match Scoring
Recommendation ranking is currently based on deterministic weighted scoring using structured business attributes such as relevance, location, certifications, capacity, availability, and reputation. Future work could incorporate adaptive machine learning ranking models that learn from user feedback and historical interactions.


## Limited Conversational Memory
Conversational memory is currently session-scoped to preserve recent interactions and maintain context during multi-turn conversations. Long-term user preferences, organizational memory, and cross-session personalization have not yet been implemented.


## No Semantic Vector Retrieval
The current retrieval pipeline primarily relies on structured database queries and constraint-based filtering. Future versions could integrate vector embeddings and semantic search to improve retrieval for broader natural language business queries.


## Human-in-the-Loop Actions Only
In accordance with responsible AI principles and the assignment requirements, NexusAI only prepares recommended business actions (such as outreach messages or supplier recommendations). It intentionally does not execute irreversible actions like sending emails, awarding suppliers, modifying records, or creating contracts without explicit user approval.


## Authentication and Multi-Tenant Security
The current prototype focuses on demonstrating the AI agent architecture. Enterprise-grade authentication, role-based access control (RBAC), organization isolation, audit permissions, and multi-tenant deployment are planned for future iterations.


## Scalability Testing
While the backend is designed using asynchronous FastAPI services and containerized deployment, comprehensive stress testing, distributed deployment, horizontal scaling, and production load benchmarking have not yet been performed.


## External Enterprise Integrations
The current implementation operates entirely on local data sources. Future versions could integrate enterprise systems such as ERP platforms, CRM solutions, procurement software, cloud storage providers, and external business directories to enable real-time business discovery and workflow automation.


## Observability and Monitoring
The platform includes execution history and runtime tracing; however, advanced production monitoring such as distributed tracing, centralized log aggregation, performance dashboards, and automated alerting has not yet been integrated.


## Production Readiness
NexusAI has been architected with modular components, containerization, and clear separation between AI reasoning and deterministic business logic. Nevertheless, additional work—including comprehensive automated testing, security hardening, CI/CD pipelines, disaster recovery, and cloud deployment—would be required before production use.
