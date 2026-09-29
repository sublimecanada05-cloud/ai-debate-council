# Architecture Overview - Mobile + Web Hybrid

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACES                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────┐              ┌─────────────────────────────┐  │
│  │  WEB (React)         │              │  MOBILE (React Native)      │  │
│  │  ┌────────────────┐  │              │  ┌───────────────────────┐  │  │
│  │  │ Dashboard      │  │              │  │ Debate Viewer (iOS)   │  │  │
│  │  │ - Create       │  │              │  │ - Create              │  │  │
│  │  │ - Watch Live   │  │              │  │ - Watch Live          │  │  │
│  │  │ - View History │  │              │  │ - Push Notifications  │  │  │
│  │  │ - Settings     │  │              │  │ - Offline Mode        │  │  │
│  │  │ - Analytics    │  │              │  └───────────────────────┘  │  │
│  │  └────────────────┘  │              │                              │  │
│  │  Deployed on Vercel  │              │  ┌───────────────────────┐  │  │
│  │  (Free tier)         │              │  │ Same (Android)        │  │  │
│  │  https://app...      │              │  │ via Play Store Beta   │  │  │
│  └──────────────────────┘              │  └───────────────────────┘  │  │
│                                        │  Deployed via EAS           │  │
│                                        │  (Expo free tier)           │  │
│                                        └─────────────────────────────┘  │
│                 │                                  │                    │
│                 └──────────────────┬───────────────┘                    │
│                                    │                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                    REST API + WebSocket (https://api...)
                                     │
┌─────────────────────────────────────────────────────────────────────────┐
│                          BACKEND (Node.js/Express)                      │
├─────────────────────────────────────────────────────────────────────────┤
│  Deployed on Render (Free tier) - 750 hours/month = Full month uptime   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Express.js API Server                                            │  │
│  │                                                                   │  │
│  │  Routes:                                                          │  │
│  │  ├─ POST   /api/debates/start          (Create new debate)      │  │
│  │  ├─ GET    /api/debates/:id            (Get debate details)     │  │
│  │  ├─ GET    /api/debates/:id/stream     (WebSocket)              │  │
│  │  ├─ GET    /api/decisions/:debateId    (Get recommendation)     │  │
│  │  ├─ GET    /api/context                (News + market data)     │  │
│  │  ├─ POST   /api/auth/register          (User signup)            │  │
│  │  └─ GET    /api/health                 (Health check)           │  │
│  │                                                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐   │
│  │ Debate Engine    │  │ Context Builder  │  │ WebSocket Handler  │   │
│  │                  │  │                  │  │                    │   │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐    │   │
│  │ │1. Load AIs   │ │  │ │Fetch News    │ │  │ │Debate events│    │   │
│  │ │2. Build      │ │  │ │Fetch Markets │ │  │ │Real-time    │    │   │
│  │ │   context    │ │  │ │Get Time/Date │ │  │ │updates      │    │   │
│  │ │3. Queue      │ │  │ │Build prompt  │ │  │ └──────────────┘    │   │
│  │ │   rounds     │ │  │ └──────────────┘ │  │                    │   │
│  │ │4. Collect    │ │  │                  │  │ Emit to clients:   │   │
│  │ │   responses  │ │  │ Integrated with  │  │ - round_started    │   │
│  │ │5. Moderate   │ │  │ debate engine    │  │ - response_received│   │
│  │ │6. Conclude   │ │  │ (real-time)      │  │ - debate_concluded │   │
│  │ │7. Recommend  │ │  │                  │  │ - recommendation   │   │
│  │ └──────────────┘ │  │                  │  │                    │   │
│  └──────────────────┘  └──────────────────┘  └────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ AI Agent Factory (Pluggable)                                    │   │
│  │                                                                  │   │
│  │  ┌──────────┬──────────┬──────────┬──────────┬──────────┬────────┐ │
│  │  │ ChatGPT  │ Claude   │ Gemini   │ Grok     │Perplexity│ LLaMA  │ │
│  │  │(OpenAI) │(Anthropic)│(Google) │(xAI)    │(API)     │(Meta)  │ │
│  │  │          │          │          │          │          │        │ │
│  │  │GPT-4o   │Claude3  │Gemini 2.0│Grok-3   │Pro-API   │70B/405B│ │
│  │  │(innovator)│(analyst)│(researcher)│(disruptor)│(real-time)│(budget)│ │
│  │  └──────────┴──────────┴──────────┴──────────┴──────────┴────────┘ │
│  │                                                                      │
│  │  Selection Strategy:                                                │
│  │  - Start with: Gemini (free) + free trial credits                  │
│  │  - Swap: Can change providers per debate via API                   │
│  │  - Cost mode: cheap/balanced/premium                                │
│  │                                                                      │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└──────────────────────────────┬───────────────────────────────────────────┘
                              │
                External Data Sources (Free Tier)
                              │
    ┌─────────────────────────┼─────────────────────────┐
    │                         │                         │
┌───▼─────┐             ┌────▼────┐            ┌──────▼──────┐
│ News    │             │ Market   │            │ AI APIs     │
│          │             │ Data     │            │             │
│ NewsAPI │             │ Alpha    │            │ Gemini      │
│ (100/day)│             │ Vantage  │            │ (free)      │
│          │             │          │            │             │
│ Guardian │             │ CoinGecko│            │ Grok        │
│ (free)   │             │ (free)   │            │ (free)      │
│          │             │          │            │             │
│ Bing News│             │ Finnhub  │            │ OpenAI      │
│ (free)   │             │ (60/min) │            │ ($5 credit) │
│          │             │          │            │             │
│ Cached   │             │ Yahoo FI │            │ Anthropic   │
│ 1 hour   │             │ (free)   │            │ ($5 credit) │
└──────────┘             └──────────┘            └─────────────┘
```

## Data Flow

### 1. Create Debate

```
User Input (Web/Mobile)
    ↓
POST /api/debates/start
    ↓
Context Builder
  ├─ Fetch latest news (NewsAPI + Guardian)
  ├─ Fetch market prices (Alpha Vantage + CoinGecko)
  ├─ Get current date/time/timezone
  └─ Build comprehensive context document
    ↓
Debate Engine
  ├─ Load 4 AI agents (from factory)
  ├─ Queue debate rounds
  └─ Start round 1
    ↓
WebSocket broadcasts
  "debate_started" → Web + Mobile UI updates
```

### 2. Debate Round

```
Debate Engine
    ↓
Round N: For each AI agent
    ├─ Agent 1 (ChatGPT)
    │  └─ Generates response → send via WebSocket
    ├─ Agent 2 (Claude)
    │  └─ Reads other responses → generates response
    ├─ Agent 3 (Gemini)
    │  └─ Incorporates market context → response
    └─ Agent 4 (Grok)
       └─ Challenges assumptions → response
    ↓
Moderator
  ├─ Analyzes all 4 responses
  ├─ Detects consensus
  ├─ Flags disagreements
  └─ Determines if consensus reached (75%+ agreement)
    ↓
If consensus reached:
  → Go to Conclusion
Else if < max rounds:
  → Start Round N+1
Else:
  → Force conclusion
```

### 3. Generate Decision

```
Moderator output
    ↓
Recommendation Engine
  ├─ Synthesize AI arguments
  ├─ Extract key points (pros/cons)
  ├─ Calculate confidence score
  ├─ Define 30/90-day action plan
  ├─ Identify top risks
  └─ Generate next debate trigger
    ↓
Final Decision
{
  "recommendation": "Start focused SaaS business",
  "confidence": "78%",
  "reasoning": {...},
  "action_plan": [...],
  "risks": [...],
  "timeline": "Start within 30 days"
}
    ↓
Save to database + WebSocket "debate_concluded"
```

### 4. Notifications

```
Debate Concluded
    ↓
├─ Send Email (SendGrid) - user gets summary
├─ Send Push (Firebase) - "Your debate is ready!"
├─ Trigger Webhook (if configured)
└─ Update UI (WebSocket + Redux)
```

## Technology Stack (All Free)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas (free 512MB)
- **Cache**: Redis Cloud (free 30MB)
- **Real-time**: Socket.io (WebSocket)
- **Queue**: Bull (in-memory for MVP)
- **API Docs**: Swagger/OpenAPI

### Frontend (Web)
- **Framework**: React 18
- **Build Tool**: Vite
- **State**: Redux Toolkit
- **UI**: Tailwind CSS (free)
- **HTTP**: Axios + React Query
- **WebSocket**: Socket.io client
- **Charts**: Chart.js (free)
- **Hosting**: Vercel (free)

### Mobile (React Native)
- **Framework**: React Native + Expo
- **Navigation**: Expo Router (file-based)
- **State**: Redux Toolkit (shared)
- **API**: Same axios client (shared)
- **UI**: NativeWind (Tailwind for RN)
- **Push**: Expo Notifications (free)
- **Storage**: AsyncStorage (free)
- **Publishing**: EAS Build (free tier)
- **App Stores**: TestFlight + Google Play Beta

### DevOps
- **Backend Hosting**: Render (free 750 hrs/month)
- **Frontend Hosting**: Vercel (free)
- **Mobile Hosting**: EAS/Expo (free)
- **Version Control**: GitHub (free)
- **CI/CD**: GitHub Actions (free)
- **Database**: MongoDB Atlas (free 512MB)
- **Cache**: Redis Cloud (free 30MB)

### Monitoring (Free)
- **Logs**: Cloud console
- **Errors**: Sentry (free tier)
- **Performance**: Custom metrics
- **Health**: Render health checks

## Database Schema (MongoDB)

```typescript
// Debates
interface Debate {
  _id: ObjectId
  user_id: string
  topic: string
  context: string
  ai_providers: string[]  // ['chatgpt', 'claude', 'gemini', 'grok']
  status: 'creating' | 'in_progress' | 'concluded'
  rounds: Round[]
  consensus_score: number  // 0-1
  created_at: Date
  updated_at: Date
  cost_breakdown: { [provider: string]: number }
}

// Decisions
interface Decision {
  _id: ObjectId
  debate_id: ObjectId
  recommendation: string
  confidence: number  // 0-1
  reasoning: {
    pros: string[]
    cons: string[]
    opportunities: string[]
    risks: string[]
  }
  action_plan: ActionItem[]
  timeline: string
  next_debate_trigger: string
  created_at: Date
}
```

## Cost for Free MVP

| Component | Cost | Limit |
|-----------|------|-------|
| **Render Backend** | $0 | 750 hrs/month |
| **Vercel Frontend** | $0 | Unlimited |
| **MongoDB Atlas** | $0 | 512MB |
| **Redis Cloud** | $0 | 30MB |
| **Gemini API** | $0 | 60 req/min |
| **Grok API** | $0 | Early access |
| **NewsAPI** | $0 | 100 req/day |
| **CoinGecko** | $0 | Unlimited |
| **SendGrid** | $0 | 100 emails/day |
| **Firebase** | $0 | 100 notifs/day |
| **Expo** | $0 | Unlimited builds |
| **GitHub** | $0 | Public/private repos |
| **Total** | **$0** | **Everything free!** |

**Supports**: 50-100 concurrent users, 10-50 debates/day

When you need to upgrade (months 4-6):
- Add paid OpenAI/Anthropic credits: $10-20/month
- Upgrade MongoDB: $57/month
- Upgrade Render: $20/month
- **Total: ~$100/month**

