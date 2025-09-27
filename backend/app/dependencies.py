from functools import lru_cache
from fastapi import Depends

from .config import settings
from .services.ollama_service import OllamaService
from .services.chat_service import ChatService


@lru_cache()
def get_settings():
    """Get application settings (cached)"""
    return settings


def get_ollama_service() -> OllamaService:
    """Get Ollama service instance"""
    return OllamaService(
        base_url=settings.ollama_base_url
    )


def get_chat_service(
    ollama_service: OllamaService = Depends(get_ollama_service)
) -> ChatService:
    """Get chat service instance with dependencies"""
    return ChatService(ollama_service=ollama_service)
