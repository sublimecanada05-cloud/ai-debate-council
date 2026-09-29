import React from 'react';
import '../styles/DebateViewer.css';

interface DebateViewerProps {
  debate: any;
  loading: boolean;
}

const DebateViewer: React.FC<DebateViewerProps> = ({ debate, loading }) => {
  const aiPersonalities = [
    { name: 'ChatGPT', emoji: '🚀', role: 'Innovator', color: '#00D084' },
    { name: 'Claude', emoji: '📊', role: 'Analyst', color: '#B98EFF' },
    { name: 'Gemini', emoji: '🔍', role: 'Researcher', color: '#4285F4' },
    { name: 'Grok', emoji: '⚡', role: 'Disruptor', color: '#FF6B6B' }
  ];

  return (
    <div className="debate-viewer">
      <div className="debate-header">
        <h2>💬 Debate in Progress</h2>
        <p className="debate-topic">{debate?.topic}</p>
      </div>

      {/* AI Personalities */}
      <div className="personalities">
        {aiPersonalities.map((ai, i) => (
          <div key={i} className="personality" style={{ borderColor: ai.color }}>
            <div className="personality-header">
              <span className="emoji">{ai.emoji}</span>
              <div className="personality-info">
                <h4>{ai.name}</h4>
                <p className="role">{ai.role}</p>
              </div>
            </div>
            <div className="personality-status">
              {debate?.rounds?.some((r: any) => r.ai.includes(ai.name)) ? (
                <span className="status-complete">✓ Responded</span>
              ) : loading ? (
                <span className="status-thinking">💭 Thinking...</span>
              ) : (
                <span className="status-waiting">⏳ Waiting...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Debate Rounds */}
      <div className="debate-rounds">
        {debate?.rounds?.map((round: any, i: number) => {
          const aiPersonality = aiPersonalities.find(p => round.ai.includes(p.name));
          return (
            <div key={i} className="round" style={{ borderLeftColor: aiPersonality?.color }}>
              <div className="round-header">
                <h4>
                  {aiPersonality?.emoji} {round.ai} ({aiPersonality?.role})
                </h4>
              </div>
              <p className="round-content">{round.response}</p>
            </div>
          );
        })}
      </div>

      {!debate?.rounds?.length && (
        <div className="empty-state">
          <p>Waiting for AI personalities to start debating...</p>
        </div>
      )}
    </div>
  );
};

export default DebateViewer;
