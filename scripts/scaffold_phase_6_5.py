import os

files_to_create = {
    # RUNTIME
    "backend/app/runtime/__init__.py": "",
    "backend/app/runtime/runtime.py": """class AgentRuntime:
    def __init__(self, llm, registry, validator, formatter, state_manager):
        pass
    def run(self, query: str):
        pass
""",
    "backend/app/runtime/registry.py": """class ToolRegistry:
    def register(self, func):
        pass
""",
    "backend/app/runtime/executor.py": """class ToolExecutor:
    pass
""",
    "backend/app/runtime/middleware.py": """class ToolMiddleware:
    pass
""",
    "backend/app/runtime/state.py": """class AgentState:
    pass
""",
    "backend/app/runtime/context.py": """class AgentContext:
    pass
""",
    "backend/app/runtime/events.py": """class AgentEvent:
    pass
""",
    "backend/app/runtime/event_bus.py": """class EventBus:
    pass
""",
    "backend/app/runtime/state_machine.py": """import enum
class AgentLifecycle(enum.Enum):
    CREATED = 1
    COMPLETED = 2
""",

    # LLM
    "backend/app/llm/__init__.py": "",
    "backend/app/llm/base.py": """class LLMProvider:
    def generate(self): pass
""",
    "backend/app/llm/ollama.py": """from .base import LLMProvider
class OllamaProvider(LLMProvider):
    pass
""",
    "backend/app/llm/client.py": """class LLMClient:
    pass
""",
    "backend/app/llm/schemas.py": """from pydantic import BaseModel
class StructuredRequirement(BaseModel):
    pass
""",
    "backend/app/llm/prompt_registry.py": """class PromptRegistry:
    pass
""",

    # PROMPTS
    "backend/app/prompts/system.md": "# System Prompt",
    "backend/app/prompts/parser.md": "# Parser Prompt",
    "backend/app/prompts/planner.md": "# Planner Prompt",
    "backend/app/prompts/validator.md": "# Validator Prompt",
    "backend/app/prompts/correction.md": "# Correction Prompt",
    "backend/app/prompts/tool_selector.md": "# Tool Selector Prompt",

    # MEMORY
    "backend/app/memory/__init__.py": "",
    "backend/app/memory/session_memory.py": "class SessionMemory: pass",
    "backend/app/memory/conversation_store.py": "class ConversationStore: pass",

    # CONFIG
    "backend/app/config/__init__.py": "",
    "backend/app/config/settings.py": """from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    LLM_PROVIDER: str = "ollama"
settings = Settings()
""",

    # RESPONSES
    "backend/app/responses/__init__.py": "",
    "backend/app/responses/formatter.py": "class ResponseFormatter: pass",
    "backend/app/responses/dto.py": "class ResponseDTO: pass",
}

for path, content in files_to_create.items():
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Scaffolded Phase 6.5 components.")
