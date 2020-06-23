import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../../../shared/theme';
import Notifications from '../global/Notifications';

const GlobalStyle = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.bg.horizontalGradient};
        font-family: "Montserrat", sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body, html {
        width: 100%;
        height: 100%;
    }

    #root {
        width: 100%;
        min-height: 100%;
    }

    input, textarea, button {
        font-family: inherit
    }
`;

const Layout = ({ children, ...props }) => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Notifications />
        {children}
    </ThemeProvider>
);

export default Layout;
