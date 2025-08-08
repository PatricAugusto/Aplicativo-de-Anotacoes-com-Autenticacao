# 📝 Aplicativo de Anotações: Matrix Notes

## 📖 Sobre o Projeto
Este é um aplicativo de anotações dinâmico e responsivo, desenvolvido com uma estética futurista inspirada no universo de **Matrix**.  
Ele permite que os usuários se autentiquem, criem, visualizem, editem e excluam anotações pessoais, com os dados armazenados **em tempo real na nuvem**.

---

## ✨ Funcionalidades

- **Autenticação de Usuário:** Cadastro e login com email e senha utilizando **Firebase Authentication**.
- **Rotas Protegidas:** Apenas usuários autenticados têm acesso ao dashboard de anotações.
- **Gerenciamento de Anotações (CRUD):**
  - **Criar:** Adicione novas anotações.
  - **Ler:** Visualize anotações em tempo real.
  - **Atualizar:** Edite o conteúdo das anotações existentes.
  - **Deletar:** Remova anotações que não são mais necessárias.
- **Sincronização em Tempo Real:** Atualização instantânea em todos os dispositivos logados com **Firestore**.
- **Interface Futurista:** Design minimalista e responsivo com paleta preto + verde neon, usando **Styled Components**.

---

## 🛠️ Tecnologias Utilizadas

- **React** – Biblioteca para construção da interface.
- **Vite** – Build rápido e moderno para front-end.
- **Styled Components** – Estilização modular e dinâmica.
- **React Router DOM** – Gerenciamento de rotas.
- **Firebase:**
  - **Firebase Authentication** – Autenticação de usuários.
  - **Firestore** – Banco de dados NoSQL em tempo real.

---

## 🚀 Como Executar o Projeto

### 1️⃣ Pré-requisitos
Certifique-se de ter instalado:
- **Node.js**
- **npm** (gerenciador de pacotes do Node)

---

### 2️⃣ Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd matrix-notes
```

Instale as depêndencias
```bash
npm install
```

3️⃣ Configuração do 

1. Crie um projeto no Console do Firebase.

2. Ative o login por Email/Senha em Build > Authentication.

3. Crie um banco de dados Firestore em modo de teste em Build > Firestore Database.

4. Adicione um aplicativo Web (</>) ao projeto e copie o objeto de configuração.

4️⃣ Conectando o Aplicativo
```javascript
// src/firebase-config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export { app };
```

5️⃣ Criando o Índice do Firestore
Caso receba um erro no console ao ordenar as anotações, clique no link gerado pelo Firebase para criar o índice composto:

- Coleção: notes

- Campos:

   - userId (ascendente)

   - createdAt (descendente)

6️⃣ Executando o Servidor de Desenvolvimento
Inicie o servidor do Vite:

```bash
npm run dev
```

O app estará disponível em: 

➡ http://localhost:5173