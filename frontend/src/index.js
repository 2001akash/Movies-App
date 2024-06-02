import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Create a root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the app
root.render(<App />);
