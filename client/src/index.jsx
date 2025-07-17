import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // You might want to create a basic index.css
import App from './App.jsx';
// import reportWebVitals from './reportWebVitals.js'; // Removed as file is missing
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx'; // Import ThemeProvider

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider> {/* Wrap App with ThemeProvider */}
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); // Removed as file is missing
