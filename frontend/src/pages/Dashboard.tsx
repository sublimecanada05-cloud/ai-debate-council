import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DebateViewer from '../components/DebateViewer';
import DecisionPanel from '../components/DecisionPanel';
import InputForm from '../components/InputForm';

const Dashboard: React.FC<{ socket: any }> = ({ socket }) => {
  const [debateId, setDebateId] = useState<string | null>(null);
  const [debate, setDebate] = useState<any>(null);
  const [decision, setDecision] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<any>(null);

  // Fetch context data
  useEffect(() => {
    const fetchContext = async () => {
      try {
        const response = await axios.get(
          (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/context'
        );
        setContext(response.data);
      } catch (error) {
        console.error('Error fetching context:', error);
      }
    };
    fetchContext();
  }, []);

  // Listen for WebSocket events
  useEffect(() => {
    if (!socket) return;

    socket.on('debate_round', (data: any) => {
      if (data.debateId === debateId) {
        setDebate((prev: any) => ({
          ...prev,
          rounds: [...(prev?.rounds || []), data.response]
        }));
      }
    });

    socket.on('debate_concluded', (data: any) => {
      if (data.debateId === debateId) {
        setDecision(data.decision);
        setDebate((prev: any) => ({ ...prev, status: 'concluded' }));
      }
    });

    return () => {
      socket.off('debate_round');
      socket.off('debate_concluded');
    };
  }, [socket, debateId]);

  const handleStartDebate = async (topic: string, debateContext: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/debates/start',
        { topic, context: debateContext, deadline: '24h' }
      );
      setDebateId(response.data.debateId);
      setDebate({ status: 'in_progress', rounds: [], topic });
      setDecision(null);
    } catch (error) {
      console.error('Error starting debate:', error);
      alert('Failed to start debate. Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <div className="container">
        {/* Context Panel */}
        {context && (
          <div className="context-panel">
            <h3>📊 Current Context</h3>
            <div className="context-grid">
              <div className="context-card">
                <h4>📰 Latest News</h4>
                {context.news?.slice(0, 3).map((item: any, i: number) => (
                  <p key={i} className="news-item">{item.title}</p>
                ))}
              </div>
              <div className="context-card">
                <h4>📈 Market Status</h4>
                <p>Tech Stocks: {context.market_data?.tech_stocks}</p>
                <p>Crypto: {context.market_data?.crypto_sentiment}</p>
                <p>Startups: {context.market_data?.startup_funding}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="content-grid">
          {/* Left: Input & Debate Viewer */}
          <div className="left-panel">
            {!debateId ? (
              <InputForm onSubmit={handleStartDebate} loading={loading} />
            ) : (
              <DebateViewer debate={debate} loading={loading} />
            )}
          </div>

          {/* Right: Decision Panel */}
          <div className="right-panel">
            {decision && <DecisionPanel decision={decision} />}
            {debate?.status === 'in_progress' && !decision && (
              <div className="waiting-panel">
                <div className="spinner"></div>
                <h3>Debate in Progress...</h3>
                <p>The AI personalities are debating your question.</p>
              </div>
            )}
            {!debateId && (
              <div className="info-panel">
                <h3>💡 How It Works</h3>
                <ol>
                  <li>Enter your decision question</li>
                  <li>Watch 4 AI personalities debate</li>
                  <li>Get a recommendation with confidence score</li>
                  <li>Receive actionable next steps</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
