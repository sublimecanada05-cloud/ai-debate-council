import React, { useState } from 'react';
import '../styles/InputForm.css';

interface InputFormProps {
  onSubmit: (topic: string, context: string) => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, loading }) => {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, context);
    }
  };

  const examples = [
    { topic: 'Should I start a software business?', context: 'First-time entrepreneur with tech background' },
    { topic: 'Should I invest in tech stocks or crypto?', context: 'Moderate risk tolerance, looking to build wealth' },
    { topic: 'Should I switch careers to AI/ML?', context: 'Currently in management, want to get technical' }
  ];

  return (
    <div className="input-form">
      <h2>🤔 What's Your Decision?</h2>
      <p className="subtitle">Let 4 AI personalities debate and help you decide</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic">Your Question or Decision</label>
          <textarea
            id="topic"
            placeholder="e.g., Should I start a software business in 2026?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="context">Additional Context (Optional)</label>
          <textarea
            id="context"
            placeholder="e.g., First-time entrepreneur, moderate risk tolerance, interested in AI..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading || !topic.trim()}>
          {loading ? '⏳ Starting Debate...' : '🚀 Start Debate'}
        </button>
      </form>

      <div className="examples">
        <h4>📌 Try These Examples:</h4>
        {examples.map((example, i) => (
          <div key={i} className="example-card" onClick={() => setTopic(example.topic)}>
            <p className="example-topic">{example.topic}</p>
            <p className="example-context">{example.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputForm;
