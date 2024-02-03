import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './components/app';

const todoapp = ReactDOM.createRoot(document.getElementById('todoapp') as HTMLElement);

todoapp.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);