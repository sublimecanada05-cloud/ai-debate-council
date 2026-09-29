# AI Provider Configuration - Swappable Architecture

This document explains how to configure and swap AI providers in the system.

## 📋 Supported AI Providers

### Current (6 Providers)
1. **ChatGPT** (OpenAI) - Innovator
2. **Claude** (Anthropic) - Analyst
3. **Gemini** (Google) - Researcher
4. **Grok** (xAI) - Disruptor
5. **Perplexity** - Real-time Research
6. **LLaMA** (Meta) - Open-source Alternative

---

## 🔧 Configuration

### Provider Selection in `.env`

```bash
# Debate Configuration
DEBATE_PERSONALITY_1=chatgpt    # Innovator
DEBATE_PERSONALITY_2=claude     # Analyst
DEBATE_PERSONALITY_3=gemini     # Researcher
DEBATE_PERSONALITY_4=grok       # Disruptor

# Additional/Fallback Personalities
DEBATE_PERSONALITY_5=perplexity # Optional
DEBATE_PERSONALITY_6=llama      # Optional (budget)

# Model Versions
CHATGPT_MODEL=gpt-4o
CLAUDE_MODEL=claude-3-opus-20250219
GEMINI_MODEL=gemini-2.0-flash
GROK_MODEL=grok-3
PERPLEXITY_MODEL=perplexity-pro
LLAMA_MODEL=llama-3.1-405b

# Or use cheaper versions
CHATGPT_MODEL=gpt-4-turbo      # 20% cheaper
CLAUDE_MODEL=claude-3-sonnet   # 80% cheaper
GEMINI_MODEL=gemini-1.5-flash  # Faster
GROK_MODEL=grok-3-standard     # Budget tier
LLAMA_MODEL=llama-3.1-70b      # Lighter weight
```

### Programmatic Configuration

```typescript
// backend/src/config/ai-providers.config.ts

export const aiProviderConfig = {
  debate: {
    personalities: [
      { id: 'personality1', provider: 'chatgpt', role: 'innovator' },
      { id: 'personality2', provider: 'claude', role: 'analyst' },
      { id: 'personality3', provider: 'gemini', role: 'researcher' },
      { id: 'personality4', provider: 'grok', role: 'disruptor' },
    ],
    // Add more on demand
    optional: [
      { id: 'personality5', provider: 'perplexity', role: 'researcher' },
      { id: 'personality6', provider: 'llama', role: 'pragmatist' },
    ]
  },

  // Cost optimization: use cheaper models by default
  costOptimized: true,
  fallbackOrder: ['gemini', 'llama', 'grok', 'chatgpt', 'claude', 'perplexity'],

  // Premium mode: use best models
  premiumMode: false,
  premiumOrder: ['claude', 'chatgpt', 'grok', 'gemini', 'perplexity', 'llama']
};
```

---

## 🔄 Swapping Providers at Runtime

### Via API Endpoint

```bash
# Start a debate with custom AI selection
curl -X POST http://localhost:5000/api/debates/start \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Should I start a software business?",
    "context": "First-time entrepreneur",
    "aiProviders": ["chatgpt", "claude", "gemini", "perplexity"],
    "models": {
      "chatgpt": "gpt-4o",
      "claude": "claude-3-sonnet",  # Use cheaper version
      "gemini": "gemini-2.0-flash",
      "perplexity": "free-tier"
    }
  }'
```

### Via Dashboard UI

```tsx
// frontend/src/components/DebateConfig.tsx

import React, { useState } from 'react';

const DebateConfig = () => {
  const [selectedAIs, setSelectedAIs] = useState(['chatgpt', 'claude', 'gemini', 'grok']);
  const [costMode, setCostMode] = useState('balanced'); // 'cheap', 'balanced', 'premium'

  const aiProviders = [
    { name: 'ChatGPT', id: 'chatgpt', costPerDebate: 0.16, role: 'Innovator' },
    { name: 'Claude', id: 'claude', costPerDebate: 0.64, role: 'Analyst' },
    { name: 'Gemini', id: 'gemini', costPerDebate: 0.003, role: 'Researcher' },
    { name: 'Grok', id: 'grok', costPerDebate: 0.10, role: 'Disruptor' },
    { name: 'Perplexity', id: 'perplexity', costPerDebate: 0.02, role: 'Researcher' },
    { name: 'LLaMA', id: 'llama', costPerDebate: 0.06, role: 'Pragmatist' },
  ];

  const toggleAI = (aiId) => {
    setSelectedAIs(prev => 
      prev.includes(aiId) 
        ? prev.filter(id => id !== aiId)
        : [...prev, aiId]
    );
  };

  const totalCost = selectedAIs.reduce((sum, aiId) => {
    const ai = aiProviders.find(p => p.id === aiId);
    return sum + (ai?.costPerDebate || 0);
  }, 0);

  return (
    <div className="config-panel">
      <h3>Select AI Personalities</h3>
      
      <div className="cost-modes">
        <button onClick={() => setCostMode('cheap')}>💰 Cheap</button>
        <button onClick={() => setCostMode('balanced')}>⚖️ Balanced</button>
        <button onClick={() => setCostMode('premium')}>⭐ Premium</button>
      </div>

      <div className="ai-grid">
        {aiProviders.map(ai => (
          <div key={ai.id} className="ai-card">
            <input
              type="checkbox"
              checked={selectedAIs.includes(ai.id)}
              onChange={() => toggleAI(ai.id)}
            />
            <label>
              {ai.name} - {ai.role}
              <br />
              <small>${ai.costPerDebate.toFixed(4)}/debate</small>
            </label>
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Selected: {selectedAIs.length} AIs</p>
        <p>Cost per debate: ${totalCost.toFixed(4)}</p>
        <p>Monthly (50 debates): ${(totalCost * 50).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DebateConfig;
```

