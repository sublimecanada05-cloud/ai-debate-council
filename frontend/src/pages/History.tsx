import React from 'react';

const History: React.FC = () => {
  return (
    <div className="history-page">
      <div className="container">
        <h1>📚 Debate History</h1>
        <p>Your past debates and decisions will appear here.</p>
        <p style={{ marginTop: '20px', color: '#666' }}>Start a new debate to see it in your history.</p>
      </div>
    </div>
  );
};

export default History;
