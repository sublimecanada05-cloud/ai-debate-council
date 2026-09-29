# Setup Guide - AI Debate Council

## Prerequisites

- Node.js 18 or higher
- Docker & Docker Compose
- Git
- Code editor (VS Code recommended)

## Step 1: Get API Keys

You'll need accounts and API keys from:

### AI Providers (Required)

1. **OpenAI (ChatGPT)**
   - Go to https://platform.openai.com/account/api-keys
   - Create a new API key
   - Copy to `.env` as `OPENAI_API_KEY`

2. **Anthropic (Claude)**
   - Go to https://console.anthropic.com/account/keys
   - Create a new API key
   - Copy to `.env` as `ANTHROPIC_API_KEY`

3. **Google Generative AI (Gemini)**
   - Go to https://ai.google.dev/
   - Click "Get API Key"
   - Copy to `.env` as `GOOGLE_GENERATIVE_AI_KEY`

4. **xAI (Grok)**
   - Go to https://grok.x.ai
   - Register and get API key
   - Copy to `.env` as `XAI_API_KEY`

### Data Sources (Required)

5. **NewsAPI**
   - Go to https://newsapi.org
   - Sign up and get API key
   - Copy to `.env` as `NEWSAPI_KEY`

6. **Alpha Vantage** (Stock Market Data)
   - Go to https://www.alphavantage.co
   - Get free API key
   - Copy to `.env` as `ALPHA_VANTAGE_API_KEY`

### Notifications (Optional)

7. **SendGrid** (Email notifications)
   - Go to https://sendgrid.com
   - Create account and get API key
   - Copy to `.env` as `SENDGRID_API_KEY`

8. **Twilio** (SMS notifications)
   - Go to https://www.twilio.com
   - Create account and get credentials
   - Copy to `.env`

## Step 2: Clone the Repository

```bash
git clone https://github.com/sublimecanada05-cloud/ai-debate-council.git
cd ai-debate-council
```

## Step 3: Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your actual API keys
nano .env  # or use your preferred editor
```

## Step 4: Start with Docker Compose

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

This starts:
- Backend API (Node.js) on port 5000
- Frontend (React) on port 3000
- MongoDB on port 27017
- Redis on port 6379

## Step 5: Verify Installation

### Backend API
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status": "ok", "timestamp": "2026-09-29T..."}
```

### Frontend
```bash
Open http://localhost:3000 in your browser
```

### API Documentation
```bash
Open http://localhost:5000/api/docs in your browser
```

## Step 6: Create Your First Debate

### Via Web UI
1. Go to http://localhost:3000
2. Click "New Debate"
3. Enter your question: "Should I start a software business?"
4. Add context: "First-time entrepreneur, moderate risk"
5. Click "Start Debate"
6. Watch the 4 AIs debate in real-time

### Via API

```bash
curl -X POST http://localhost:5000/api/debates/start \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Should I start a software business?",
    "context": "First-time entrepreneur, moderate risk tolerance",
    "deadline": "24h"
  }'
```

## Troubleshooting

### Services won't start
```bash
# Check Docker is running
docker ps

# Rebuild containers
docker-compose build --no-cache
docker-compose up
```

### API key errors
- Verify keys are correct and have not expired
- Check rate limits on your API accounts
- Ensure environment variables are loaded: `echo $OPENAI_API_KEY`

### Database connection errors
```bash
# Check MongoDB is running
docker-compose logs mongodb

# Restart database
docker-compose restart mongodb
```

### Port already in use
```bash
# Change ports in docker-compose.yml
# Or kill the process using the port
lsof -i :5000
kill -9 <PID>
```

## Development

### Install dependencies locally (optional)

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Run in development mode

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start

# Terminal 3: MongoDB & Redis (or use docker-compose)
docker-compose up mongodb redis
```

### Run tests

```bash
cd backend
npm test

cd ../frontend
npm test
```

## Configuration Options

### Debate Settings

Edit `backend/config/debate.config.ts`:

```typescript
export const debateConfig = {
  // Timeout per AI agent response (ms)
  roundTimeout: 120_000,
  
  // Maximum debate rounds
  maxRounds: 5,
  
  // Consensus threshold (0-1)
  consensusThreshold: 0.75,
  
  // Auto-conclude debate after timeout
  autoConcludes: true,
  autoConcludeTimeout: 3_600_000, // 1 hour
  
  // Enable async debates
  enableAsync: true
}
```

### AI Model Versions

Edit `.env`:

```bash
# Use latest models
CHATGPT_MODEL=gpt-4o
CLAUDE_MODEL=claude-3-opus-20250219
GEMINI_MODEL=gemini-2.0-flash
GROK_MODEL=grok-3

# Or use cheaper/faster versions
CHATGPT_MODEL=gpt-4-turbo
CLAUDE_MODEL=claude-3-sonnet-20240229
GEMINI_MODEL=gemini-1.5-flash
```

## Next Steps

1. **Read the documentation**: [README.md](./README.md)
2. **Explore the API**: http://localhost:5000/api/docs
3. **Create your first debate**: Try it with the web UI
4. **Customize AI personalities**: Edit `backend/src/agents/`
5. **Add more news sources**: Edit `backend/src/integrations/news/`
6. **Deploy to production**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Docker logs: `docker-compose logs`
3. Check GitHub Issues: https://github.com/sublimecanada05-cloud/ai-debate-council/issues
4. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Your `.env` configuration (sanitized)
   - Docker version and OS
