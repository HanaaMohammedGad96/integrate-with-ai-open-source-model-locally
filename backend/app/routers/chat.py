from fastapi import APIRouter, Depends, HTTPException
from typing import List
import logging

from ..models.chat import ChatMessage, ChatResponse
from ..services.chat_service import ChatService
from ..dependencies import get_chat_service
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def chat_with_ai(
    message: ChatMessage,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Chat with AI using Ollama"""
    try:
        logger.info(f"Received chat request for model: {message.model}")
        return await chat_service.process_chat_message(message)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=settings.error_internal
        )


@router.get("/models")
async def get_available_models(
    chat_service: ChatService = Depends(get_chat_service)
):
    """Get available AI models"""
    try:
        models = await chat_service.get_available_models()
        return {"models": models}
    except Exception as e:
        logger.error(f"Error getting models: {str(e)}")
        return {"models": settings.default_models}
