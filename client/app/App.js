import React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createGlobalStyle } from 'styled-components';

import { ConfirmationModalProvider } from './providers/ConfirmationModalProvider';
import { UserProviderWithRouter as UserProvider } from './providers/UserProvider';
import { AlertMessageProvider } from './providers/AlertMessageProvider';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProjectPage from './pages/ProjectPage';
import TaskPage from './pages/TaskPage';
import Page404 from './pages/404Page/404Page';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body, button{
        font-family: "Montserrat", sans-serif;
    }
`;

function GuestOnlyRoute(props) {
    return Cookies.get('access_token') ? (
        <Redirect to="/home" />
    ) : (
        <Route {...props} />
    );
}

export default function App() {
    return (
        <ConfirmationModalProvider>
            <AlertMessageProvider>
                <BrowserRouter>
                    <Switch>
                        <GuestOnlyRoute
                            exact
                            path="/login"
                            component={LoginPage}
                        />
                        <GuestOnlyRoute
                            exact
                            path="/registration"
                            component={RegistrationPage}
                        />
                        <UserProvider>
                            <Switch>
                                <Route
                                    exact
                                    path="/home"
                                    component={HomePage}
                                />
                                <Route
                                    exact
                                    path="/profile"
                                    component={ProfilePage}
                                />
                                <Route
                                    exact
                                    path="/projects/:projectId/tasks/:taskId"
                                    component={TaskPage}
                                />
                                <Route
                                    exact
                                    path="/projects/:projectId"
                                    component={ProjectPage}
                                />
                                <Route component={Page404} />
                            </Switch>
                        </UserProvider>
                    </Switch>
                    <GlobalStyle />
                </BrowserRouter>
            </AlertMessageProvider>
        </ConfirmationModalProvider>
    );
}
