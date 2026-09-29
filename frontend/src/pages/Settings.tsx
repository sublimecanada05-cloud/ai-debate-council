import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="settings-page">
      <div className="container">
        <h1>⚙️ Settings</h1>
        <div style={{ marginTop: '20px' }}>
          <h3>AI Model Selection</h3>
          <p>Choose which AI models to use in debates:</p>
          <div style={{ marginTop: '10px' }}>
            <label>
              <input type="checkbox" defaultChecked /> ChatGPT (Innovator)
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Claude (Analyst)
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Gemini (Researcher)
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Grok (Disruptor)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
