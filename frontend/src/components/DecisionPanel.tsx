import React from 'react';
import '../styles/DecisionPanel.css';

interface DecisionPanelProps {
  decision: any;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({ decision }) => {
  const confidencePercentage = Math.round(decision.confidence * 100);

  return (
    <div className="decision-panel">
      <div className="decision-header">
        <h2>🎯 Recommendation</h2>
      </div>

      {/* Main Recommendation */}
      <div className="recommendation-box">
        <h3>{decision.recommendation}</h3>
      </div>

      {/* Confidence Score */}
      <div className="confidence-section">
        <h4>Confidence Level</h4>
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${confidencePercentage}%` }}></div>
        </div>
        <p className="confidence-percentage">{confidencePercentage}% Confidence</p>
      </div>

      {/* Reasoning */}
      <div className="reasoning-section">
        <div className="reasoning-item">
          <h5>✅ Pros</h5>
          <ul>
            {decision.reasoning?.pros?.map((pro: string, i: number) => (
              <li key={i}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="reasoning-item">
          <h5>⚠️ Cons</h5>
          <ul>
            {decision.reasoning?.cons?.map((con: string, i: number) => (
              <li key={i}>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Plan */}
      <div className="action-plan-section">
        <h4>📋 Action Plan</h4>
        {decision.action_plan?.map((action: any, i: number) => (
          <div key={i} className="action-item">
            <span className="action-day">Day {action.day}</span>
            <span className="action-text">{action.action}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline-section">
        <h4>⏰ Timeline</h4>
        <p>{decision.timeline}</p>
      </div>

      {/* Risks */}
      <div className="risks-section">
        <h4>🚨 Top Risks</h4>
        <ul>
          {decision.risks?.map((risk: string, i: number) => (
            <li key={i}>{risk}</li>
          ))}
        </ul>
      </div>

      <button className="btn-start-new" onClick={() => window.location.reload()}>
        🔄 Start New Debate
      </button>
    </div>
  );
};

export default DecisionPanel;
