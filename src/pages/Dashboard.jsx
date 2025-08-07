// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Importações do Firestore

// Componentes estilizados (mantidos do passo anterior)
const DashboardContainer = styled.div`
  background-color: var(--matrix-gray);
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 25px var(--matrix-green);
  text-align: center;
  width: 95%; // Aumentar um pouco a largura para preencher mais
  max-width: 900px; // Limite máximo para o dashboard
  min-height: 80vh; // Aumentar a altura mínima para o dashboard
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: pulse 2s infinite alternate;

  @keyframes pulse {
    from {
      box-shadow: 0 0 15px var(--matrix-green);
    }
    to {
      box-shadow: 0 0 30px var(--matrix-green);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem; // Reduzir padding para tablets
    min-height: 70vh;
  }

  @media (max-width: 480px) {
    padding: 1.5rem; // Reduzir mais para celulares
    border-radius: 5px;
    min-height: 90vh; // Usar mais altura em telas pequenas
  }
`;

const DashboardTitle = styled.h2`
  color: var(--matrix-green);
  text-shadow: 0 0 10px var(--matrix-green);
  margin-bottom: 2rem;
  font-size: 2.5rem;
  span {
    font-size: 1.5rem;
    display: block;
    color: #00b33c;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    span {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    span {
      font-size: 1rem;
    }
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: var(--matrix-green);
  border: 1px solid var(--matrix-green);
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  align-self: flex-end;
  margin-top: -1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: var(--matrix-green);
    color: var(--matrix-dark);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
  }
`;

const NotesArea = styled.div`
  flex-grow: 1;
  border: 1px dashed var(--matrix-green);
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: left;
  overflow-y: auto;
  color: #00cc44;
  height: 300px; // Altura fixa para a área de notas, com scroll se necessário

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
    height: 250px; // Ajusta a altura da área de notas
  }
  @media (max-width: 480px) {
    padding: 0.8rem;
    margin-top: 1rem;
    height: 200px; // Ajusta mais a altura para celulares
  }
`;

const AddNoteForm = styled.form`
  display: flex;
  margin-top: 1.5rem;
  gap: 10px; // Usaremos px para o gap, pois ele é pequeno e não precisa escalar

  @media (max-width: 480px) {
    flex-direction: column; // Empilha input e botão em telas pequenas
    gap: 0.8rem;
  }
`;

const NoteInput = styled.input`
  flex-grow: 1;
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

const AddNoteButton = styled.button`
  background-color: var(--matrix-green);
  color: var(--matrix-dark);
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #00ff81;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 100%; // Faz o botão ocupar a largura total
  }
`;

const NotesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoteItem = styled.li`
  background-color: #111;
  border: 1px solid #005f24;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  word-break: break-word;

  @media (max-width: 480px) {
    flex-direction: column; // Empilha texto e ações em telas menores
    align-items: flex-start;
    padding: 0.8rem;
    margin-bottom: 8px;
  }
`;

const NoteText = styled.span`
  color: var(--matrix-green);
  flex-grow: 1;
  text-align: left;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 10px; // Espaçamento entre texto e botões
    width: 100%; // Ocupa largura total
  }
