# Multimodal AI Chat Backend

A well-structured FastAPI backend for integrating with local AI models using Ollama.

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app initialization
│   ├── config.py               # Configuration settings
│   ├── dependencies.py         # Dependency injection
│   │
│   ├── models/                 # Pydantic models
│   │   ├── __init__.py
│   │   ├── chat.py            # Chat-related models
│   │   └── health.py          # Health check models
│   │
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── ollama_service.py  # Ollama API integration
│   │   └── chat_service.py    # Chat business logic
│   │
│   ├── routers/                # API routes
│   │   ├── __init__.py
│   │   ├── chat.py            # Chat endpoints
│   │   ├── health.py          # Health check endpoints
│   │   └── models.py          # Model management endpoints
│   │
│   ├── core/                   # Core functionality
│   │   ├── __init__.py
│   │   ├── exceptions.py      # Custom exceptions
│   │   └── logging.py         # Logging configuration
│   │
│   └── utils/                  # Utility functions
│       ├── __init__.py
│       └── helpers.py
│
├── requirements.txt            # Dependencies
├── run.py                     # Application entry point
├── test_api.py               # API testing script
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Ollama installed and running
- At least one AI model pulled in Ollama

### Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start Ollama service:**
   ```bash
   ollama serve
   ```

3. **Run the backend:**
   ```bash
   python run.py
   ```

   Or for development with auto-reload:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Testing

Run the test script to verify all endpoints:
```bash
python test_api.py
```

## 📚 API Endpoints

### Core Endpoints

- `GET /` - Root endpoint with API information
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

### API v1 Endpoints

#### Health
- `GET /api/v1/health/` - Check service health and Ollama status
- `GET /api/v1/health/ping` - Simple ping endpoint

#### Chat
- `POST /api/v1/chat/` - Send chat message to AI model
- `GET /api/v1/chat/models` - Get available models

#### Models
- `GET /api/v1/models/` - Get available AI models
- `GET /api/v1/models/health` - Check models accessibility

## 🔧 Configuration

The application uses environment-based configuration. Create a `.env` file:

```env
# Application Settings
APP_NAME="Multimodal AI Chat API"
APP_VERSION="1.0.0"
DEBUG=false
LOG_LEVEL="INFO"

# Ollama Settings
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_TIMEOUT=60

# CORS Settings (comma-separated)
ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
```

## 🏛️ Architecture Benefits

### Separation of Concerns
- **Models**: Pydantic schemas for data validation
- **Services**: Business logic isolated from API routes
- **Routers**: API endpoints organized by functionality
- **Core**: Shared utilities and configurations

### Scalability
- Easy to add new features without touching existing code
- Modular architecture supports team collaboration
- Clear dependencies and interfaces

### Maintainability
- Each file has a single responsibility
- Services can be easily unit tested
- Configuration is centralized and environment-based

### Error Handling
- Custom exception classes
- Centralized error handling
- Proper HTTP status codes

## 🔍 Development

### Adding New Features

1. **Add new models** in `app/models/`
2. **Create services** in `app/services/`
3. **Define routes** in `app/routers/`
4. **Update dependencies** in `app/dependencies.py`

### Testing

The project includes a simple test script (`test_api.py`) that verifies all endpoints work correctly.

For more comprehensive testing, consider adding:
- Unit tests for services
- Integration tests for API endpoints
- Load testing for performance

## 🚀 Deployment

The backend is ready for deployment with:
- Production-ready FastAPI application
- Proper logging configuration
- Environment-based configuration
- CORS middleware for frontend integration

## 📝 API Usage Examples

### Send a Chat Message
```bash
curl -X POST "http://localhost:8000/api/v1/chat/" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, how are you?",
    "model": "llama2"
  }'
```

### Check Health
```bash
curl "http://localhost:8000/api/v1/health/"
```

### Get Available Models
```bash
curl "http://localhost:8000/api/v1/models/"
```
