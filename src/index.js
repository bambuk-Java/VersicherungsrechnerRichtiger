import React from 'react';
import ReactDOM from 'react-dom/client';  // Verwenden Sie 'react-dom/client' statt 'react-dom'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
