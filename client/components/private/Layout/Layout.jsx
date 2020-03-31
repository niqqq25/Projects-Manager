import React from 'react';
import Navbar from './Navbar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
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
        <Navbar />
        {children}
        <GlobalStyle />
    </>
);

export default Layout;
