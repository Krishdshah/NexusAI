import pytest
from unittest.mock import AsyncMock
from app.agents.parser import RequirementParser
from app.validation.validator import AgentValidator

@pytest.mark.asyncio
async def test_end_to_end_pipeline():
    """
    Tests the flow from parser to validator without a real LLM.
    """
    # 1. Mock the Provider
    mock_provider = AsyncMock()
    mock_provider.generate_json.return_value = {
        "entity_type": "supplier",
        "requested_results": 10,
        "hard_constraints": {"region": "EU"},
        "confidence": 0.95
    }
    
    # 2. Parse Requirement
    parser = RequirementParser(provider=mock_provider)
    requirement = await parser.parse("Find 10 suppliers in the EU.")
    
    assert requirement is not None
    assert requirement.entity_type == "supplier"
    assert requirement.requested_results == 10
    
    # 3. Validate Tool Call (Simulating the agent selecting a tool based on the requirement)
    validator = AgentValidator()
    result = validator.validate_tool_call(
        tool_name="search_suppliers",
        arguments={"region": "EU", "limit": 10}
    )
    
    assert result.is_valid is True
    assert len(result.errors) == 0

@pytest.mark.asyncio
async def test_sql_injection_rejection():
    """
    Ensures the validation engine catches malicious intent.
    """
    validator = AgentValidator()
    result = validator.validate_tool_call(
        tool_name="search_suppliers",
        arguments={"query": "SELECT * FROM users"}
    )
    
    assert result.is_valid is False
    assert "SQL injection detected" in result.errors[0]
