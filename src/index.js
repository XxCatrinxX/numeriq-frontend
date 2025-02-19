// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';  // Importa BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Envuelve tu componente App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de la aplicación, puedes enviar resultados a una función
reportWebVitals();

