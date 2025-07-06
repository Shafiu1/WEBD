import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Projects from './Projects.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Projects />
  </StrictMode>
);