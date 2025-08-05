// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Criamos o contexto
const AuthContext = createContext();

// Hook para facilitar o uso do contexto em outros componentes
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Criamos o provedor do contexto
export const AuthProvider = ({ children }) => {
  // Estado de autenticação. Por enquanto, 'true' para testar.
  // Vamos conectar com o Firebase mais tarde.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Exemplo de função de login/logout
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};