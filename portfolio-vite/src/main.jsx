import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import App from './App.jsx';
import './index.css';

// Initialize Google Analytics
ReactGA.initialize('G-LKYBNLS04H'); // Replace with your Measurement ID

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Track initial page view
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });