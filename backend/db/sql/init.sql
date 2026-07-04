CREATE SCHEMA IF NOT EXISTS agent;
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS discovery;
CREATE SCHEMA IF NOT EXISTS business;
CREATE SCHEMA IF NOT EXISTS certification;
CREATE SCHEMA IF NOT EXISTS supplier;

CREATE TABLE IF NOT EXISTS agent.agent_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    user_query TEXT NOT NULL,
    structured_query JSONB,
    plan JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'RUNNING',
    correction_attempts INTEGER NOT NULL DEFAULT 0,
    human_approved BOOLEAN,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    created_by UUID,
    updated_by UUID,
    is_deleted BOOLEAN DEFAULT FALSE
);
