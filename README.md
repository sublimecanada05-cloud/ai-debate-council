# AI Debate Council 🤖💬

A sophisticated multi-AI debate and decision-making platform featuring **ChatGPT, Claude, Gemini, and Grok** engaging in structured conversations to analyze complex decisions with real-time news, market data, and current context.

## 🎯 Features

✨ **Core Capabilities**
- **4 Premium AI Personalities** - ChatGPT (Innovator), Claude (Analyst), Gemini (Researcher), Grok (Disruptor)
- **Live News Integration** - Real-time global news for context-aware debates
- **Live Market Data** - Stock prices, crypto, economic indicators, market sentiment
- **Asynchronous Debate Engine** - AIs debate continuously, even when inactive
- **Smart Notifications** - Get alerted when decisions are ready
- **Real-time Context** - Current date/time, global events, market conditions
- **Pluggable Architecture** - Easy to add or swap AI providers

## 📋 Use Cases

- 🏢 **Business Decisions** - "Should I start a software business in 2026?"
- 📈 **Investment Analysis** - "Where should I invest? Tech vs. Real Estate vs. Crypto?"
- 🎯 **Career Pivots** - "Stay in corporate or go startup?"
- 💼 **Product Strategy** - "Launch product A or B? When?"
- 🌍 **Life Decisions** - Multi-perspective advice on major life changes

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│       User Input (Decision/Scenario)                    │
│  "I want to start a software business & invest in       │
│   live markets. What should I do?"                      │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│    Debate Orchestrator & Context Manager                │
│  ✓ Fetches live news (NewsAPI, Guardian)                │
│  ✓ Gets market data (Alpha Vantage, CoinGecko)          │
│  ✓ Tracks current date/time/timezone                    │
│  ✓ Builds comprehensive context document                │
└────────────────────┬────────────────────────────────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
  ┌──▼──────┐  ┌───▼────┐  ┌──────▼──┐  ┌────────┐
  │ ChatGPT │  │ Claude │  │ Gemini  │  │  Grok  │
  │Innovator│  │Analyst │  │Researcher  │Disruptor│
  └──┬──────┘  └───┬────┘  └──────┬──┘  └────┬───┘
     │             │              │          │
     └─────────────┼──────────────┼──────────┘
                   │              │
        ┌──────────▼──────────────▼──┐
        │   Debate Moderator         │
        │  ✓ Track all arguments     │
        │  ✓ Identify agreements     │
        │  ✓ Flag disagreements      │
        │  ✓ Synthesize conclusion   │
        │  ✓ Generate recommendation │
        └──────────┬─────────────────┘
                   │
        ┌──────────▼──────────────┐
        │  Notification Engine    │
        │  ✓ Email alerts         │
        │  ✓ Push notifications   │
        │  ✓ Dashboard updates    │
        │  ✓ Webhook triggers     │
        └────────────────────────┘
```

## 🤖 AI Personalities

### 1. ChatGPT (The Innovator) 🚀
- **Provider**: OpenAI (GPT-4o)
- **Perspective**: Opportunities, innovation, market disruption
- **Role**: Identifies emerging trends, new business models, growth potential
- **Debate Style**: Optimistic, creative, forward-thinking

### 2. Claude (The Analyst) 📊
- **Provider**: Anthropic (Claude 3 Opus)
- **Perspective**: Detailed analysis, risk assessment, ethical considerations
- **Role**: Deep dives into pros/cons, identifies second-order effects, explores edge cases
- **Debate Style**: Thorough, nuanced, evidence-based

### 3. Gemini (The Researcher) 🔍
- **Provider**: Google Gemini
- **Perspective**: Current events, real-time data, web context
- **Role**: Gathers latest news, market conditions, industry reports
- **Debate Style**: Data-driven, up-to-date, contextual

### 4. Grok (The Disruptor) ⚡
- **Provider**: xAI Grok
- **Perspective**: Unconventional thinking, devil's advocate, hidden risks
- **Role**: Challenges assumptions, spots what others miss, questions everything
- **Debate Style**: Edgy, contrarian, provocative

## 📊 Example Debate Flow

**User Input**: "I want to start a software business and invest in live markets. What should I do?"

**System Context** (gathered in real-time):
- Current date: 2026-09-29
- Market conditions: Tech stocks down 12%, AI sector up 45%
- News: New regulation affecting startups, AI boom continues
- User profile: First-time entrepreneur, moderate risk tolerance

**Debate Rounds**:
1. **Gemini** presents current market data and relevant news
2. **ChatGPT** proposes innovative business models (AI SaaS, no-code platform, etc.)
3. **Claude** analyzes risks: competition, funding timeline, expertise gaps
4. **Grok** plays devil's advocate: questions market timing, identifies hidden assumptions
5. **Moderator** synthesizes: identifies consensus, flags key disagreements
6. **Final Recommendation**: Actionable next steps with confidence level

**Output Example**:
```json
{
  "recommendation": "Launch a focused AI-powered SaaS product",
  "confidence": "78%",
  "reasoning": {
    "pros": ["Current market tailwinds", "Lower capital requirement", "Faster MVP"],
    "cons": ["High competition", "Requires technical expertise", "Funding harder"],
    "timing": "Start within 30 days while market momentum is high"
  },
  "action_plan_30_days": [
    "Validate problem with 20 potential customers",
    "Build MVP (4-6 weeks)",
    "Apply to Y Combinator/accelerators"
  ],
  "risks": ["Market saturation", "AI regulation changes", "Founder burnout"],
  "next_debate_trigger": "After talking to 20 customers"
}
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (debates, decisions, history)
- **Cache**: Redis (debate state, API responses)
- **Queue**: Bull (debate orchestration, background tasks)

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI / Tailwind CSS
- **Real-time**: WebSocket (Socket.io)
- **Charts**: Chart.js / D3.js (debate analytics)

