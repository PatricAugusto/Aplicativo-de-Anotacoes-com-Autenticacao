// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { app } from '../firebase-config'; // Importa a instância do Firebase app
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa funções de auth do Firebase

// 1. Criamos o contexto
const AuthContext = createContext();

// Hook para facilitar o uso do contexto em outros componentes
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Criamos o provedor do contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Armazena o objeto do usuário logado
  const [loading, setLoading] = useState(true); // Para verificar se o Firebase já carregou o estado

  const auth = getAuth(app); // Inicializa o serviço de autenticação do Firebase

  // Efeito para observar mudanças no estado de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Usuário logado
        setUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        // Usuário deslogado
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false); // O estado de autenticação foi verificado
    });

    // Função de limpeza para desinscrever o ouvinte quando o componente for desmontado
    return () => unsubscribe();
  }, [auth]);

  // Função para simular login (será removida quando conectarmos ao Firebase no Auth.jsx)
  // const login = () => setIsAuthenticated(true);
  // const logout = () => setIsAuthenticated(false);

  // Aqui vamos prover o usuário e o estado de carregamento também
  const value = {
    isAuthenticated,
    user, // O objeto do usuário do Firebase
    loading, // Estado de carregamento do Firebase
    // login, // Funções de login/logout serão gerenciadas pelo Firebase no Auth.jsx
    // logout,
  };

  // Enquanto estiver carregando, podemos mostrar um "loading spinner"
  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'var(--matrix-green)' }}>
            Carregando autenticação...
        </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};