# NexusAI Agent Flow

The agent pipeline is highly structured to prevent hallucinations and ensure business rules are strictly followed.

## Execution Sequence

### 1. Requirement Parser
- **Input**: User's natural language query (e.g., "Find ISO 9001 suppliers in NY under $50k").
- **LLM Task**: Extract JSON containing `entity_type: "supplier"`, `hard_constraints: {location: "NY", certification: "ISO 9001"}`, `soft_constraints: {budget_max: 50000}`.
- **Output**: Validated Pydantic schema representing the request.

### 2. Planner
- **Input**: The parsed Pydantic schema.
- **LLM Task**: Determine the sequence of tools to call (e.g., `[search_entities, filter_constraints, calculate_match_score]`).
- **Output**: A JSON array of step-by-step actions.

### 3. Tool Executor
- **Action**: Iterates over the Planner's steps.
- **Mechanism**: Calls the specific Python functions (e.g., `search_entities("supplier", location="NY")`).
- **Result**: Raw data rows from PostgreSQL.

### 4. Ranking & Scoring
- **Action**: Deterministic Python function calculates scores.
- **Formula**:
  - Relevance (TF-IDF or Embedding match): 30%
  - Location Match: 20%
  - Hard Constraints Satisfied: 25% (If 0%, entity is dropped immediately)
  - Availability: 15%
  - Reputation (Average Rating): 10%
- **Result**: Sorted list of Top N candidates.

### 5. Validation Engine (The Correction Loop)
- **Input**: The Top N candidates + original parsed hard constraints.
- **Action**: Python script verifies if Candidates actually meet all hard constraints.
- **Flow**:
  - If VALID: Proceed to step 6.
  - If INVALID: Identify reason (e.g., "Candidate X is missing ISO 9001"). Log failure. Re-prompt the Planner/Executor with the error message ("Search again, ensuring ISO 9001 is present").
  - Limits: Maximum of 3 retries. If 3 retries fail, return a polite failure to the user.

### 6. Draft Action
- **Input**: Validated top candidates.
- **LLM Task**: Generate a human-readable summary and draft an outreach message (e.g., email to the supplier).
- **Output**: JSON payload with `summary_text` and `draft_email`.

### 7. Human Approval
- **Action**: The Agent pauses.
- **UI Element**: Dashboard shows the Draft Email with "Approve" and "Reject" buttons.
- **Final Result**: The action is only logged or sent if the Human clicks Approve.
