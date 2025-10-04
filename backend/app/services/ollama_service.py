import requests
import logging
from typing import Dict, List, Any, Optional
from fastapi import HTTPException
from app.config import settings

logger = logging.getLogger(__name__)


class OllamaService:
    """Service for interacting with Ollama API"""
    
    def __init__(self, base_url: str = None):
        self.base_url = base_url or settings.ollama_base_url
        self.timeout = settings.ollama_timeout
    
    async def generate_response(self, model: str, prompt: str, stream: bool = False) -> Dict[str, Any]:
        """Generate AI response using Ollama"""
        try:
            url = f"{self.base_url}/api/generate"
            data = {
                "model": model,
                "prompt": prompt,
                "stream": stream
            }
            
            logger.info(f"Generating response for model: {model}")
            response = requests.post(url, json=data, timeout=self.timeout)
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Ollama API error: {response.status_code}")
                raise HTTPException(
                    status_code=500, 
                    detail=settings.error_ollama_api
                )
                
        except requests.exceptions.ConnectionError:
            logger.error("Cannot connect to Ollama service")
            raise HTTPException(
                status_code=503, 
                detail=settings.error_ollama_not_running
            )
        except requests.exceptions.Timeout:
            logger.error("Ollama request timeout")
            raise HTTPException(
                status_code=504, 
                detail=settings.error_ollama_timeout
            )
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise HTTPException(
                status_code=500, 
                detail=str(e)
            )
    
    async def get_available_models(self) -> List[str]:
        """Get list of available models from Ollama"""
        try:
            url = f"{self.base_url}/api/tags"
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                models_data = response.json()
                return [model['name'] for model in models_data.get('models', [])]
            else:
                logger.warning("Could not fetch models from Ollama")
                return []
                
        except requests.exceptions.ConnectionError:
            logger.warning("Cannot connect to Ollama for model list")
            return settings.default_models
        except Exception as e:
            logger.error(f"Error fetching models: {str(e)}")
            return settings.default_models
    
    async def check_health(self) -> Dict[str, Any]:
        """Check if Ollama service is healthy"""
        try:
            url = f"{self.base_url}/api/tags"
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                return {"status": "healthy", "ollama": "running"}
            else:
                return {"status": "unhealthy", "ollama": "not running"}
                
        except requests.exceptions.RequestException:
            return {"status": "unhealthy", "ollama": "not running"}
        except Exception as e:
            logger.error(f"Health check error: {str(e)}")
            return {"status": "unhealthy", "ollama": "not running"}
