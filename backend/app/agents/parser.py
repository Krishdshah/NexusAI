import json
from typing import Dict, Any, Optional
from ..llm.ollama import OllamaProvider
from ..llm.schemas.requirement import RequirementSchema

class RequirementParser:
    """
    Parses natural language requirements into structured JSON (RequirementSchema)
    using the Ollama provider.
    """
    def __init__(self, provider: OllamaProvider):
        self.provider = provider
        self.system_prompt = (
            "You are an expert requirement parser. Extract the user's intent into a strict JSON payload.\n"
            "You must conform to the following JSON schema exactly:\n"
            "{\n"
            "  'entity_type': 'string (supplier, professional, trend, compliance)',\n"
            "  'requested_results': 'integer (1-100)',\n"
            "  'hard_constraints': 'dict',\n"
            "  'confidence': 'float (0.0 - 1.0)'\n"
            "}\n"
        )

    async def parse(self, user_query: str) -> Optional[RequirementSchema]:
        """
        Takes raw user text, queries the LLM, and returns a validated Pydantic model.
        """
        full_prompt = f"{self.system_prompt}\nUser Query: {user_query}\nRespond ONLY with JSON."
        
        try:
            # Query the provider
            raw_data = await self.provider.generate_json(
                prompt=full_prompt, 
                schema=RequirementSchema.model_json_schema()
            )
            
            # Validate via Pydantic
            validated = RequirementSchema(**raw_data)
            return validated
            
        except Exception as e:
            # Logging mechanism would go here
            print(f"Failed to parse requirement: {str(e)}")
            return None
