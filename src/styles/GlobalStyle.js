// src/styles/GlobalStyle.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --matrix-green: #00ff41;
    --matrix-dark: #0a0a0a;
    --matrix-gray: #1a1a1a;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
  }

  html {
    font-size: 16px; // Base para 1rem
    @media (max-width: 768px) {
      font-size: 14px; // Reduz a fonte base em telas menores
    }
    @media (max-width: 480px) {
      font-size: 12px; // Reduz mais ainda para celulares
    }
  }

  body {
    background-color: var(--matrix-dark);
    color: var(--matrix-green);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; // Garante que o corpo ocupa 100% da altura da viewport
    padding: 1rem; // Adiciona um padding para não colar nas bordas em telas pequenas
  }

  #root {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;

export default GlobalStyle;