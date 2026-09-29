import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.REACT_APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mock data for demo
const debates: any[] = [];
const decisions: any[] = [];

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/debates/start', (req: Request, res: Response) => {
  const { topic, context, deadline } = req.body;
  const debateId = Math.random().toString(36).substr(2, 9);
  
  const debate = {
    id: debateId,
    topic,
    context,
    deadline: deadline || '24h',
    status: 'in_progress',
    rounds: [],
    created_at: new Date(),
    consensus_score: 0
  };
  
  debates.push(debate);
  
  // Simulate debate
  simulateDebate(debateId, topic, context);
  
  res.json({
    debateId,
    status: 'in_progress',
    ws_url: `ws://localhost:${process.env.PORT || 5000}`
  });
});

app.get('/api/debates/:id', (req: Request, res: Response) => {
  const debate = debates.find(d => d.id === req.params.id);
  res.json(debate || { error: 'Debate not found' });
});

app.get('/api/debates/:id/decision', (req: Request, res: Response) => {
  const decision = decisions.find(d => d.debateId === req.params.id);
  res.json(decision || { status: 'pending' });
});

app.get('/api/context', async (req: Request, res: Response) => {
  // Mock context with current data
  res.json({
    timestamp: new Date().toISOString(),
    news: [
      { title: 'AI Market Booming', source: 'TechNews', date: new Date() },
      { title: 'Startup Trends 2024', source: 'Forbes', date: new Date() }
    ],
    market_data: {
      tech_stocks: '+2.5%',
      crypto_sentiment: 'bullish',
      startup_funding: 'active'
    }
  });
});

// WebSocket
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Simulate debate
function simulateDebate(debateId: string, topic: string, context: string) {
  const debate = debates.find(d => d.id === debateId);
  if (!debate) return;
  
  const aiResponses = [
    { ai: 'ChatGPT (Innovator)', role: 'innovator', response: `Regarding "${topic}": This is an excellent opportunity to leverage current market trends. I see significant potential for growth and innovation here...` },
    { ai: 'Claude (Analyst)', role: 'analyst', response: `Let me provide a thorough analysis of this decision. There are several important factors to consider: market conditions, competitive landscape, and risk assessment...` },
    { ai: 'Gemini (Researcher)', role: 'researcher', response: `Based on current market data and recent news, I can see that the industry is experiencing significant growth. Today's data shows...` },
    { ai: 'Grok (Disruptor)', role: 'disruptor', response: `Hold on, let me challenge the assumptions here. What if the conventional wisdom is wrong? Consider this perspective instead...` }
  ];
  
  let roundCount = 0;
  const roundInterval = setInterval(() => {
    if (roundCount >= 3) {
      clearInterval(roundInterval);
      // Finalize debate
      debate.status = 'concluded';
      debate.consensus_score = 0.78;
      
      const decision = {
        debateId,
        recommendation: `Based on the debate about "${topic}", the consensus recommendation is to proceed with caution while leveraging current market opportunities.`,
        confidence: 0.78,
        reasoning: {
          pros: ['Market tailwinds', 'Strong fundamentals', 'Timing is right'],
          cons: ['Competition increasing', 'Regulatory uncertainty'],
          opportunities: ['First-mover advantage', 'Market expansion']
        },
        action_plan: [
          { day: 7, action: 'Validate market demand with 20 potential customers' },
          { day: 30, action: 'Build minimum viable product' },
          { day: 60, action: 'Launch beta program' }
        ],
        risks: ['Market saturation', 'Funding challenges', 'Team execution'],
        timeline: 'Start within 30 days',
        created_at: new Date()
      };
      
      decisions.push(decision);
      io.emit('debate_concluded', { debateId, decision });
      return;
    }
    
    const response = aiResponses[roundCount];
    debate.rounds.push(response);
    io.emit('debate_round', { debateId, round: roundCount + 1, response });
    roundCount++;
  }, 5000);
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 AI Debate Council Backend`);
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/docs`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`\n✅ Ready to accept debates...\n`);
});

export { app, io };
