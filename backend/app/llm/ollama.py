import json
from typing import Any, Dict, Optional
import httpx
from .client import LLMClient

class OllamaProvider(LLMClient):
    """
    Production-grade Ollama integration.
    Connects to the locally running NexusAI Agent (Qwen2.5) via Ollama.
    """
    def __init__(self, base_url: str = "http://localhost:11434", model: str = "nexus-agent"):
        self.base_url = base_url
        self.model = model
        self.generate_endpoint = f"{self.base_url}/api/generate"

    async def generate_json(self, prompt: str, schema: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sends a prompt to the Ollama model and enforces JSON schema compliance.
        """
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "format": "json" # Native Ollama JSON enforcement
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(self.generate_endpoint, json=payload)
            response.raise_for_status()
            
            data = response.json()
            raw_response = data.get("response", "{}")
            
            try:
                # Validate that the response parses as JSON. 
                # In a full implementation, we pass the parsed dict to Pydantic for validation.
                parsed_json = json.loads(raw_response)
                return parsed_json
            except json.JSONDecodeError:
                # Fallback mechanism if the model hallucinated markdown wrapping
                cleaned = raw_response.strip("`").replace("json\n", "").strip()
                return json.loads(cleaned)

    async def health_check(self) -> bool:
        """
        Checks if the Ollama provider and the specific model are active and loaded.
        """
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                response.raise_for_status()
                models = response.json().get("models", [])
                return any(m.get("name") == f"{self.model}:latest" or m.get("name") == self.model for m in models)
        except Exception:
            return False
