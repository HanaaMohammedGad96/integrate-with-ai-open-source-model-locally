from fastapi import HTTPException
from typing import Any, Dict, Optional


class ChatException(Exception):
    """Base exception for chat-related errors"""
    
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        self.message = message
        self.details = details or {}
        super().__init__(self.message)


class OllamaConnectionError(ChatException):
    """Exception raised when Ollama service is not available"""
    pass


class ModelNotFoundError(ChatException):
    """Exception raised when requested model is not available"""
    pass


class ChatProcessingError(ChatException):
    """Exception raised when chat processing fails"""
    pass


def create_http_exception(
    status_code: int,
    message: str,
    details: Optional[Dict[str, Any]] = None
) -> HTTPException:
    """Create a standardized HTTP exception"""
    return HTTPException(
        status_code=status_code,
        detail={
            "message": message,
            "details": details or {}
        }
    )
