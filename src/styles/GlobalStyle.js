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

  body {
    background-color: var(--matrix-dark);
    color: var(--matrix-green);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;

export default GlobalStyle;