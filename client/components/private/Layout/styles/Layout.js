import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Montserrat", sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body, #root {
        height: 100%;
    }
`;

export { GlobalStyle };
