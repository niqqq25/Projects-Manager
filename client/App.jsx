import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/login/LoginPage/LoginPage';
import RegistrationPage from './pages/registration/RegistrationPage/RegistrationPage';
import HomePage from './pages/home/HomePage/HomePage';
import ProfilePage from './pages/profile/ProfilePage/ProfilePage';

import * as Cookie from './utils/cookie';

function ProtectedRoute(props) {
    return Cookie.get('access_token') ? (
        <Route {...props} />
    ) : (
        <Redirect to="/login" />
    );
}

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/registration" component={RegistrationPage} />
                    <ProtectedRoute path="/home" component={HomePage} />
                    <ProtectedRoute path="/profile" component={ProfilePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
