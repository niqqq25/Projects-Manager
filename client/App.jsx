import React, { Component } from 'react';
import {
    Route,
    Redirect,
    Switch,
    BrowserRouter as Router,
} from 'react-router-dom';

import { UserProviderWithRouter as UserProvider } from './providers/UserProvider';
import { AlertMessageProvider } from './providers/AlertMessageProvider';
import { ConfirmationModalProvider } from './providers/ConfirmationModalProvider';
import LoginPage from './pages/login/LoginPage/LoginPage';
import RegistrationPage from './pages/registration/RegistrationPage/RegistrationPage';
import HomePage from './pages/home/HomePage/HomePage';
import ProfilePage from './pages/profile/ProfilePage/ProfilePage';
import ProjectPage from './pages/project/ProjectPage/ProjectPage';
import TaskPage from './pages/task/TaskPage/TaskPage';
import Page404 from './pages/404/Page404';

import Cookies from 'js-cookie';

function GuestOnlyRoute(props) {
    return Cookies.get('access_token') ? (
        <Redirect to="/home" />
    ) : (
        <Route {...props} />
    );
}

export default class App extends Component {
    render() {
        return (
            <ConfirmationModalProvider>
                <AlertMessageProvider>
                    <Router>
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
                            <Route component={Page404} />
                        </Switch>
                    </Router>
                </AlertMessageProvider>
            </ConfirmationModalProvider>
        );
    }
}
