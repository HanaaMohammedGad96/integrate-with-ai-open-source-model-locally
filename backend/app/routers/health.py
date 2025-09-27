from fastapi import APIRouter, Depends
from datetime import datetime
import logging

from ..models.health import HealthStatus
from ..services.ollama_service import OllamaService
from ..dependencies import get_ollama_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/health", tags=["health"])


@router.get("/", response_model=HealthStatus)
async def health_check(
    ollama_service: OllamaService = Depends(get_ollama_service)
):
    """Check if Ollama is running and service is healthy"""
    try:
        health_data = await ollama_service.check_health()
        return HealthStatus(
            status=health_data["status"],
            ollama=health_data["ollama"],
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"Health check error: {str(e)}")
        return HealthStatus(
            status="unhealthy",
            ollama="not running",
            timestamp=datetime.utcnow().isoformat()
        )


@router.get("/ping")
async def ping():
    """Simple ping endpoint"""
    return {"message": "pong", "timestamp": datetime.utcnow().isoformat()}
