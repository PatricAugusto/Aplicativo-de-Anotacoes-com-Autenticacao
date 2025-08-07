// src/pages/Auth.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase-config'; // Importa a instância do Firebase app
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login
import { useAuth } from '../contexts/AuthContext'; // Importa o nosso hook de contexto de autenticação

// Componentes estilizados (mantidos da última etapa)
const AuthContainer = styled.div`
  background-color: var(--matrix-gray);
  padding: 3rem; // Usaremos rem para o padding
  border-radius: 10px;
  box-shadow: 0 0 25px var(--matrix-green);
  text-align: center;
  width: 90%; // Ocupa 90% da largura disponível
  max-width: 400px; // Limite máximo para não ficar muito largo em telas grandes
  animation: pulse 2s infinite alternate;

  @keyframes pulse {
    from {
      box-shadow: 0 0 15px var(--matrix-green);
    }
    to {
      box-shadow: 0 0 30px var(--matrix-green);
    }
  }

  // Media queries para telas menores
  @media (max-width: 480px) {
    padding: 1.5rem; // Reduz o padding em telas muito pequenas
    border-radius: 5px;
  }
`;

const AuthTitle = styled.h2`
  color: var(--matrix-green);
  text-shadow: 0 0 10px var(--matrix-green);
  margin-bottom: 2rem;
  font-size: 2rem; // Tamanho de fonte baseado em rem
  
  @media (max-width: 480px) {
    font-size: 1.5rem; // Reduz o tamanho da fonte em telas menores
    margin-bottom: 1.5rem;
  }
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; // Usaremos rem para o espaçamento
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const AuthInput = styled.input`
  background-color: var(--matrix-dark);
  border: 1px solid var(--matrix-green);
  color: var(--matrix-green);
  padding: 0.8rem; // Usaremos rem para o padding
  font-size: 1rem; // Tamanho de fonte baseado em rem
  outline: none;

  &:focus {
    box-shadow: 0 0 10px var(--matrix-green);
  }

  &::placeholder {
    color: #004d1a;
  }
`;

const AuthButton = styled.button`
  background-color: var(--matrix-green);
  color: var(--matrix-dark);
  border: none;
  padding: 1rem; // Usaremos rem para o padding
  font-size: 1rem; // Tamanho de fonte baseado em rem
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #00ff81;
    transform: scale(1.05);
  }
`;

const AuthSwitch = styled.p`
  margin-top: 1.5rem; // Usaremos rem
  cursor: pointer;
  color: var(--matrix-green);
  font-size: 0.9rem; // Tamanho de fonte baseado em rem

  &:hover {
    text-decoration: underline;
  }
`;

const AuthError = styled.p`
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro

  const navigate = useNavigate(); // Hook para navegação programática
  const auth = getAuth(app); // Obtém a instância de autenticação do Firebase
  const { isAuthenticated } = useAuth(); // Pega o estado de autenticação do contexto

  // Se o usuário já estiver autenticado, redireciona para o dashboard
  // Isso impede que um usuário logado veja a tela de login/registro
  useEffect(() => {
  if (isAuthenticated) {
    navigate('/dashboard');
  }
  }, [isAuthenticated, navigate]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(''); // Limpa erros ao alternar o modo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      if (isLogin) {
        // Modo de login
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login bem-sucedido!');
        navigate('/dashboard'); // Redireciona para o dashboard
      } else {
        // Modo de registro
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registro bem-sucedido!');
        // Após o registro, o usuário já está logado, então redirecionamos
        navigate('/dashboard');
      }
    } catch (firebaseError) {
      console.error("Erro de autenticação:", firebaseError);
      // Tratamento de erros específicos do Firebase
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          setError('Este email já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('O formato do email é inválido.');
          break;
        case 'auth/weak-password':
          setError('A senha deve ter pelo menos 6 caracteres.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email ou senha inválidos.');
          break;
        default:
          setError('Ocorreu um erro. Tente novamente.');
      }
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>{isLogin ? 'Acessar Sistema' : 'Criar Conta'}</AuthTitle>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthButton type="submit">
          {isLogin ? 'Entrar' : 'Registrar'}
        </AuthButton>
        {error && <AuthError>{error}</AuthError>} {/* Mostra a mensagem de erro */}
      </AuthForm>
      <AuthSwitch onClick={toggleMode}>
        {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Entrar'}
      </AuthSwitch>
    </AuthContainer>
  );
};

export default Auth;