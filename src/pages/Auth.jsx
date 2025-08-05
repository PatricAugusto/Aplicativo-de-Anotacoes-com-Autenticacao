// src/pages/Auth.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

const AuthContainer = styled.div`
  background-color: var(--matrix-gray);
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 25px var(--matrix-green);
  text-align: center;
  width: 90%;
  max-width: 400px;
  animation: pulse 2s infinite alternate;

  @keyframes pulse {
    from {
      box-shadow: 0 0 15px var(--matrix-green);
    }
    to {
      box-shadow: 0 0 30px var(--matrix-green);
    }
  }
`;

const AuthTitle = styled.h2`
  color: var(--matrix-green);
  text-shadow: 0 0 10px var(--matrix-green);
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AuthInput = styled.input`
  background-color: var(--matrix-dark);
  border: 1px solid var(--matrix-green);
  color: var(--matrix-green);
  padding: 0.8rem;
  font-size: 1rem;
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
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #00ff81;
    transform: scale(1.05);
  }
`;

const AuthSwitch = styled.p`
  margin-top: 1.5rem;
  cursor: pointer;
  color: var(--matrix-green);
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

// Lógica do componente Auth
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui no futuro, vamos chamar a função de autenticação do Firebase.
    console.log(`Modo: ${isLogin ? 'Login' : 'Registro'}`);
    console.log(`Email: ${email}, Senha: ${password}`);
  };

  return (
    <AuthContainer>
      <AuthTitle>{isLogin ? 'Acessar Sistema' : 'Criar Conta'}</AuthTitle>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <AuthInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <AuthButton type="submit">
          {isLogin ? 'Entrar' : 'Registrar'}
        </AuthButton>
      </AuthForm>
      <AuthSwitch onClick={toggleMode}>
        {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Entrar'}
      </AuthSwitch>
    </AuthContainer>
  );
};

export default Auth;