import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import './App.css';

const App: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [apiHealth, setApiHealth] = useState<boolean>(false);

  useEffect(() => {
    // Connect to WebSocket
    const newSocket = io(process.env.REACT_APP_WS_URL || 'http://localhost:5000');
    setSocket(newSocket);

    // Check API health
    axios
      .get(process.env.REACT_APP_API_URL + '/health' || 'http://localhost:5000/health')
      .then(() => setApiHealth(true))
      .catch(() => setApiHealth(false));

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1 className="logo">
                🤖 AI Debate Council
              </h1>
              <nav className="nav">
                <Link to="/">Dashboard</Link>
                <Link to="/history">History</Link>
                <Link to="/settings">Settings</Link>
              </nav>
              <div className="status">
                {apiHealth ? (
                  <span className="status-online">✓ Connected</span>
                ) : (
                  <span className="status-offline">✗ Offline</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard socket={socket} />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 AI Debate Council | Powered by ChatGPT, Claude, Gemini & Grok</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
