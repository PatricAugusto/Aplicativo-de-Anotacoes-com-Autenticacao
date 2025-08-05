// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Este componente recebe o componente que ele deve renderizar como 'children'
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Se o usuário estiver autenticado, renderiza a página protegida
  if (isAuthenticated) {
    return children;
  }

  // Se não estiver, redireciona para a página de login ('/')
  return <Navigate to="/" />;
};

export default PrivateRoute;