`;

const NoteActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 15px;

  @media (max-width: 480px) {
    margin-left: 0; // Remove margin
    width: 100%; // Ocupa largura total
    justify-content: flex-end; // Alinha botões à direita
  }
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid transparent;
  color: var(--matrix-green);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 3px;
  transition: all 0.2s;

  &:hover {
    border-color: var(--matrix-green);
    background-color: #003311;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

const EditInput = styled.input`
  flex-grow: 1;
  background-color: var(--matrix-dark);
  border: 1px solid var(--matrix-green);
  color: var(--matrix-green);
  padding: 0.5rem;
  font-size: 0.9rem;
  outline: none;
  margin-right: 10px;

  @media (max-width: 480px) {
    width: 100%; // Ocupa largura total
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const Dashboard = () => {
  const auth = getAuth(app);
  const db = getFirestore(app); // Inicializa o Firestore
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newNoteText, setNewNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  // Redireciona se não estiver logado (segurança extra, PrivateRoute já faz isso)
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  // Função para fazer logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao deslogar. Tente novamente.');
    }
  };

  // 1. Adicionar Anotação
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !user) return;

    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid, // Associa a anotação ao ID do usuário logado
        text: newNoteText,
        createdAt: serverTimestamp(), // Marca o timestamp da criação
      });
      setNewNoteText(''); // Limpa o input após adicionar
    } catch (error) {
      console.error('Erro ao adicionar anotação:', error);
      alert('Não foi possível adicionar a anotação.');
    }
  };

  // 2. Ler Anotações em Tempo Real
  useEffect(() => {
    if (!user) return; // Só busca anotações se houver um usuário logado

    const q = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid), // Filtra por anotações do usuário atual
      orderBy('createdAt', 'desc') // Ordena pelas mais recentes primeiro
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData);
    }, (error) => {
      console.error("Erro ao carregar anotações:", error);
    });

    // Limpa o ouvinte quando o componente é desmontado ou o usuário muda
    return () => unsubscribe();
  }, [user, db]); // Depende do usuário e da instância do db

  // 3. Deletar Anotação
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      try {
        await deleteDoc(doc(db, 'notes', noteId));
        console.log('Anotação deletada!');
      } catch (error) {
        console.error('Erro ao deletar anotação:', error);
        alert('Não foi possível deletar a anotação.');
      }
    }
  };

  // 4. Iniciar Edição
  const handleEditClick = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  };

  // 5. Salvar Edição
  const handleSaveEdit = async (noteId) => {
    if (!editingNoteText.trim()) {
      alert('A anotação não pode estar vazia!');
      return;
    }
    try {
      await updateDoc(doc(db, 'notes', noteId), {
        text: editingNoteText,
      });
      setEditingNoteId(null); // Sai do modo de edição
      setEditingNoteText('');
      console.log('Anotação atualizada!');
    } catch (error) {
      console.error('Erro ao atualizar anotação:', error);
      alert('Não foi possível atualizar a anotação.');
    }
  };

  // 6. Cancelar Edição
  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingNoteText('');
  };

  return (
    <DashboardContainer>
      <LogoutButton onClick={handleLogout}>Desconectar</LogoutButton>
      <DashboardTitle>
        Bem-vindo ao Matrix!
        {user && <span>{user.email}</span>}
      </DashboardTitle>

      <AddNoteForm onSubmit={handleAddNote}>
        <NoteInput
          type="text"
          placeholder="Digite sua nova anotação..."
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          required
        />
        <AddNoteButton type="submit">Adicionar</AddNoteButton>
      </AddNoteForm>

      <NotesArea>
        {notes.length === 0 ? (
          <p>Nenhuma anotação encontrada. Adicione uma!</p>
        ) : (
          <NotesList>
            {notes.map((note) => (
              <NoteItem key={note.id}>
                {editingNoteId === note.id ? (
                  <>
                    <EditInput
                      type="text"
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                    />
                    <NoteActions>
                      <ActionButton onClick={() => handleSaveEdit(note.id)}>Salvar</ActionButton>
                      <ActionButton onClick={handleCancelEdit}>Cancelar</ActionButton>
                    </NoteActions>
                  </>
                ) : (
                  <>
                    <NoteText>{note.text}</NoteText>
                    <NoteActions>
                      <ActionButton onClick={() => handleEditClick(note)}>Editar</ActionButton>
                      <ActionButton onClick={() => handleDeleteNote(note.id)}>Excluir</ActionButton>
                    </NoteActions>
                  </>
                )}
              </NoteItem>
            ))}
          </NotesList>
        )}
      </NotesArea>
    </DashboardContainer>
  );
};

export default Dashboard;