### AI Providers
- **ChatGPT**: OpenAI API
- **Claude**: Anthropic API
- **Gemini**: Google Generative AI API
- **Grok**: xAI API

### Data Sources
- **News**: NewsAPI, Guardian API, Bing News
- **Markets**: Alpha Vantage, CoinGecko, Finnhub, Polygon
- **Economic Data**: World Bank API, Trading Economics

### Infrastructure
- **Deployment**: Docker + Docker Compose
- **Cloud**: AWS (Lambda, RDS), Railway, Render, or Vercel
- **Notifications**: Twilio, Firebase Cloud Messaging, SendGrid
- **Monitoring**: Sentry, LogRocket

## 📁 Project Structure

```
ai-debate-council/
├── backend/
│   ├── src/
│   │   ├── agents/              # AI agent implementations
│   │   │   ├── chatgpt.ts
│   │   │   ├── claude.ts
│   │   │   ├── gemini.ts
│   │   │   ├── grok.ts
│   │   │   └── base-agent.ts
│   │   ├── debate/              # Debate orchestration
│   │   │   ├── moderator.ts
│   │   │   ├── debate-engine.ts
│   │   │   └── debate.model.ts
│   │   ├── integrations/        # External API integrations
│   │   │   ├── news/
│   │   │   ├── market-data/
│   │   │   └── context-builder.ts
│   │   ├── notifications/       # Alert system
│   │   │   ├── email.ts
│   │   │   ├── webhook.ts
│   │   │   └── notification.model.ts
│   │   ├── routes/              # API endpoints
│   │   │   ├── debates.routes.ts
│   │   │   ├── decisions.routes.ts
│   │   │   └── agents.routes.ts
│   │   ├── models/              # Database models
│   │   ├── middleware/          # Auth, logging, etc.
│   │   └── app.ts              # Express app setup
│   ├── config/                 # Configuration files
│   ├── .env.example
│   ├── docker-compose.yml
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── DebateViewer.tsx
│   │   │   ├── DecisionPanel.tsx
│   │   │   ├── InputForm.tsx
│   │   │   └── AIPersonality.tsx
│   │   ├── pages/               # App pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── History.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/            # API client
│   │   ├── store/               # Redux store
│   │   └── App.tsx
│   ├── public/
│   ├── .env.example
│   └── package.json
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- API Keys:
  - OpenAI (ChatGPT)
  - Anthropic (Claude)
  - Google Generative AI (Gemini)
  - xAI (Grok)
  - NewsAPI
  - Alpha Vantage

### Setup

1. **Clone and install**
```bash
git clone https://github.com/sublimecanada05-cloud/ai-debate-council.git
cd ai-debate-council
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. **Start with Docker**
```bash
docker-compose up
```

4. **Access the app**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/docs

## 📚 API Endpoints

### Start a Debate
```
POST /api/debates/start
Body: {
  "topic": "Should I start a software business?",
  "context": "First-time entrepreneur, moderate risk tolerance",
  "deadline": "24h"
}
Response: {
  "debateId": "uuid",
  "status": "in_progress",
  "ws_url": "ws://localhost:5000/debates/uuid"
}
```

### Get Decision
```
GET /api/debates/:debateId/decision
Response: {
  "recommendation": "...",
  "confidence": "78%",
  "reasoning": {...},
  "action_plan": [...]
}
```

## 🔔 Notifications

Get notified when debates reach conclusions:
- Email notifications
- Webhook callbacks
- Dashboard push notifications
- SMS alerts (Twilio)

## 🛠️ Configuration

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📧 Support

Questions? Open an issue or email support@ai-debate-council.com
