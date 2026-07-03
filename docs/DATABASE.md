# NexusAI Database Schema

This document outlines the production-grade PostgreSQL schema for NexusAI. The database is highly normalized and designed to support fast deterministic searching, relationship tracking, and detailed logging for the AI agent's execution and validation pipelines.

## 1. Core Entities

### `users`
Represents the human users interacting with the platform.
- `id` (UUID, PK)
- `email` (VARCHAR, Unique, Indexed)
- `name` (VARCHAR)
- `role` (VARCHAR) - e.g., 'admin', 'procurement', 'standard'
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `businesses`
Represents client or partner organizations.
- `id` (UUID, PK)
- `name` (VARCHAR, Indexed)
- `industry` (VARCHAR)
- `company_size` (VARCHAR)
- `founded_year` (INTEGER)
- `website` (VARCHAR)
- `created_at` (TIMESTAMP)

### `suppliers`
Represents companies providing goods or services.
- `id` (UUID, PK)
- `name` (VARCHAR, Indexed)
- `description` (TEXT)
- `production_capacity` (INTEGER) - e.g., units per month
- `lead_time_days` (INTEGER)
- `status` (VARCHAR) - e.g., 'active', 'inactive', 'under_review'
- `created_at` (TIMESTAMP)

### `professionals`
Represents individual talents or freelancers.
- `id` (UUID, PK)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `title` (VARCHAR)
- `hourly_rate` (NUMERIC(10, 2))
- `created_at` (TIMESTAMP)

## 2. Relationships & Taxonomy

### `locations`
Standardized locations for entities.
- `id` (UUID, PK)
- `entity_type` (VARCHAR) - 'business', 'supplier', 'professional', 'project'
- `entity_id` (UUID, Indexed)
- `city` (VARCHAR)
- `state` (VARCHAR)
- `country` (VARCHAR, Indexed)
- `latitude` (NUMERIC(9, 6))
- `longitude` (NUMERIC(9, 6))

### `products`
Master catalog of available products.
- `id` (UUID, PK)
- `name` (VARCHAR)
- `category` (VARCHAR, Indexed)

### `supplier_products`
Linking suppliers to the products they offer.
- `supplier_id` (UUID, FK -> suppliers.id, PK part 1)
- `product_id` (UUID, FK -> products.id, PK part 2)
- `unit_price` (NUMERIC(10, 2))
- `minimum_order_quantity` (INTEGER)

### `skills`
Skills associated with professionals.
- `id` (UUID, PK)
- `professional_id` (UUID, FK -> professionals.id)
- `skill_name` (VARCHAR, Indexed)
- `proficiency_level` (VARCHAR) - 'beginner', 'intermediate', 'expert'

### `certifications`
Master list of recognized certifications (e.g., ISO 9001, SOC2).
- `id` (UUID, PK)
- `name` (VARCHAR, Unique)
- `issuing_body` (VARCHAR)

### `supplier_certifications`
Linking suppliers to their certifications.
- `supplier_id` (UUID, FK -> suppliers.id, PK part 1)
- `certification_id` (UUID, FK -> certifications.id, PK part 2)
- `issued_date` (DATE)
- `expiry_date` (DATE, Indexed)

## 3. Operations & Feedback

### `projects`
Internal projects requiring resources.
- `id` (UUID, PK)
- `business_id` (UUID, FK -> businesses.id)
- `name` (VARCHAR)
- `budget` (NUMERIC(15, 2))
- `start_date` (DATE)
- `end_date` (DATE)
- `status` (VARCHAR)

### `opportunities`
External RFPs, bids, or procurement opportunities.
- `id` (UUID, PK)
- `title` (VARCHAR)
- `description` (TEXT)
- `budget_range_min` (NUMERIC(15,2))
- `budget_range_max` (NUMERIC(15,2))
- `deadline` (TIMESTAMP)
- `status` (VARCHAR) - 'open', 'closed', 'awarded'

### `availability`
Tracking availability of suppliers or professionals.
- `id` (UUID, PK)
- `entity_type` (VARCHAR) - 'supplier', 'professional'
- `entity_id` (UUID, Indexed)
- `start_date` (DATE)
- `end_date` (DATE)
- `is_available` (BOOLEAN)

### `ratings`
Performance ratings.
- `id` (UUID, PK)
- `entity_type` (VARCHAR)
- `entity_id` (UUID)
- `score` (NUMERIC(3, 2)) - e.g., 1.00 to 5.00
- `review_text` (TEXT)
- `created_at` (TIMESTAMP)

### `interaction_history`
Record of past business interactions.
- `id` (UUID, PK)
- `entity_a_type` (VARCHAR)
- `entity_a_id` (UUID)
- `entity_b_type` (VARCHAR)
- `entity_b_id` (UUID)
- `interaction_type` (VARCHAR) - 'contract', 'inquiry', 'meeting'
- `interaction_date` (TIMESTAMP)
- `outcome` (VARCHAR)

## 4. Agent Infrastructure (Auditing & Execution)

### `search_history`
Logs of natural language queries made by users.
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users.id)
- `query_text` (TEXT)
- `structured_requirements` (JSONB) - Storing the parsed output from the LLM
- `created_at` (TIMESTAMP)

### `execution_logs`
Detailed traces of the agent's planning and execution.
- `id` (UUID, PK)
- `search_id` (UUID, FK -> search_history.id)
- `step_name` (VARCHAR)
- `status` (VARCHAR) - 'pending', 'success', 'failed'
- `log_data` (JSONB) - Context and intermediate reasoning
- `created_at` (TIMESTAMP)

### `tool_calls`
Tracking exactly which tools the agent invoked.
- `id` (UUID, PK)
- `execution_id` (UUID, FK -> execution_logs.id)
- `tool_name` (VARCHAR)
- `arguments` (JSONB)
- `result` (JSONB)
- `execution_time_ms` (INTEGER)
- `created_at` (TIMESTAMP)

### `validation_logs`
Results of the deterministic validation engine.
- `id` (UUID, PK)
- `search_id` (UUID, FK -> search_history.id)
- `entity_id` (UUID) - The recommended entity
- `attempt_number` (INTEGER)
- `is_valid` (BOOLEAN)
- `failed_constraints` (JSONB) - Which hard constraints were violated
- `created_at` (TIMESTAMP)

### `approval_requests`
Requests waiting for Human-in-the-Loop validation.
- `id` (UUID, PK)
- `search_id` (UUID, FK -> search_history.id)
- `action_type` (VARCHAR) - e.g., 'draft_outreach', 'award_contract'
- `payload` (JSONB) - The proposed email draft or payload
- `status` (VARCHAR) - 'pending', 'approved', 'rejected', 'modified'
- `reviewed_by` (UUID, FK -> users.id, Nullable)
- `reviewed_at` (TIMESTAMP, Nullable)
- `created_at` (TIMESTAMP)
