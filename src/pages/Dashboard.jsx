// src/pages/Dashboard.jsx

import React from 'react';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth'; // Importa funções de auth para logout
import { app } from '../firebase-config'; // Importa a instância do Firebase app
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o logout
import { useAuth } from '../contexts/AuthContext'; // Para obter dados do usuário e status

// Container principal do dashboard
const DashboardContainer = styled.div`
  background-color: var(--matrix-gray);
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 25px var(--matrix-green);
  text-align: center;
  width: 90%;
  max-width: 800px; /* Maior que o AuthContainer para acomodar as anotações */
  min-height: 60vh; /* Altura mínima para o conteúdo */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Empurra o logout para baixo */
  animation: pulse 2s infinite alternate; /* Mantém a animação de brilho */

  @keyframes pulse {
    from {
      box-shadow: 0 0 15px var(--matrix-green);
    }
    to {
      box-shadow: 0 0 30px var(--matrix-green);
    }
  }
`;

// Título de boas-vindas
const DashboardTitle = styled.h2`
  color: var(--matrix-green);
  text-shadow: 0 0 10px var(--matrix-green);
  margin-bottom: 2rem;
  font-size: 2.5rem;
  span {
    font-size: 1.5rem;
    display: block;
    color: #00b33c; /* Um verde um pouco mais claro */
  }
`;

// Botão de logout
const LogoutButton = styled.button`
  background-color: transparent;
  color: var(--matrix-green);
  border: 1px solid var(--matrix-green);
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  align-self: flex-end; /* Alinha o botão à direita */
  margin-top: 2rem; /* Espaçamento do conteúdo acima */

  &:hover {
    background-color: var(--matrix-green);
    color: var(--matrix-dark);
    transform: scale(1.05);
  }
`;

// Área para as anotações (ainda vazia)
const NotesArea = styled.div`
  flex-grow: 1; /* Permite que ocupe o espaço disponível */
  border: 1px dashed var(--matrix-green);
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: left;
  overflow-y: auto; /* Para rolagem se houver muitas anotações */
  color: #00cc44; /* Um verde um pouco diferente para o conteúdo */
`;

const Dashboard = () => {
  const auth = getAuth(app); // Instância de autenticação do Firebase
  const navigate = useNavigate(); // Hook para navegação
  const { user } = useAuth(); // Obtém o objeto de usuário do contexto

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Chama a função de logout do Firebase
      console.log('Usuário deslogado com sucesso!');
      navigate('/'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao deslogar. Tente novamente.'); // Mensagem simples de erro
    }
  };

  return (
    <DashboardContainer>
      <LogoutButton onClick={handleLogout}>Desconectar</LogoutButton>
      <DashboardTitle>
        Bem-vindo ao Matrix!
        {user && <span>{user.email}</span>} {/* Exibe o email do usuário logado */}
      </DashboardTitle>
      
      <NotesArea>
        {/* Aqui é onde as suas anotações serão exibidas */}
        <p>Sua área de anotações está pronta para ser preenchida...</p>
      </NotesArea>
    </DashboardContainer>
  );
};

export default Dashboard;