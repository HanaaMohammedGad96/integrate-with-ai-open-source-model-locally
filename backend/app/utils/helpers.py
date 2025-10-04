import re
from typing import List, Optional


def sanitize_model_name(model_name: str) -> str:
    """Sanitize model name to prevent injection attacks"""
    # Remove any non-alphanumeric characters except hyphens and underscores
    sanitized = re.sub(r'[^a-zA-Z0-9\-_]', '', model_name)
    return sanitized.lower()


def validate_message_content(content: str) -> bool:
    """Validate message content"""
    if not content or not content.strip():
        return False
    
    # Check for reasonable length (prevent extremely long messages)
    if len(content) > 10000:
        return False
    
    return True


def format_model_list(models: List[str]) -> List[str]:
    """Format and clean model list"""
    if not models:
        return []
    
    # Remove duplicates and sort
    unique_models = list(set(models))
    unique_models.sort()
    
    return unique_models


def extract_error_message(error: Exception) -> str:
    """Extract meaningful error message from exception"""
    if hasattr(error, 'message'):
        return str(error.message)
    elif hasattr(error, 'detail'):
        return str(error.detail)
    else:
        return str(error)


def get_default_models() -> List[str]:
    """Get list of default fallback models"""
    return ['llama3.2', 'mistral', 'codellama', 'llava', 'gemma']
