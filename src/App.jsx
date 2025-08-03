// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import './App.css'; // Mantenha a importação de estilos padrão

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;