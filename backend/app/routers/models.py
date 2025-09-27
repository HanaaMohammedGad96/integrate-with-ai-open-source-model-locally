from fastapi import APIRouter, Depends, HTTPException
import logging

from ..services.chat_service import ChatService
from ..dependencies import get_chat_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/models", tags=["models"])


@router.get("/")
async def get_available_models(
    chat_service: ChatService = Depends(get_chat_service)
):
    """Get available AI models from Ollama"""
    try:
        models = await chat_service.get_available_models()
        return {"models": models}
    except Exception as e:
        logger.error(f"Error fetching models: {str(e)}")
        return {"models": []}


@router.get("/health")
async def check_models_health(
    chat_service: ChatService = Depends(get_chat_service)
):
    """Check if models are accessible"""
    try:
        models = await chat_service.get_available_models()
        return {
            "status": "healthy" if models else "unhealthy",
            "model_count": len(models),
            "models": models
        }
    except Exception as e:
        logger.error(f"Error checking models health: {str(e)}")
        return {
            "status": "unhealthy",
            "model_count": 0,
            "models": []
        }
