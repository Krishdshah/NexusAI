from pydantic import BaseModel, Field
from typing import Literal, Dict, Any, List

class RequirementSchema(BaseModel):
    objective: str
    entity_type: Literal["supplier", "business", "professional", "project", "opportunity"]
    hard_constraints: Dict[str, Any] = Field(default_factory=dict)
    preferences: Dict[str, Any] = Field(default_factory=dict)
    requested_results: int = 3
    missing_information: List[str] = Field(default_factory=list)
    confidence: float = Field(ge=0.0, le=1.0)
