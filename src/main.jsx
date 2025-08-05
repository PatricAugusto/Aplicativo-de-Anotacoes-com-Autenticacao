// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.jsx'
import GlobalStyle from './styles/GlobalStyle'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle /> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)