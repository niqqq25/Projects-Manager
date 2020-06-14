import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from '../constants/routes';

import Layout from '../components/public/Layout';
import LoginPage from '../components/public/LoginPage';
import SignupPage from '../components/public/SignupPage';

const router = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={ROUTES.LOGIN} component={LoginPage} />
                <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
                <Redirect to={ROUTES.LOGIN} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default router;
