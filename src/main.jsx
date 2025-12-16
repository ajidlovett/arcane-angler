import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import apiService from './api-service.js';
import { FishingGame } from './components/FishingGame.jsx';
import { AuthScreen } from './components/AuthScreen.jsx';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Set token in apiService
      apiService.setToken(token);

      // Try to fetch user data to validate token
      apiService.getPlayerData()
        .then(data => {
          setUser(data);
          setIsLoggedIn(true);
        })
        .catch(err => {
          console.error('Token validation failed:', err);
          // Invalid token, clear it
          localStorage.removeItem('authToken');
          apiService.setToken(null);
        });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    apiService.setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AuthScreen onLoginSuccess={handleLogin} />;
  }

  return <FishingGame user={user} onLogout={handleLogout} />;
}

// Render app to DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