---

## 🧠 Agent Implementation Template

### Base Agent Interface

```typescript
// backend/src/agents/base-agent.ts

import { IDebateAgent, DebateRole, AIResponse } from '../types';

export abstract class BaseAgent implements IDebateAgent {
  protected provider: string;
  protected model: string;
  protected role: DebateRole;
  protected apiKey: string;

  constructor(provider: string, model: string, role: DebateRole, apiKey: string) {
    this.provider = provider;
    this.model = model;
    this.role = role;
    this.apiKey = apiKey;
  }

  abstract initialize(): Promise<void>;
  abstract generateResponse(prompt: string, context: string): Promise<AIResponse>;
  abstract validateConnection(): Promise<boolean>;

  getRole(): DebateRole {
    return this.role;
  }

  getProvider(): string {
    return this.provider;
  }
}
```

### ChatGPT Agent Implementation

```typescript
// backend/src/agents/chatgpt.ts

import { OpenAI } from 'openai';
import { BaseAgent } from './base-agent';
import { AIResponse, DebateRole } from '../types';

export class ChatGPTAgent extends BaseAgent {
  private client: OpenAI;

  constructor(model = 'gpt-4o') {
    super('chatgpt', model, 'innovator', process.env.OPENAI_API_KEY!);
  }

  async initialize(): Promise<void> {
    this.client = new OpenAI({ apiKey: this.apiKey });
  }

  async generateResponse(prompt: string, context: string): Promise<AIResponse> {
    const systemPrompt = this.getSystemPrompt();

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${context}\n\n${prompt}` }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return {
      provider: 'chatgpt',
      role: this.role,
      content: response.choices[0].message.content || '',
      tokens: response.usage?.total_tokens || 0,
      timestamp: new Date()
    };
  }

  async validateConnection(): Promise<boolean> {
    try {
      const response = await this.client.models.retrieve('gpt-4o');
      return !!response.id;
    } catch {
      return false;
    }
  }

  private getSystemPrompt(): string {
    return `You are an Innovator in a debate council. Your role is to:
    - Identify opportunities and growth potential
    - Propose creative solutions
    - Think about market disruption and new models
    - Challenge assumptions constructively
    - Be optimistic but evidence-based
    
    Provide structured responses with:
    1. Key opportunities
    2. Growth potential
    3. Innovative approach
    4. Risk mitigation
    5. 90-day action plan`;
  }
}
```

### Claude Agent Implementation

```typescript
// backend/src/agents/claude.ts

import Anthropic from '@anthropic-ai/sdk';
import { BaseAgent } from './base-agent';
import { AIResponse, DebateRole } from '../types';

export class ClaudeAgent extends BaseAgent {
  private client: Anthropic;

  constructor(model = 'claude-3-opus-20250219') {
    super('claude', model, 'analyst', process.env.ANTHROPIC_API_KEY!);
  }

  async initialize(): Promise<void> {
    this.client = new Anthropic({ apiKey: this.apiKey });
  }

