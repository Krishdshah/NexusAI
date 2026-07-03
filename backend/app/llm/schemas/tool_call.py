from pydantic import BaseModel, Field
from typing import Dict, Any

class ToolCall(BaseModel):
    tool_name: str
    arguments: Dict[str, Any]
    reason: str
    confidence: float = Field(ge=0.0, le=1.0)
