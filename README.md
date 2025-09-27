# 🤖 Multimodal AI Chat Application

A full-stack application that integrates with local open-source AI models using Ollama. This project provides a modern chat interface for interacting with various AI models running locally on your machine.

![Python](https://img.shields.io/badge/python-v3.8+-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.117.1-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- **Local AI Integration**: Uses Ollama to run open-source models locally
- **Multiple Model Support**: Supports Llama 2, Mistral, CodeLlama, LLaVA, and more
- **Modern UI**: Built with Next.js 15 and React 19
- **Real-time Chat**: Interactive chat interface with message history
- **Health Monitoring**: Real-time backend connection status
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Full TypeScript support
- **Professional Backend**: Well-structured FastAPI backend with proper architecture

## 🏗️ Architecture

```
├── backend/                 # FastAPI backend
│   ├── app/                # Main application code
│   │   ├── models/         # Pydantic models
│   │   ├── services/       # Business logic
│   │   ├── routers/        # API routes
│   │   ├── core/           # Core functionality
│   │   └── utils/          # Utility functions
│   ├── requirements.txt    # Python dependencies
│   └── run.py             # Application entry point
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   ├── lib/           # API client
│   │   └── types/         # TypeScript types
│   └── package.json       # Node.js dependencies
└── .github/workflows/     # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **Ollama** installed and running
- At least one AI model pulled in Ollama

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HanaaMohammedGad96/integrate-with-ai-open-source-model-locally.git
   cd integrate-with-ai-open-source-model-locally
   ```

2. **Install Ollama:**
   ```bash
   # Visit https://ollama.ai to download and install Ollama
   ollama pull llama2
   ollama pull mistral
   ```

3. **Start Ollama service:**
   ```bash
   ollama serve
   ```

4. **Setup Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python run.py
   ```

5. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📚 API Documentation

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Root with API information |
| `/api/v1/health/` | GET | Health check |
| `/api/v1/chat/` | POST | Send chat message |
| `/api/v1/models/` | GET | Get available models |

### Example API Usage

```bash
# Send a chat message
curl -X POST "http://localhost:8000/api/v1/chat/" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, how are you?",
    "model": "llama2"
  }'

# Check health
curl "http://localhost:8000/api/v1/health/"

# Get available models
curl "http://localhost:8000/api/v1/models/"
```

## 🛠️ Development

### Backend Development

The backend follows a clean architecture pattern:

- **Models**: Pydantic schemas for data validation
- **Services**: Business logic isolated from API routes
- **Routers**: API endpoints organized by functionality
- **Core**: Shared utilities and configurations

### Frontend Development

The frontend uses modern React patterns:

- **App Router**: Next.js 15 app directory structure
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Component Architecture**: Reusable React components

### Testing

```bash
# Test backend
cd backend
python test_api.py

# Test frontend
cd frontend
npm run build
npm test
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Application Settings
APP_NAME="Multimodal AI Chat API"
APP_VERSION="1.0.0"
DEBUG=false
LOG_LEVEL="INFO"

# Ollama Settings
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_TIMEOUT=60

# CORS Settings
ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
```

## 🚀 Deployment

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

1. **Backend**: Deploy to any Python hosting service (Railway, Render, etc.)
2. **Frontend**: Deploy to Vercel, Netlify, or similar
3. **Update API URLs** in frontend configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for all frontend code
- Write tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai) for local AI model management
- [FastAPI](https://fastapi.tiangolo.com) for the backend framework
- [Next.js](https://nextjs.org) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com) for styling

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/HanaaMohammedGad96/integrate-with-ai-open-source-model-locally/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🎯 Roadmap

- [ ] Add support for image generation models
- [ ] Implement conversation history persistence
- [ ] Add user authentication
- [ ] Support for multiple conversation threads
- [ ] Voice input/output capabilities
- [ ] Model fine-tuning interface
- [ ] Advanced model configuration options

---

**Made with ❤️ by [Hanaa Mohammed](https://github.com/HanaaMohammedGad96)**
