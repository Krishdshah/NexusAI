import pytest
from pydantic import ValidationError
from app.llm.schemas.requirement import RequirementSchema
from app.llm.schemas.plan import PlanSchema
from app.llm.schemas.tool_call import ToolCall
from app.llm.schemas.response import AgentResponse

def test_requirement_schema_valid():
    req = RequirementSchema(
        objective="Find suppliers",
        entity_type="supplier",
        hard_constraints={"location": "NY"},
        confidence=0.9
    )
    assert req.objective == "Find suppliers"
    assert req.entity_type == "supplier"

def test_requirement_schema_invalid_entity_type():
    with pytest.raises(ValidationError):
        RequirementSchema(
            objective="Find suppliers",
            entity_type="invalid_type",
            confidence=0.9
        )

def test_requirement_schema_invalid_confidence():
    with pytest.raises(ValidationError):
        RequirementSchema(
            objective="Find suppliers",
            entity_type="supplier",
            confidence=1.5
        )

def test_plan_schema_valid():
    plan = PlanSchema(
        steps=["Step 1"],
        estimated_tools=["search_entities"],
        reasoning="Because",
        requires_clarification=False
    )
    assert len(plan.steps) == 1

def test_tool_call_valid():
    tc = ToolCall(
        tool_name="search_entities",
        arguments={"key": "value"},
        reason="Testing",
        confidence=0.8
    )
    assert tc.tool_name == "search_entities"

def test_tool_call_invalid_confidence():
    with pytest.raises(ValidationError):
        ToolCall(
            tool_name="search_entities",
            arguments={},
            reason="Testing",
            confidence=-0.1
        )

def test_agent_response_valid():
    res = AgentResponse(
        requirement={"objective": "find"},
        plan={"steps": []},
        matches=[],
        validation={},
        next_action="email",
        approval_required=True,
        execution_summary="Done"
    )
    assert res.approval_required is True
