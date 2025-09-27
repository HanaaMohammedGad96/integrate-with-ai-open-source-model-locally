import logging
from typing import Dict, Any
from ..models.chat import ChatMessage, ChatResponse
from .ollama_service import OllamaService

logger = logging.getLogger(__name__)


class ChatService:
    """Service for handling chat business logic"""
    
    def __init__(self, ollama_service: OllamaService):
        self.ollama_service = ollama_service
    
    async def process_chat_message(self, message: ChatMessage) -> ChatResponse:
        """Process a chat message and return AI response"""
        try:
            logger.info(f"Processing chat message for model: {message.model}")
            
            # Validate model exists
            available_models = await self.ollama_service.get_available_models()
            if available_models and message.model not in available_models:
                logger.warning(f"Model {message.model} not available, using default")
                message.model = "llama2"  # fallback to default
            
            # Generate AI response
            ollama_response = await self.ollama_service.generate_response(
                model=message.model,
                prompt=message.message,
                stream=False
            )
            
            # Extract response text
            ai_response = ollama_response.get("response", "")
            
            if not ai_response:
                logger.warning("Empty response from Ollama")
                ai_response = "I apologize, but I couldn't generate a response. Please try again."
            
            return ChatResponse(
                response=ai_response,
                model=message.model
            )
            
        except Exception as e:
            logger.error(f"Error processing chat message: {str(e)}")
            raise
    
    async def get_available_models(self) -> list[str]:
        """Get list of available AI models"""
        try:
            return await self.ollama_service.get_available_models()
        except Exception as e:
            logger.error(f"Error getting available models: {str(e)}")
            # Return fallback models
            return ['llama2', 'mistral', 'codellama', 'llava']