  async generateResponse(prompt: string, context: string): Promise<AIResponse> {
    const systemPrompt = this.getSystemPrompt();

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `${context}\n\n${prompt}`
        }
      ]
    });

    return {
      provider: 'claude',
      role: this.role,
      content: response.content[0].type === 'text' ? response.content[0].text : '',
      tokens: response.usage.input_tokens + response.usage.output_tokens,
      timestamp: new Date()
    };
  }

  async validateConnection(): Promise<boolean> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 10,
        messages: [{ role: 'user', content: 'ping' }]
      });
      return !!response.id;
    } catch {
      return false;
    }
  }

  private getSystemPrompt(): string {
    return `You are an Analyst in a debate council. Your role is to:
    - Provide deep, thorough analysis
    - Assess pros and cons systematically
    - Identify second-order effects
    - Consider edge cases and risks
    - Be evidence-based and nuanced
    - Explore ethical implications
    
    Provide structured responses with:
    1. Pros and cons analysis
    2. Risk assessment
    3. Hidden implications
    4. Success/failure factors
    5. Critical questions to consider`;
  }
}
```

### Gemini Agent Implementation

```typescript
// backend/src/agents/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseAgent } from './base-agent';
import { AIResponse, DebateRole } from '../types';

export class GeminiAgent extends BaseAgent {
  private client: GoogleGenerativeAI;
  private model: any;

  constructor(modelName = 'gemini-2.0-flash') {
    super('gemini', modelName, 'researcher', process.env.GOOGLE_GENERATIVE_AI_KEY!);
  }

  async initialize(): Promise<void> {
    this.client = new GoogleGenerativeAI(this.apiKey);
    this.model = this.client.getGenerativeModel({ model: this.model });
  }

