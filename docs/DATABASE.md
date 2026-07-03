# NexusAI Database Specification

This document provides the final, exhaustive specification of the PostgreSQL database schema used by the NexusAI platform. The database is built around the **Agent Lifecycle**, dividing tables across three distinct schemas: `business`, `agent`, and `analytics`.

## Core Conventions
- **Primary Keys**: UUID (`uuid_generate_v4()`) for every table.
- **Audit Columns**: Every table includes `created_at`, `updated_at`, `created_by`, `updated_by`, and `is_deleted` (Soft Delete).
- **Enums**: Used extensively instead of arbitrary strings.

---

## Schema: `agent` (The Heart of the System)
Models the complete lifecycle of a user request from query to human approval.

### Enums
- `AgentRunStatus`: `RUNNING`, `COMPLETED`, `FAILED`, `AWAITING_APPROVAL`
- `ApprovalStatus`: `PENDING`, `APPROVED`, `REJECTED`, `MODIFIED`
- `ExecutionStatus`: `SUCCESS`, `FAILURE`, `RETRYING`

### Table: `agent_runs`
**Purpose**: The central node for any interaction. Everything ties back here.
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `user_id` | UUID | No | The human initiating the query |
| `user_query` | TEXT | No | Raw input |
| `structured_query` | JSONB | Yes | Parsed constraints and intent |
| `plan` | JSONB | Yes | Generated execution steps |
| `status` | AgentRunStatus | No | Current state |
| `correction_attempts` | INTEGER | No | Default 0 |
| `human_approved` | BOOLEAN | Yes | Set during approval phase |
| `completed_at` | TIMESTAMP | Yes | |
| *(Audit Cols)* | ... | | `created_at`, `updated_at`, `is_deleted` |

### Table: `execution_steps`
**Purpose**: Tracks each phase of the plan (e.g., Parser -> Search -> Filter -> Ranking).
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `run_id` | UUID | No | FK `agent_runs` |
| `step_name` | VARCHAR | No | e.g., "Requirement Parser" |
| `status` | ExecutionStatus | No | |
| `started_at` | TIMESTAMP | No | |
| `completed_at` | TIMESTAMP | Yes | |
| *(Audit Cols)* | ... | | |

### Table: `tool_calls`
**Purpose**: Logs deterministic Python function calls (e.g., `search_entities()`).
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `step_id` | UUID | No | FK `execution_steps` |
| `tool_name` | VARCHAR | No | |
| `input_args` | JSONB | No | |
| `output_data` | JSONB | Yes | |
| `latency_ms` | INTEGER | Yes | |
| `success` | BOOLEAN | No | |
| `error_message` | TEXT | Yes | |
| *(Audit Cols)* | ... | | |

### Table: `approval_requests`
**Purpose**: Halts the agent for Human-in-the-Loop authorization.
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `run_id` | UUID | No | FK `agent_runs` |
| `action_type` | VARCHAR | No | e.g., 'DRAFT_EMAIL' |
| `payload` | JSONB | No | |
| `status` | ApprovalStatus | No | |
| `reviewed_by` | UUID | Yes | |
| `reviewed_at` | TIMESTAMP | Yes | |
| *(Audit Cols)* | ... | | |

---

## Schema: `business`
Stores the strictly normalized, deterministic enterprise data.

### Enums
- `EntityStatus`: `ACTIVE`, `INACTIVE`, `BLACKLISTED`
- `OpportunityStatus`: `OPEN`, `CLOSED`, `EXPIRED`

### Table: `businesses`, `suppliers`, `professionals`
**Purpose**: Core entities.
*(Standard audit columns apply to all)*
- **Notable fields**: `status` (EntityStatus), `name` (VARCHAR), `description` (TEXT), `trusted_notes` (TEXT) - strictly for prompt injection protection (LLM only sees trusted fields).

### Table: `supplier_capabilities`
**Purpose**: Dynamic key-value pairs to prevent rigid schema changes.
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `supplier_id` | UUID | No | FK |
| `capability` | VARCHAR | No | e.g., "Cold Storage" |
| `value` | VARCHAR | Yes | e.g., "Yes", "-20C" |
| *(Audit Cols)* | ... | | |

### Table: `certifications` & `supplier_certifications`
**Purpose**: Normalized tracking of ISO, SOC2, etc.
- `certifications`: `id`, `name`, `type`, `authority`
- `supplier_certifications`: `supplier_id`, `certification_id`, `issue_date`, `expiry_date` (crucial for validation logic).

### Table: `products`, `categories`, `supplier_products`
**Purpose**: Hierarchical taxonomy (Category -> Subcategory) mapped to Suppliers Many-to-Many.
- `products`: `id`, `name`, `category_id`
- `categories`: `id`, `name`, `parent_category_id`
- `supplier_products`: `supplier_id`, `product_id`, `price`, `moq`

### Table: `availability`
**Purpose**: Time-based capacity constraints instead of simple booleans.
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `entity_id` | UUID | No | Polymorphic |
| `available_from` | DATE | No | |
| `available_until` | DATE | Yes | |
| `lead_time_days` | INTEGER | No | |
| `monthly_capacity`| INTEGER | No | |
| *(Audit Cols)* | ... | | |

### Table: `entity_aliases`
**Purpose**: Resolves "EcoPack" vs "Eco-Pack".
- `id`, `entity_type`, `entity_id`, `alias`

---

## Schema: `analytics`
Stores validation states, scores, caching, and ML foundations.

### Table: `match_scores`
**Purpose**: Persists deterministic scores so the UI can render exact reasoning bars.
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `run_id` | UUID | No | FK `agent_runs` |
| `entity_id` | UUID | No | |
| `score_relevance` | NUMERIC | No | |
| `score_constraint`| NUMERIC | No | |
| `score_location` | NUMERIC | No | |
| `score_capacity` | NUMERIC | No | |
| `score_rating` | NUMERIC | No | |
| `score_total` | NUMERIC | No | |
| *(Audit Cols)* | ... | | |

### Table: `validation_logs`
**Purpose**: Details exactly why an entity passed or failed constraints.
| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | UUID | No | PK |
| `run_id` | UUID | No | FK `agent_runs` |
| `entity_id` | UUID | No | |
| `is_valid` | BOOLEAN | No | |
| `failed_constraints` | JSONB | Yes | Fed back to Correction loop |
| `attempt_number`| INTEGER | No | |
| *(Audit Cols)* | ... | | |

### Table: `search_cache`
**Purpose**: Speeds up repeated identical queries.
- `query_hash`, `embedding_hash`, `response_payload`, `expires_at`

### Table: `entity_embeddings` (Future-Proofing)
**Purpose**: Placeholder for future vector/RAG search.
- `entity_id`, `entity_type`, `embedding_model`, `embedding_vector` (Vector type)
