from pydantic import BaseModel
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