  async generateResponse(prompt: string, context: string): Promise<AIResponse> {
    const systemPrompt = this.getSystemPrompt();

    const result = await this.model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\n${context}\n\n${prompt}`
            }
          ]
        }
      ]
    });

    const text = result.response.text();

    return {
      provider: 'gemini',
      role: this.role,
      content: text,
      tokens: result.response.usageMetadata?.totalTokenCount || 0,
      timestamp: new Date()
    };
  }

  async validateConnection(): Promise<boolean> {
    try {
      const result = await this.model.generateContent('ping');
      return !!result.response.text();
    } catch {
      return false;
    }
  }

  private getSystemPrompt(): string {
    return `You are a Researcher in a debate council. Your role is to:
    - Gather and synthesize current information
    - Reference latest news, trends, and data
    - Provide market context and industry insights
    - Identify relevant precedents and case studies
    - Present balanced, data-driven perspectives
    
    Provide structured responses with:
    1. Current market landscape
    2. Recent trends and catalysts
    3. Competitive analysis
    4. Data-driven insights
    5. Relevant case studies`;
  }
}
```

### LLaMA Agent Implementation (Budget)

```typescript
// backend/src/agents/llama.ts

import axios from 'axios';
import { BaseAgent } from './base-agent';
import { AIResponse, DebateRole } from '../types';

export class LLaMAAgent extends BaseAgent {
  private endpoint: string = process.env.LLAMA_ENDPOINT || 'https://api.together.ai/inference';

  constructor(model = 'meta-llama/Llama-3.1-70b-instruct-turbo') {
    super('llama', model, 'pragmatist', process.env.LLAMA_API_KEY!);
  }

  async initialize(): Promise<void> {
    // LLaMA via Together.ai, Replicate, or local
  }

  async generateResponse(prompt: string, context: string): Promise<AIResponse> {
    const systemPrompt = this.getSystemPrompt();

    try {
      const response = await axios.post(
        this.endpoint,
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `${context}\n\n${prompt}` }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: { 'Authorization': `Bearer ${this.apiKey}` }
        }
      );

      return {
        provider: 'llama',
        role: this.role,
        content: response.data.choices[0].message.content,
        tokens: response.data.usage?.total_tokens || 0,
        timestamp: new Date()
      };
    } catch (error) {
      throw new Error(`LLaMA API error: ${error}`);
    }
  }

  async validateConnection(): Promise<boolean> {
    try {
      const response = await axios.post(
        this.endpoint,
        {
          model: this.model,
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 10
        },
        {
          headers: { 'Authorization': `Bearer ${this.apiKey}` }
        }
      );
      return !!response.data.choices[0];
    } catch {
      return false;
    }
  }

  private getSystemPrompt(): string {
    return `You are a Pragmatist in a debate council. Your role is to:
    - Focus on practical implementation
    - Identify execution challenges
    - Propose realistic timelines and budgets
    - Consider resource constraints
    - Suggest step-by-step action plans
    
    Provide structured responses with:
    1. Implementation roadmap
    2. Resource requirements
    3. Timeline and milestones
    4. Budget estimation
    5. Common pitfalls to avoid`;
  }
}
```

---

## 🔌 Agent Factory Pattern

```typescript
// backend/src/agents/agent-factory.ts

import { BaseAgent } from './base-agent';
import { ChatGPTAgent } from './chatgpt';
import { ClaudeAgent } from './claude';
import { GeminiAgent } from './gemini';
import { GrokAgent } from './grok';
import { PerplexityAgent } from './perplexity';
import { LLaMAAgent } from './llama';

export class AgentFactory {
  static createAgent(provider: string, model?: string): BaseAgent {
    switch (provider.toLowerCase()) {
      case 'chatgpt':
        return new ChatGPTAgent(model);
      case 'claude':
        return new ClaudeAgent(model);
      case 'gemini':
        return new GeminiAgent(model);
      case 'grok':
        return new GrokAgent(model);
      case 'perplexity':
        return new PerplexityAgent(model);
      case 'llama':
        return new LLaMAAgent(model);
      default:
        // Fallback to Gemini (cheapest)
        return new GeminiAgent();
    }
  }

  static async createAgents(
    providers: string[],
    costOptimized = true
  ): Promise<BaseAgent[]> {
    const agents: BaseAgent[] = [];

    for (const provider of providers) {
      const model = costOptimized
        ? this.getCheapestModel(provider)
        : this.getBestModel(provider);

      const agent = this.createAgent(provider, model);
      await agent.initialize();
      agents.push(agent);
    }

    return agents;
  }

  private static getCheapestModel(provider: string): string {
    const cheapModels: { [key: string]: string } = {
      'chatgpt': 'gpt-4-turbo',
      'claude': 'claude-3-sonnet',
      'gemini': 'gemini-1.5-flash',
      'grok': 'grok-3-standard',
      'perplexity': 'free-tier',
      'llama': 'llama-3.1-70b'
    };
    return cheapModels[provider] || '';
  }

  private static getBestModel(provider: string): string {
    const bestModels: { [key: string]: string } = {
      'chatgpt': 'gpt-4o',
      'claude': 'claude-3-opus-20250219',
      'gemini': 'gemini-2.0-pro',
      'grok': 'grok-3',
      'perplexity': 'perplexity-pro',
      'llama': 'llama-3.1-405b'
    };
    return bestModels[provider] || '';
  }
}
```

---

## 🔄 Swapping Providers During Debate

```typescript
// backend/src/debate/debate-engine.ts

export async function swapAgent(
  debateId: string,
  currentProvider: string,
  newProvider: string
): Promise<void> {
  const debate = await getDebate(debateId);
  const currentAgent = debate.agents.find(a => a.provider === currentProvider);

  if (!currentAgent) {
    throw new Error(`Agent ${currentProvider} not found`);
  }

  // Create new agent
  const newAgent = AgentFactory.createAgent(newProvider);
  await newAgent.initialize();

  // Validate connection
  const isValid = await newAgent.validateConnection();
  if (!isValid) {
    throw new Error(`Cannot connect to ${newProvider}`);
  }

  // Replace agent in debate
  debate.agents = debate.agents.map(a =>
    a.provider === currentProvider ? newAgent : a
  );

  // Log the swap
  await logDebateEvent(debateId, {
    type: 'AGENT_SWAPPED',
    from: currentProvider,
    to: newProvider,
    timestamp: new Date()
  });

  // Notify subscribers
  broadcastDebateUpdate(debateId, {
    event: 'AGENT_SWAPPED',
    from: currentProvider,
    to: newProvider
  });
}
```

---

## 📊 Cost Tracking per Debate

```typescript
// backend/src/utils/cost-tracker.ts

export class CostTracker {
  private debateId: string;
  private costs: { [provider: string]: number } = {};

  constructor(debateId: string) {
    this.debateId = debateId;
  }

  trackTokens(provider: string, tokens: number): void {
    const costPerToken = this.getCostPerToken(provider);
    const tokenCost = tokens * costPerToken;
    this.costs[provider] = (this.costs[provider] || 0) + tokenCost;
  }

  getTotalCost(): number {
    return Object.values(this.costs).reduce((sum, cost) => sum + cost, 0);
  }

  getCostBreakdown(): { [provider: string]: number } {
    return { ...this.costs };
  }

  private getCostPerToken(provider: string): number {
    const costs: { [key: string]: number } = {
      'chatgpt': 0.000005,    // $5/1M
      'claude': 0.000003,     // $3/1M (Sonnet)
      'gemini': 0.000000075,  // $0.075/1M
      'grok': 0.000005,       // Estimate
      'perplexity': 0.00001,  // $10/1M
      'llama': 0.000002       // $2/1M
    };
    return costs[provider] || 0.000001;
  }
}
```

---

## Questions?

For more information on:
- Swapping providers: See Agent Factory pattern
- Adding new providers: Create a new class extending BaseAgent
- Cost optimization: See COST_ANALYSIS.md
- Provider comparison: See README.md
