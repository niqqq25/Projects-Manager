import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Montserrat", sans-serif;
        background-color: ${({ theme }) => theme.bg.default};
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #root, body, html {
        width: 100%;
        height: 100%;
    }

    input, textarea, button {
        font-family: inherit
    }
`;

export { GlobalStyle };
