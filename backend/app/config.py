from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    app_name: str = "Multimodal AI Chat API"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Ollama Settings
    ollama_base_url: str = "http://localhost:11434"
    ollama_timeout: int = 60
    
    # CORS Settings
    allowed_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Logging Settings
    log_level: str = "INFO"
    
    # Security Settings
    api_key: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
