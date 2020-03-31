import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from '../constants/routes';

import Layout from '../components/public/Layout';
import Login from '../components/public/Login';
import Signup from '../components/public/Signup';

const router = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={ROUTES.LOGIN} component={Login} />
                <Route exact path={ROUTES.SIGNUP} component={Signup} />
                <Redirect to={ROUTES.LOGIN} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default router;
