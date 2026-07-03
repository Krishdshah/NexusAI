from typing import Dict, Any, List, Optional
from pydantic import BaseModel, ValidationError

class ValidationResult(BaseModel):
    is_valid: bool
    errors: List[str]
    corrected_payload: Optional[Dict[str, Any]] = None

class AgentValidator:
    """
    Deterministic validation engine.
    Ensures that LLM outputs conform to business rules and security policies
    before they are allowed to execute or be stored in the database.
    """
    
    def validate_tool_call(self, tool_name: str, arguments: Dict[str, Any]) -> ValidationResult:
        """
        Validates an emitted tool call against registered tool constraints.
        """
        errors = []
        
        # Security: Prevent execution of unknown tools
        allowed_tools = ["search_suppliers", "analyze_compliance", "query_market"]
        if tool_name not in allowed_tools:
            errors.append(f"Security Violation: Tool '{tool_name}' is not registered.")
            
        # Hard constraint: Ensure no direct SQL execution strings exist in arguments
        for k, v in arguments.items():
            if isinstance(v, str) and ("SELECT " in v.upper() or "DROP " in v.upper()):
                errors.append(f"Security Violation: Potential SQL injection detected in argument '{k}'.")
                
        if errors:
            return ValidationResult(is_valid=False, errors=errors)
            
        return ValidationResult(is_valid=True, errors=[])
        
    def validate_plan(self, steps: List[Dict[str, Any]]) -> ValidationResult:
        """
        Validates the generated execution plan for logical consistency.
        """
        errors = []
        if len(steps) > 10:
            errors.append("Constraint Violation: Plan exceeds maximum of 10 steps.")
            
        if len(steps) == 0:
            errors.append("Logical Violation: Plan is empty.")
            
        if errors:
            return ValidationResult(is_valid=False, errors=errors)
            
        return ValidationResult(is_valid=True, errors=[])
