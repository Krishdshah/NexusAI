from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    LLM_PROVIDER: str = "ollama"
settings = Settings()
