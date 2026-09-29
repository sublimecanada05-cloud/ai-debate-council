# Project Structure - Mobile + Web Hybrid

```
ai-debate-council/
│
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── agents/                   # AI agent implementations
│   │   │   ├── base-agent.ts
│   │   │   ├── chatgpt.ts
│   │   │   ├── claude.ts
│   │   │   ├── gemini.ts
│   │   │   ├── grok.ts
│   │   │   ├── perplexity.ts
│   │   │   ├── llama.ts
│   │   │   └── agent-factory.ts
│   │   │
│   │   ├── debate/                   # Core debate logic
│   │   │   ├── debate-engine.ts      # Orchestrates debate rounds
│   │   │   ├── debate.model.ts       # Debate data model
│   │   │   ├── moderator.ts          # Debate moderator
│   │   │   ├── consensus.ts          # Consensus detection
│   │   │   └── recommendation.ts     # Generate recommendations
│   │   │
│   │   ├── integrations/              # External APIs
│   │   │   ├── news/
│   │   │   │   ├── newsapi.ts
│   │   │   │   ├── guardian.ts
│   │   │   │   └── news-aggregator.ts
│   │   │   ├── market-data/
│   │   │   │   ├── alpha-vantage.ts
│   │   │   │   ├── coingecko.ts
│   │   │   │   ├── finnhub.ts
│   │   │   │   └── market-aggregator.ts
│   │   │   ├── context-builder.ts    # Builds debate context
│   │   │   └── cache-service.ts      # Caching layer
│   │   │
│   │   ├── notifications/             # Alert system
│   │   │   ├── notification.model.ts
│   │   │   ├── email.service.ts      # SendGrid
│   │   │   ├── push.service.ts       # Firebase
│   │   │   ├── webhook.service.ts    # Custom webhooks
│   │   │   └── notification-queue.ts
│   │   │
│   │   ├── routes/                    # API endpoints
│   │   │   ├── auth.routes.ts
│   │   │   ├── debates.routes.ts
│   │   │   ├── decisions.routes.ts
│   │   │   ├── agents.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   └── admin.routes.ts
│   │   │
│   │   ├── models/                    # MongoDB schemas
│   │   │   ├── debate.schema.ts
│   │   │   ├── user.schema.ts
│   │   │   ├── decision.schema.ts
│   │   │   └── notification.schema.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── error-handler.ts
│   │   │   ├── request-logger.ts
│   │   │   └── rate-limiter.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── cost-tracker.ts
│   │   │   ├── logger.ts
│   │   │   ├── token-counter.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── websocket/
│   │   │   ├── debate.gateway.ts     # WebSocket events
│   │   │   └── handlers/
│   │   │
│   │   ├── app.ts                     # Express app setup
│   │   └── server.ts                  # Server entry point
│   │
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── ai-providers.ts
│   │   ├── debate.config.ts
│   │   └── environment.ts
│   │
│   ├── tests/
│   │   ├── agents/
│   │   ├── debate/
│   │   └── integration/
│   │
│   ├── .env.example
│   ├── .env.production
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                         # React Web App
│   ├── src/
│   │   ├── components/
│   │   │   ├── Debate/
│   │   │   │   ├── DebateViewer.tsx
│   │   │   │   ├── AIPersonality.tsx
│   │   │   │   ├── DebateRound.tsx
│   │   │   │   └── styles/
│   │   │   ├── Decision/
│   │   │   │   ├── DecisionPanel.tsx
│   │   │   │   ├── RecommendationCard.tsx
│   │   │   │   ├── ConfidenceScore.tsx
│   │   │   │   └── ActionPlan.tsx
│   │   │   ├── Input/
│   │   │   │   ├── InputForm.tsx
│   │   │   │   ├── AISelector.tsx
│   │   │   │   └── ContextBuilder.tsx
│   │   │   ├── Common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── Toast.tsx
│   │   │   └── Market/
│   │   │       ├── MarketOverview.tsx
│   │   │       ├── NewsPanel.tsx
│   │   │       └── PriceChart.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx         # Main page
│   │   │   ├── History.tsx           # Past debates
│   │   │   ├── Settings.tsx          # User settings
│   │   │   ├── Profile.tsx
│   │   │   └── Help.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts                # API client
│   │   │   ├── websocket.ts          # WebSocket client
│   │   │   ├── auth.ts               # Auth service
│   │   │   ├── storage.ts            # Local storage
│   │   │   └── analytics.ts
│   │   │
│   │   ├── store/                    # Redux
│   │   │   ├── slices/
│   │   │   │   ├── debates.slice.ts
│   │   │   │   ├── user.slice.ts
│   │   │   │   ├── settings.slice.ts
│   │   │   │   └── notifications.slice.ts
│   │   │   ├── thunks/
│   │   │   │   ├── debates.thunks.ts
│   │   │   │   └── decisions.thunks.ts
│   │   │   └── store.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebate.ts
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useNotification.ts
│   │   │   └── useDarkMode.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── tailwind.config.ts
│   │   │   ├── globals.css
│   │   │   └── themes/
│   │   │
│   │   ├── App.tsx                   # Root component
│   │   ├── main.tsx                  # Entry point
│   │   └── vite-env.d.ts
│   │
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   │
│   ├── .env.example
│   ├── .env.production
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── mobile/                           # React Native + Expo
│   ├── app/
│   │   ├── (tabs)/                   # Tab navigation
│   │   │   ├── home.tsx
│   │   │   ├── history.tsx
│   │   │   ├── settings.tsx
│   │   │   └── _layout.tsx
│   │   │
│   │   ├── (screens)/                # Modal screens
│   │   │   ├── debate-detail.tsx
│   │   │   ├── create-debate.tsx
│   │   │   ├── new-debate.tsx
│   │   │   └── _layout.tsx
│   │   │
│   │   └── _layout.tsx               # Root navigation
│   │
│   ├── components/
│   │   ├── Debate/
│   │   │   ├── DebateCard.tsx
│   │   │   ├── DebateViewer.tsx
│   │   │   ├── AIAgentBubble.tsx
│   │   │   └── RoundIndicator.tsx
│   │   ├── Decision/
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── ActionPlanList.tsx
│   │   │   └── ConfidenceGauge.tsx
│   │   ├── Input/
│   │   │   ├── TopicInput.tsx
│   │   │   ├── ContextInput.tsx
│   │   │   └── AISelector.tsx
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   ├── SafeArea.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── Market/
│   │       ├── MarketCard.tsx
│   │       ├── NewsCard.tsx
│   │       └── PriceWidget.tsx
│   │
│   ├── services/
│   │   ├── api.ts                    # API client
│   │   ├── websocket.ts              # WebSocket
│   │   ├── auth.ts                   # Auth
│   │   ├── storage.ts                # AsyncStorage
│   │   └── notifications.ts          # Push notifications
│   │
│   ├── store/
│   │   ├── slices/
│   │   ├── thunks/
│   │   └── store.ts
│   │
│   ├── hooks/
│   │   ├── useDebate.ts
│   │   ├── useWebSocket.ts
│   │   ├── usePushNotifications.ts
│   │   └── useAppState.ts
│   │
│   ├── utils/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── helpers.ts
│   │
│   ├── app.json                      # Expo config
│   ├── .env.example
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── MOBILE.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── FAQ.md
│
├── .github/
│   ├── workflows/
│   │   ├── backend-tests.yml
│   │   ├── frontend-tests.yml
│   │   ├── deploy-backend.yml
│   │   ├── deploy-frontend.yml
│   │   └── deploy-mobile.yml
│   └── ISSUE_TEMPLATE/
│
├── docker-compose.yml                # Local dev
├── .gitignore
├── .env.example
├── LICENSE
├── README.md
└── SETUP.md
```

## Key Files Explained

### Backend
- **agents/** - Each AI provider as a pluggable agent
- **debate/** - Core debate orchestration logic
- **integrations/** - News, market data, context building
- **routes/** - REST API endpoints
- **websocket/** - Real-time debate updates
- **models/** - MongoDB schemas

### Frontend
- **components/** - Reusable React components
- **pages/** - Page-level components (dashboard, history)
- **store/** - Redux state management
- **services/** - API, WebSocket, auth services
- **hooks/** - Custom React hooks

### Mobile
- **app/** - Expo Router navigation structure
- **components/** - React Native components
- **services/** - Same as frontend (API, auth, etc.)
- **store/** - Same Redux store (shared logic)
- **hooks/** - Mobile-specific hooks

## Shared Code

Web and mobile share:
- **Redux store logic** (debates, decisions, settings)
- **API service** (same backend)
- **Types/interfaces**
- **Utilities** (helpers, formatters)
- **WebSocket client logic**

Differences:
- **UI components** (React vs React Native)
- **Navigation** (React Router vs Expo Router)
- **Storage** (localStorage vs AsyncStorage)
- **Notifications** (Browser vs Firebase)
