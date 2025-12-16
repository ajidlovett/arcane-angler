// Main entry point for Arcane Angler - ESM architecture
import apiService from './api-service.js';

const { useState, useEffect } = React;

// FishingGame is loaded via Babel script and available on window
const FishingGame = window.FishingGame;

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
    // Render auth screen (using global AuthScreen component from auth-component.js)
    return React.createElement(window.AuthScreen, { onLoginSuccess: handleLogin });
  }

  return React.createElement(FishingGame, { user, onLogout: handleLogout });
}

// Render app to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
