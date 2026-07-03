import os

files_to_create = {
    # SCHEMAS
    "backend/app/llm/schemas/__init__.py": "",
    "backend/app/llm/schemas/requirement.py": """from pydantic import BaseModel, Field
from typing import Literal, Dict, Any, List

class RequirementSchema(BaseModel):
    objective: str
    entity_type: Literal["supplier", "business", "professional", "project", "opportunity"]
    hard_constraints: Dict[str, Any] = Field(default_factory=dict)
    preferences: Dict[str, Any] = Field(default_factory=dict)
    requested_results: int = 3
    missing_information: List[str] = Field(default_factory=list)
    confidence: float = Field(ge=0.0, le=1.0)
""",
    "backend/app/llm/schemas/plan.py": """from pydantic import BaseModel
from typing import List

class PlanSchema(BaseModel):
    steps: List[str]
    estimated_tools: List[str]
    reasoning: str
    requires_clarification: bool
""",
    "backend/app/llm/schemas/tool_call.py": """from pydantic import BaseModel, Field
from typing import Dict, Any

class ToolCall(BaseModel):
    tool_name: str
    arguments: Dict[str, Any]
    reason: str
    confidence: float = Field(ge=0.0, le=1.0)
""",
    "backend/app/llm/schemas/response.py": """from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class AgentResponse(BaseModel):
    requirement: Dict[str, Any]
    plan: Dict[str, Any]
    matches: List[Dict[str, Any]]
    validation: Dict[str, Any]
    next_action: str
    draft_message: Optional[str] = None
    approval_required: bool
    execution_summary: str
""",
    "backend/app/llm/schemas/validation.py": "class ValidationSchema: pass\n",
    "backend/app/llm/schemas/correction.py": "class CorrectionSchema: pass\n",
}

for path, content in files_to_create.items():
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Scaffolded Phase 7 Intelligence Layer Schemas.")
