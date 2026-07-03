from pydantic import BaseModel
from typing import List

class PlanSchema(BaseModel):
    steps: List[str]
    estimated_tools: List[str]
    reasoning: str
    requires_clarification: bool
