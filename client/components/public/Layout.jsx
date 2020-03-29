import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background: linear-gradient( 90deg, rgb(245,175,25,0.8), rgb(241,39,17,0.8));
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
