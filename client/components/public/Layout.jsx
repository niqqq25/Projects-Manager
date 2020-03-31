import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background: linear-gradient( 90deg, hsl(41, 72%, 73%), hsl(6, 70%, 61%));
        font-family: "Montserrat", sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const Layout = ({ children }) => (
    <>
        <GlobalStyle />
        {children}
    </>
);

export default Layout;
